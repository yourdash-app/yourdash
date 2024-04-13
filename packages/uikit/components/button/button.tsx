/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component } from "solid-js";
import styles from "./button.module.scss";

const Button: Component<{ onClick: () => void; text: string }> = ({ onClick, text }) => {
  return (
    <button
      class={styles.component}
      onClick={onClick}
      aria-label={text}
    >
      {text}
    </button>
  );
};

export default Button;
