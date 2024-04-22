/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component } from "solid-js";
import styles from "./textButton.module.scss";

const TextButton: Component<{ onClick: () => void; text: string; extraClass?: string }> = (props) => {
  return (
    <button
      class={`${styles.component} ${props.extraClass}`}
      onClick={props.onClick}
      aria-label={props.text}
    >
      {props.text}
    </button>
  );
};

export default TextButton;
