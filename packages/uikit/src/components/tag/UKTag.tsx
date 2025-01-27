/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import styles from "./tag.module.scss";
import { FC } from "react";

const UKTag: FC<{ text: string; color: string; className?: string }> = (props) => {
  return (
    <div
      className={clippy(styles.component, props.className)}
      style={{ backgroundColor: props.color }}
    >
      {props.text}
    </div>
  );
};

export default UKTag;
