/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import IncrementLevel from "../../core/incrementLevel.js";
import { useLevel, useLevelClass } from "../../core/level.js";
import styles from "./card.module.scss";
import { FC } from "react";

const Card: FC<{ level?: 0 | 1 | 2 | 3; extraClass?: string; children: React.ReactNode | React.ReactNode[] }> = (
  props,
) => {
  const level = props.level || useLevel();
  return (
    <>
      <div className={`${styles.component} ${useLevelClass(level)} ${props.extraClass}`}>
        <IncrementLevel>{props.children}</IncrementLevel>
      </div>
    </>
  );
};

export default Card;
