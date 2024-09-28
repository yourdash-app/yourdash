/*
 *    Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 *    YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import React, { useEffect, useState } from "react";
import Separator from "../../components/separator/separator.tsx";
import styles from "./infiniteScroll.module.scss";

const InfiniteScroll: React.FC<{
  children: React.ReactNode | React.ReactNode[];
  fetchNextPage: (nextPageNumber: number) => Promise<void>;
  containerClassName?: string;
  className?: string;
  resetState?: string;
  reachedLastPage?: boolean;
}> = ({ children, fetchNextPage, containerClassName, className, resetState, reachedLastPage }) => {
  const endOfItemsRef = React.useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const nextPage = React.useRef<number>(-1);
  const isEndVisible = React.useRef<boolean>(false);

  const fetchNextPageWrapper = async () => {
    if (reachedLastPage) return;
    if (!isEndVisible.current) return;

    console.log("reachedLastPage", reachedLastPage);
    console.log("isEndVisible", isEndVisible.current);

    nextPage.current++;
    setLoading(true);
    await fetchNextPage(nextPage.current);
    setLoading(false);

    console.log("Calling here ???");
    await fetchNextPageWrapper();
  };

  useEffect(() => {
    nextPage.current = -1;
    isEndVisible.current = true;
    fetchNextPageWrapper(nextPage);
  }, [resetState]);

  useEffect(() => {
    if (!endOfItemsRef.current) return;

    const element: HTMLDivElement = endOfItemsRef.current;

    const observer = new IntersectionObserver((elem) => {
      isEndVisible.current = elem[0].isIntersecting;

      fetchNextPageWrapper();
    });

    observer.observe(element);
  }, []);

  // TODO: Use interaction observer to detect when the last item is shown on the screen and fetch the next page

  return (
    <div className={clippy(containerClassName, styles.component)}>
      <div className={clippy(className, styles.items)}>{children}</div>
      <div
        ref={endOfItemsRef}
        className={styles.endOfItems}
      >
        {loading && <div>Loading more content</div>}
        <Separator direction={"column"} />
        {reachedLastPage && <div>No more items to load</div>}
      </div>
    </div>
  );
};

export default InfiniteScroll;
