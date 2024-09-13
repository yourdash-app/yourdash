/*
 *    Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 *    YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import React, { useEffect, useState } from "react";
import styles from "./infiniteScroll.module.scss";

const InfiniteScroll: React.FC<{
  children: React.ReactNode | React.ReactNode[];
  fetchNextPage: (nextPageNumber: number) => Promise<void>;
  containerClassName?: string;
  className?: string;
  hasMorePages: boolean;
  resetState?: string;
  dontShowNoMoreItems?: boolean;
}> = ({ children, fetchNextPage, containerClassName, className, hasMorePages, resetState, dontShowNoMoreItems }) => {
  const endOfItemsRef = React.useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const nextPage = React.useRef<number>(-1);

  useEffect(() => {
    nextPage.current = -1;
    setLoading(true);
  }, [resetState]);

  const fetchNextPageWrapper = async () => {
    if (!hasMorePages) return;

    nextPage.current++;
    setLoading(true);
    await fetchNextPage(nextPage.current);
    setLoading(false);
  };

  useEffect(() => {
    if (!endOfItemsRef.current) return;

    fetchNextPageWrapper();

    const element: HTMLDivElement = endOfItemsRef.current;

    const observer = new IntersectionObserver((elem) => {
      if (elem[0].isIntersecting) {
        fetchNextPageWrapper();
      }
    });

    observer.observe(element);
  }, []);

  // TODO: Use interaction observer to detect when the last item is shown on the screen and fetch the next page

  return (
    <div className={clippy(containerClassName, styles.component)}>
      <div className={clippy(className, styles.items)}>{children}</div>
      {loading && <div>Loading more content</div>}
      {!hasMorePages && <div>No More Pages Exist</div>}
      <div
        ref={endOfItemsRef}
        className={styles.endOfItems}
      >
        {!dontShowNoMoreItems && "No more items to load"}
      </div>
    </div>
  );
};

export default InfiniteScroll;
