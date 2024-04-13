/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component } from "solid-js";
import styles from "./image.module.scss";

const Image: Component<{ src: string; accessibleLabel: string }> = ({ src, accessibleLabel }) => {
  return (
    <img
      class={styles.component}
      src={src}
      draggable={false}
      alt={accessibleLabel}
    />
  );
};

export default Image;
