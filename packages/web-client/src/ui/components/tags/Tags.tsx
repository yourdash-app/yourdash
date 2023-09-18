/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

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
