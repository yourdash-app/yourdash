/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.js";
import { Component } from "solid-js";
import styles from "./button.module.scss";

const Button: Component<{ onClick: () => void; text: string; extraClass?: string }> = ({
  onClick,
  text,
  extraClass,
}) => {
  return (
    <button
      class={clippy(styles.component, extraClass)}
      onClick={onClick}
      aria-label={text}
    >
      {text}
    </button>
  );
};

export default Button;
