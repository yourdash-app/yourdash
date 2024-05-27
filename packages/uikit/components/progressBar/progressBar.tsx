/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.js";
import styles from "./progressBar.module.scss";
import { FC } from "react";

const ProgressBar: FC<{ value: number; className?: string }> = ({ value, className }) => {
  return (
    <div className={clippy(styles.component, className)}>
      <div
        className={styles.bar}
        /* @ts-ignore */
        style={{ "--ukcomp-progress": `${value * 100}%` }}
      />
    </div>
  );
};

export default ProgressBar;
