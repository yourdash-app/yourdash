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
}> = (props) => {
  return (
    <div
      class={`${styles.component} ${props.extraClass} ${props.preserveColor ? styles.preserveColor : ""}`}
      style={{
        "--icon": `url(${props.icon})`,
        ...(!props.preserveColor ? { "--color": props.color } : {}),
        "--size": props.size,
      }}
    />
  );
};

export default Icon;
