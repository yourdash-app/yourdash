/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component, ParentProps } from "solid-js";
import IncrementLevel from "../../core/incrementLevel.js";
import { useLevel, useLevelClass } from "../../core/level.js";
import styles from "./box.module.scss";

const Box: Component<ParentProps & { extraClass?: string; level?: 0 | 1 | 2 | 3 }> = (props) => {
  const level = props.level || useLevel();

  return (
    <div class={`${styles.component} ${props.extraClass} ${useLevelClass(level)}`}>
      <IncrementLevel>{props.children}</IncrementLevel>
    </div>
  );
};

export default Box;
