/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component, ParentProps } from "solid-js";
import IncrementLevel from "../../core/incrementLevel.js";
import { useLevel, useLevelClass } from "../../core/level.js";
import styles from "./card.module.scss";

const Card: Component<ParentProps & { level?: 0 | 1 | 2 | 3; extraClass?: string }> = (props) => {
  const level = props.level || useLevel();
  return (
    <>
      <div class={`${styles.component} ${useLevelClass(level)} ${props.extraClass}`}>
        <IncrementLevel>{props.children}</IncrementLevel>
      </div>
    </>
  );
};

export default Card;
