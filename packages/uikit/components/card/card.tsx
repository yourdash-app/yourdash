/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.js";
import IncrementLevel from "../../core/incrementLevel.js";
import { useLevel, useLevelClass } from "../../core/level.js";
import Box from "../box/box.js";
import styles from "./card.module.scss";
import { FC } from "react";

const Card: FC<{
  level?: 0 | 1 | 2 | 3;
  containerClassName?: string;
  onClick?: () => void;
  className?: string;
  actionsClassName?: string;
  headerClassName?: string;
  children: React.ReactNode | React.ReactNode[];
  actions?: React.ReactNode | React.ReactNode[];
  header?: React.ReactNode | React.ReactNode[];
}> = (props) => {
  const level = props.level || useLevel();
  return (
    <>
      <div
        className={clippy(
          styles.component,
          useLevelClass(level),
          props.containerClassName,
          props.onClick && styles.clickable,
        )}
        onClick={props.onClick}
      >
        <IncrementLevel>
          {props.header && <Box className={clippy(styles.header, props.headerClassName)}>{props.header}</Box>}
          <div className={clippy(styles.content, props.className)}>{props.children}</div>
          {props.actions && <Box className={clippy(styles.actions, props.actionsClassName)}>{props.actions}</Box>}
        </IncrementLevel>
      </div>
    </>
  );
};

export default Card;
