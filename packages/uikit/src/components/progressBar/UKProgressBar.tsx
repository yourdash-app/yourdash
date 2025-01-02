/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import styles from "./progressBar.module.scss";
import { FC } from "react";

// TODO: rewrite this component to use the HTML progress bar
const UKProgressBar: FC<{ maxValue?: number; value: number; className?: string; indeterminate?: boolean }> = ({
  maxValue,
  value,
  className,
  indeterminate,
}) => {
  return (
    <>
      <progress
        max={maxValue}
        value={value}
        className={className}
      />
      {indeterminate && "This should be indeterminate"}
    </>
  );
};

export default UKProgressBar;
