/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import styles from "./heading.module.scss";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import React, { FC, useContext } from "react";
import LevelContext from "../../core/level";

const UKHeading: FC<{ text: string; level?: 1 | 2 | 3 | 4 | 5 | 6; className?: string; style?: React.CSSProperties }> = (props) => {
  const level = useContext(LevelContext);

  switch (props.level || level || 1) {
    case 1:
      return (
        <h1
          className={clippy(styles.component, styles.h1component, props.className)}
          style={props.style}
        >
          {props.text}
        </h1>
      );
    case 2:
      return (
        <h2
          className={clippy(styles.component, styles.h2component, props.className)}
          style={props.style}
        >
          {props.text}
        </h2>
      );
    case 3:
      return (
        <h3
          className={clippy(styles.component, styles.h3component, props.className)}
          style={props.style}
        >
          {props.text}
        </h3>
      );
    case 4:
      return (
        <h4
          className={clippy(styles.component, styles.h4component, props.className)}
          style={props.style}
        >
          {props.text}
        </h4>
      );
    case 5:
      return (
        <h5
          className={clippy(styles.component, styles.h5component, props.className)}
          style={props.style}
        >
          {props.text}
        </h5>
      );
    case 6:
      return (
        <h6
          className={clippy(styles.component, styles.h6component, props.className)}
          style={props.style}
        >
          {props.text}
        </h6>
      );
  }
};

export default UKHeading;
