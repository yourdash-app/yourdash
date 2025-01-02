/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import styles from "./separator.module.scss";
import { FC } from "react";

const UKSeparator: FC<{ direction: "column" | "row"; disableMargin?: boolean }> = (props) => {
  return <div className={clippy(styles.component, styles[props.direction], props.disableMargin && styles.disableMargin)} />;
};

export default UKSeparator;
