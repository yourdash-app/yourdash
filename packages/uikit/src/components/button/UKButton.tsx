/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import styles from "./button.module.scss";
import { FC } from "react";

const UKButton: FC<{ onClick: () => void; text: string; className?: string; disabled?: boolean }> = (props) => {
  return (
    <button
      className={clippy(styles.component, props.className)}
      onClick={props.onClick}
      aria-label={props.text}
      disabled={props.disabled}
      type={"button"}
    >
      {props.text}
    </button>
  );
};

export default UKButton;
