/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import React from "react";
import styles from "./FloatingApplication.module.scss";

const FloatingApplication: React.FC<{
  src: string;
  position: 0 | 1 | 2 | 3;
}> = ({ src, position }) => {
  return (
    <div className={clippy(styles.container)}>
      <div
        className={clippy(
          "animate__animated animate__pulse animate__infinite",
          styles.floatContainer,
          position === 0 ? styles.first : position === 1 ? styles.second : position === 2 ? styles.third : styles.fourth,
        )}
      >
        <img
          className={clippy(styles.floatingApplication)}
          src={src}
          alt={""}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default FloatingApplication;
