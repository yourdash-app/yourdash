import React, { useRef } from "react";
import Card from "../../components/card/card";
import Container from "../../components/container/container";
import remToPx from "../../core/remToPx";
import styles from "./carousel.module.scss";
import clippy from "@yourdash/shared/web/helpers/clippy";

const Carousel: React.FC<{
  items: React.ReactElement[];
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
          return <div className={styles.page}>{child}</div>;
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
                  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
                  scrollRef.current?.scrollTo({
                    behavior: "smooth",
                    left: (index + 1) * ((scrollRef.current.clientWidth / items.length - remToPx(0.5) * (items.length - 1)) * 0.8),
                  });
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
