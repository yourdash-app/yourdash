/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import styles from "./application.module.scss";
import { Component } from "solid-js";

const Application: Component<{
  src: string;
  position: 0 | 1 | 2 | 3;
}> = ({ src, position }) => {
  return (
    <div class={clippy(styles.container)}>
      <div
        class={clippy(
          styles.floatContainer,
          position === 0
            ? styles.first
            : position === 1
              ? styles.second
              : position === 2
                ? styles.third
                : styles.fourth,
        )}
      >
        <img
          class={clippy(styles.floatingApplication)}
          src={src}
          alt={""}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default Application;
