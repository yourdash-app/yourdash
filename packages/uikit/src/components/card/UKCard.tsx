/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import IncrementLevel from "../../core/incrementLevel.tsx";
import { useLevel, useLevelClass } from "../../core/level.tsx";
import UKBox from "../box/UKBox.tsx";
import styles from "./card.module.scss";
import React, { FC, Ref } from "react";
import DecrementLevel from "../../core/decrementLevel.tsx";

const UKCard: FC<{
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
            {props.header && <UKBox className={clippy(styles.header, props.headerClassName)}>{props.header}</UKBox>}
            <div className={clippy(styles.content, props.className)}>{props.children}</div>
            {props.actions && <UKBox className={clippy(styles.actions, props.actionsClassName)}>{props.actions}</UKBox>}
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
          {props.header && <UKBox className={clippy(styles.header, props.headerClassName)}>{props.header}</UKBox>}
          <div className={clippy(styles.content, props.className)}>{props.children}</div>
          <DecrementLevel>
            {props.actions && <UKBox className={clippy(styles.actions, props.actionsClassName)}>{props.actions}</UKBox>}
          </DecrementLevel>
        </div>
      </IncrementLevel>
    </>
  );
};

export default UKCard;
