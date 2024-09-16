import React, { useEffect, useRef, useState } from "react";
import Card from "../../components/card/card.tsx";
import Container from "../../components/container/container.tsx";
import styles from "./carousel.module.scss";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";

const Carousel: React.FC<{
  items: { element: React.ReactElement; id: string }[];
  className?: string;
}> = ({ items, className }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const scrollElement = scrollRef.current;

    if (!scrollElement) return;

    let timer: Timer;
    scrollElement.addEventListener("scroll", function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        console.log("event");
        [].slice.call(scrollElement.children).forEach(function (ele: HTMLDivElement, index) {
          if (Math.abs(ele.getBoundingClientRect().left - scrollElement.getBoundingClientRect().left) < 10) {
            console.log(ele);
            setCurrentPage(index);
          }
        });
      }, 100);
    });

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Container className={clippy(styles.containerComponent, className)}>
      <div
        className={styles.component}
        ref={scrollRef}
      >
        {items.map((child) => {
          return (
            <div
              key={child.id}
              className={styles.page}
            >
              {child.element}
            </div>
          );
        })}
        <Card
          containerClassName={styles.indicatorContainer}
          className={styles.indicator}
        >
          {items.map((page, index) => {
            return (
              <button
                key={page.id}
                className={clippy(styles.pageIndicator, index === currentPage && styles.selected)}
                onClick={() => {
                  const scrollElement = scrollRef.current;

                  if (!scrollElement) {
                    return;
                  }

                  scrollElement.scrollIntoView({ behavior: "smooth" });

                  const carouselTargetPage = scrollElement.children[index] as HTMLDivElement;

                  carouselTargetPage.scrollIntoView({ behavior: "smooth" });
                }}
              />
            );
          })}
        </Card>
      </div>
    </Container>
  );
};

export default Carousel;
