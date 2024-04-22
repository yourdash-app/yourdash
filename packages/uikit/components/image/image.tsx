/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component } from "solid-js";
import styles from "./image.module.scss";

const Image: Component<{ src: string; accessibleLabel: string; extraClass?: string }> = (props) => {
  return (
    <img
      class={`${styles.component} ${props.extraClass}`}
      src={props.src}
      draggable={false}
      alt={props.accessibleLabel}
    />
  );
};

export default Image;
