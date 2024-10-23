/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import React from "react";
import styles from "./buttonCombo.module.scss";

const ButtonCombo: React.FC<{ children: React.ReactNode[] }> = ({ children }) => {
  return <div className={clippy(styles.component)}>{children}</div>;
};

export default ButtonCombo;
