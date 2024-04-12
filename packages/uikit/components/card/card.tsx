/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component, ParentProps } from "solid-js";
import IncrementLevel from "../../core/incrementLevel.js";
import { useLevel } from "../../core/level.js";
import styles from "./card.module.scss";

const Card: Component<ParentProps> = ({ children }) => {
  const level = useLevel();
  return (
    <>
      <div class={styles.component}>
        <span>level: {level}</span>
        <IncrementLevel>{children}</IncrementLevel>
      </div>
    </>
  );
};

export default Card;
