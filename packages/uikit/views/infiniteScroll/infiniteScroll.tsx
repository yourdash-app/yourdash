/*
 *    Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 *    YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import React, { useEffect, useState } from "react";
import Separator from "../../components/separator/separator.tsx";
import Text from "../../components/text/text.tsx";
import styles from "./infiniteScroll.module.scss";

const InfiniteScroll: React.FC<{
  children: React.ReactNode | React.ReactNode[];
  fetchNextPage: (nextPageNumber: number) => Promise<{ hasAnotherPage?: boolean }>;
  containerClassName?: string;
  className?: string;
  resetState?: string;
}> = ({ children, fetchNextPage, containerClassName, className, resetState }) => {
  const endOfItemsRef = React.useRef<HTMLDivElement>(null);
  const lastFetchedPage = React.useRef<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  useEffect(() => {
    lastFetchedPage.current = -1;
    setIsLoading(false);
    setIsLastPage(false);
    fetchNextPageWrapper();
  }, [resetState]);

  async function fetchNextPageWrapper() {
    if (isLoading) return;
    setIsLoading(true);
    const { hasAnotherPage } = await fetchNextPage(lastFetchedPage.current + 1);
    lastFetchedPage.current++;
    setIsLoading(false);
    setIsLastPage(hasAnotherPage || false);
  }

  useEffect(() => {
    if (!endOfItemsRef.current) return;

    const element: HTMLDivElement = endOfItemsRef.current;

    const observer = new IntersectionObserver((elem) => {
      console.log("observer update");
      const isVisible = elem[0].isIntersecting;

      if (isVisible) fetchNextPageWrapper();
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
        {isLoading && <Text text={"Loading more content"} />}
        <Separator direction={"column"} />
        {isLastPage && (
          <Text
            text={"No more items to load"}
            className={styles.endOfItems}
          />
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;
