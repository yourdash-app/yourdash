/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.js";
import { Component } from "solid-js";
import styles from "./link.module.scss";

const Link: Component<{ text: string; to: string; extraClass?: string }> = ({ text, to, extraClass }) => {
  return (
    <a
      href={to}
      class={clippy(styles.component, extraClass)}
    >
      {text}
    </a>
  );
};

export default Link;
