/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import IncrementLevel from "../../core/incrementLevel.tsx";
import { useLevel, useLevelClass } from "../../core/level.tsx";
import Box from "../box/box.tsx";
import styles from "./card.module.scss";
import { FC, Ref } from "react";
import DecrementLevel from "../../core/decrementLevel.tsx";

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
  style?: React.CSSProperties;
}> = (props) => {
  const level = props.level || useLevel();

  if (props.onClick) {
    return (
      <>
        <IncrementLevel>
          <button
            style={props.style}
            className={clippy(styles.component, useLevelClass(level), props.containerClassName, styles.clickable)}
            onClick={props.onClick}
          >
            {props.header && <Box className={clippy(styles.header, props.headerClassName)}>{props.header}</Box>}
            <div className={clippy(styles.content, props.className)}>{props.children}</div>
            {props.actions && <Box className={clippy(styles.actions, props.actionsClassName)}>{props.actions}</Box>}
          </button>
        </IncrementLevel>
      </>
    );
  }

  return (
    <>
      <IncrementLevel>
        <div
          style={props.style}
          className={clippy(styles.component, useLevelClass(level), props.containerClassName)}
        >
          {props.header && <Box className={clippy(styles.header, props.headerClassName)}>{props.header}</Box>}
          <div className={clippy(styles.content, props.className)}>{props.children}</div>
          <DecrementLevel>
            {props.actions && <Box className={clippy(styles.actions, props.actionsClassName)}>{props.actions}</Box>}
          </DecrementLevel>
        </div>
      </IncrementLevel>
    </>
  );
};

export default Card;
