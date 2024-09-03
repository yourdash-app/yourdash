import React from "react";
import Container from "../../components/container/container";
import styles from "./carousel.module.scss";
import clippy from "@yourdash/shared/web/helpers/clippy";

const Carousel: React.FC<{
  items: React.ReactElement[];
  className?: string;
}> = ({ items, className }) => {
  return (
    <Container className={clippy(styles.component, className)}>
      {items.map((child) => {
        return <div>{child}</div>;
      })}
      <div className={styles.indicator}></div>
    </Container>
  );
};

export default Carousel;
