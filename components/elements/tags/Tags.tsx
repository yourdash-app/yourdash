import { CSSProperties } from "react";
import styles from "./Tags.module.scss";
import Tag from "../../../types/core/tag";

export interface ITags {
  tags: Tag[];
  compact?: boolean;
}

const Tags: React.FC<ITags> = ({ tags, compact }) => {
  return (
    <main className={`${styles.component} ${compact ? styles.compact : ""}`}>
      {
        tags.map((tag) => {
          return (
            <section className={styles.tag}>
              <div style={{ backgroundColor: tag.color }}></div>
              <span>{tag.displayName}</span>
            </section>
          );
        })
      }
    </main>
  );
};

export default Tags;
