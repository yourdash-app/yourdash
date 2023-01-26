import styles from "./Tags.module.scss";
import Tag from "../../../../types/core/tag";

export interface ITags {
  tags: Tag[];
  compact?: boolean;
}

const Tags: React.FC<ITags> = ({
                                 tags, compact
                               }) => (
                                 <main className={`${styles.component} ${compact ? styles.compact : ""}`}>
                                   {
          tags.map((tag, ind) => (
            <section key={ind} className={styles.tag}>
              <div style={{ backgroundColor: tag.color }}/>
              <span>{tag.displayName}</span>
            </section>
            ))
        }
                                 </main>
  );

export default Tags;
