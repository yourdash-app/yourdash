/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import { FC, ReactNode } from "react";
import IncrementLevel from "../../core/incrementLevel.tsx";
import { useLevel, useLevelClass } from "../../core/level.tsx";
import styles from "./container.module.scss";

const UKContainer: FC<{ className?: string; level?: 0 | 1 | 2 | 3; children: ReactNode | ReactNode[]; disableRounding?: boolean }> = (
  props,
) => {
  const level = props.level || useLevel();

  return (
    <div className={clippy(styles.component, props.className, props.disableRounding && styles.disableRounding, useLevelClass(level))}>
      <IncrementLevel>{props.children}</IncrementLevel>
    </div>
  );
};

export default UKContainer;
