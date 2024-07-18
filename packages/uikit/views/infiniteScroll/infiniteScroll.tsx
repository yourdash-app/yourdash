/*
 *    Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 *    YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import React, { useEffect, useState } from "react";
import styles from "./infiniteScroll.module.scss";

const SCROLL_FETCH_PERCENTAGE = 0.25;

const InfiniteScroll: React.FC<{
  children: React.ReactNode | React.ReactNode[];
  fetchNextPage: (nextPageNumber: number) => Promise<void>;
  containerClassName?: string;
  className?: string;
  hasMorePages: boolean;
}> = ({ children, fetchNextPage, containerClassName, className, hasMorePages }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const nextPage = React.useRef<number>(-1);

  const fetchNextPageWrapper = async () => {
    nextPage.current++;
    setLoading(true);
    await fetchNextPage(nextPage.current);
    setLoading(false);
  };

  const scrollListener = () => {
    if (!ref.current) return;

    const element: HTMLDivElement = ref.current;
    const shouldFetchNextPage = Math.abs(element.scrollHeight - element.clientHeight - element.scrollTop) <= 1 - SCROLL_FETCH_PERCENTAGE;

    if (shouldFetchNextPage && hasMorePages) {
      fetchNextPageWrapper();
    }
  };

  useEffect(() => {
    if (!ref.current) return;

    fetchNextPageWrapper();

    const element: HTMLDivElement = ref.current;
    element.addEventListener("scroll", scrollListener);

    return () => {
      element.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={clippy(containerClassName, styles.component)}
    >
      <div className={clippy(className, styles.items)}>{children}</div>
      {loading && <div>Loading more content</div>}
      {!hasMorePages && <div>No More Pages Exist</div>}
    </div>
  );
};

export default InfiniteScroll;
