/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component } from "solid-js";
import Icon from "../icon/icon.js";
import { UKIcon } from "../icon/iconDictionary.js";
import styles from "./iconButton.module.scss";

const IconButton: Component<{
  icon: UKIcon;
  accessibleLabel: string;
  onClick: () => void;
  extraClass?: string;
  preserveColor?: boolean;
}> = (props) => {
  return (
    <button
      onClick={props.onClick}
      aria-label={props.accessibleLabel}
      class={`${styles.component} ${props.extraClass}`}
    >
      <Icon
        size={"1.25rem"}
        preserveColor={props.preserveColor}
        icon={props.icon}
      />
    </button>
  );
};

export default IconButton;
