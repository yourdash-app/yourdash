/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.js";
import { Component } from "solid-js";
import styles from "./text.module.scss";

const Text: Component<{ text: string; extraClass?: string }> = (props) => {
  return <div class={clippy(styles.component, props.extraClass)}>{props.text}</div>;
};

export default Text;
