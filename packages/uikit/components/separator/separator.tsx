/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component } from "solid-js";
import styles from "./separator.module.scss";

const Separator: Component<{ direction: "column" | "row" }> = ({ direction }) => {
  return <div class={`${styles.component} ${styles[direction]}`} />;
};

export default Separator;
