/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component } from "solid-js";
import styles from "./text.module.scss";

const Text: Component<{ text: string }> = (props) => {
  return <div class={styles.component}>{props.text}</div>;
};

export default Text;
