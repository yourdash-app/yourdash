/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.js";
import styles from "./progressBar.module.scss";
import { FC } from "react";

// TODO: rewrite this component to use the HTML progress bar
const ProgressBar: FC<{ maxValue?: number; value: number; className?: string }> = ({ maxValue, value, className }) => {
  return (
    <progress
      max={maxValue}
      value={value}
      className={className}
    />
  );
};

export default ProgressBar;
