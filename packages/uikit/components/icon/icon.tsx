/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component } from "solid-js";
import { UKIcon } from "./iconDictionary.js";
import styles from "./icon.module.scss";

const Icon: Component<{
  icon: UKIcon;
  size?: string;
  color?: string;
  preserveColor?: boolean;
  extraClass?: string;
}> = ({ icon, size, color, preserveColor, extraClass }) => {
  return (
    <div
      class={`${styles.component} ${extraClass}`}
      style={{ "--icon": `url(${icon})`, ...(!preserveColor ? { "--color": color } : {}), "--size": size }}
    />
  );
};

export default Icon;
