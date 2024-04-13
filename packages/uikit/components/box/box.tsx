/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component, ParentProps } from "solid-js";
import styles from "./box.module.scss";

const Box: Component<ParentProps & { extraClass?: string }> = ({ children, extraClass }) => {
  return <div class={`${styles.component} ${extraClass}`}>{children}</div>;
};

export default Box;
