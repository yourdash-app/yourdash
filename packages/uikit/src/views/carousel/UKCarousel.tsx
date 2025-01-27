import React, { useEffect, useRef, useState } from "react";
import UKCard from "../../components/card/UKCard.tsx";
import UKContainer from "../../components/container/UKContainer.tsx";
import { UKIcons } from "../../core/iconDictionary.ts";
import UKIconButton from "../../components/iconButton/UKIconButton.tsx";
import styles from "./carousel.module.scss";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";

const UKCarousel: React.FC<{
  items: { element: React.ReactElement; id: string }[];
  className?: string;
}> = ({ items, className }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const scrollElement = scrollRef.current;

    if (!scrollElement) return;

    console.log(Array.from(scrollElement.children));

    let timer: number;
    let listener = () => {
      clearTimeout(timer);
      timer = setTimeout(function () {
        Array.from(scrollElement.children).forEach((ele: Element, index: number) => {
          if (
            Math.abs(
              ele.getBoundingClientRect().left +
                ele.getBoundingClientRect().width / 2 -
                (scrollElement.getBoundingClientRect().left + scrollElement.getBoundingClientRect().width / 2),
            ) <
            ele.getBoundingClientRect().width / 2
          ) {
            setCurrentPage(index);
            return;
          }
        });
      }, 16) as unknown as number;
    };

    scrollElement.addEventListener("scroll", listener);

    return () => {
      scrollElement.removeEventListener("scroll", listener);
      clearTimeout(timer);
    };
  }, []);

  return (
    <UKContainer className={clippy(styles.containerComponent, className)}>
      <div
        className={styles.component}
        data-pages={true}
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
      </div>
      <div className={styles.controls}>
        <UKIconButton
          accessibleLabel={"previous page"}
          icon={UKIcons.ChevronLeft}
          className={styles.pageControl}
          onClick={() => {
            const scrollElement = scrollRef.current;

            if (!scrollElement) {
              return;
            }

            const carouselTargetPage = scrollElement.children[currentPage - 1] as HTMLDivElement;

            if (!carouselTargetPage) {
              return;
            }

            carouselTargetPage.scrollIntoView({ behavior: "smooth" });
          }}
        />
        <UKCard className={styles.indicator}>
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
        </UKCard>
        <UKIconButton
          accessibleLabel={"next page"}
          icon={UKIcons.ChevronRight}
          className={styles.pageControl}
          onClick={() => {
            const scrollElement = scrollRef.current;

            if (!scrollElement) {
              return;
            }

            const carouselTargetPage = scrollElement.children[currentPage + 1] as HTMLDivElement;

            if (!carouselTargetPage) {
              return;
            }

            carouselTargetPage.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>
    </UKContainer>
  );
};

export default UKCarousel;
