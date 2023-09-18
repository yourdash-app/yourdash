import styles from "./Tags.module.scss";

type COLOR = `#${string}` | `rgb(${string})` | `rgba(${string})` | `var(--${string})`

export interface ITags {
    tags: {
        name: string,
        color: COLOR,
        displayName: string
    }[];
    compact?: boolean;
}

const Tags: React.FC<ITags> = ({
                                 tags, compact
                               }) => {
  return (
      <main className={`${styles.component} ${compact ? styles.compact : ""}`}>
          {tags.map((tag) => {
              return (
                  <section key={tag.name + tag.color} className={styles.tag}>
                      <div style={{ backgroundColor: tag.color }} />
                      <span>{tag.displayName}</span>
                  </section>
              );
          })}
      </main>
  );
};

export default Tags; 
