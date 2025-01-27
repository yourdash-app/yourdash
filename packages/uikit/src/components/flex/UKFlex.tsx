/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import styles from "./flex.module.scss";
import React, { FC, ReactNode } from "react";

const UKFlex: FC<{
  direction: "row" | "column";
  className?: string;
  children: ReactNode | ReactNode[];
  style?: React.CSSProperties;
  centerHorizontally?: boolean;
  centerVertically?: boolean;
  padding?: boolean;
}> = (props) => {
  return (
    <div
      style={props.style}
      className={clippy(
        styles.component,
        styles[props.direction],
        props.className,
        props.centerHorizontally && styles.centerHorizontally,
        props.centerVertically && styles.centerVertically,
        props.padding && styles.padding,
      )}
    >
      {props.children}
    </div>
  );
};

export default UKFlex;
