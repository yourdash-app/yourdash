/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import styles from "./textButton.module.scss";
import { FC } from "react";

const UKTextButton: FC<{ onClick: () => void; text: string; className?: string }> = (props) => {
  return (
    <button
      className={clippy(styles.component, props.className)}
      onClick={props.onClick}
      aria-label={props.text}
    >
      {props.text}
    </button>
  );
};

export default UKTextButton;
