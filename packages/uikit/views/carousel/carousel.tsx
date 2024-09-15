import React, { useRef } from "react";
import Card from "../../components/card/card.tsx";
import Container from "../../components/container/container.tsx";
import styles from "./carousel.module.scss";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";

const Carousel: React.FC<{
  items: { element: React.ReactElement; id: string }[];
  className?: string;
}> = ({ items, className }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

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
                className={styles.pageIndicator}
                onClick={() => {
                  const scrollElement = scrollRef.current;

                  if (!scrollElement) {
                    return;
                  }

                  scrollElement.scrollIntoView({ behavior: "smooth" });

                  const carouselTargetPage = scrollElement.children[index] as HTMLDivElement;

                  carouselTargetPage.scrollIntoView();
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
