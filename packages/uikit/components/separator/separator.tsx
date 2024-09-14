/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import styles from "./separator.module.scss";
import { FC } from "react";

const Separator: FC<{ direction: "column" | "row" }> = (props) => {
  return <div className={clippy(styles.component, styles[props.direction])} />;
};

export default Separator;
