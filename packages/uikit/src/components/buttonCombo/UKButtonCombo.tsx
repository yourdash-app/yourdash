/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import React from "react";
import styles from "./buttonCombo.module.scss";

const UKButtonCombo: React.FC<{ children: React.ReactNode[]; className?: string }> = ({ children, className }) => {
  return <div className={clippy(styles.component, className)}>{children}</div>;
};

export default UKButtonCombo;
