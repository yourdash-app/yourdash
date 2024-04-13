/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component } from "solid-js";
import styles from "./subtext.module.scss";

const Subtext: Component<{ text: string }> = ({ text }) => {
  return <div class={styles.component}>{text}</div>;
};

export default Subtext;