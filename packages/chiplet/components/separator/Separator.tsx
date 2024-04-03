/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import React from "react";
import styles from "./Separator.module.scss";

const Separator: React.FC<{ direction: "horizontal" | "vertical" }> = ({ direction }) => {
  return (
    <div className={clippy(styles.separator, direction === "horizontal" ? styles.horizontal : styles.vertical)}></div>
  );
};

export default Separator;
