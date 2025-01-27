/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "@yourdash/uikit/src/components/icon/iconDictionary.ts";
import React from "react";
import Icon from "../icon/Icon";
import styles from "./IconButton.module.scss";

export interface IIconButton extends React.ComponentPropsWithoutRef<"button"> {
  icon: (typeof UKIcon)[keyof typeof UKIcon] | string;
  vibrant?: boolean;
  disabled?: boolean;
  preserveColor?: boolean;
  className?: string;
  color?: string;
}

const IconButton: React.FC<IIconButton> = ({ icon, vibrant, disabled, preserveColor, className, color, ...extraProps }) => (
  <button
    type={"button"}
    {...extraProps}
    disabled={disabled}
    className={`${styles.component} ${vibrant && styles.vibrant} ${className && className}`}
  >
    <Icon
      preserveColor={preserveColor}
      color={color || "currentColor"}
      icon={icon}
    />
  </button>
);

export default IconButton;
