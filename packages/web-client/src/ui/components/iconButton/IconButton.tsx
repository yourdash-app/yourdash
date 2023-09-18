/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";

import Icon from "../icon/Icon";
import { YourDashIcon } from "../icon/iconDictionary";

import styles from "./IconButton.module.scss";

export interface IIconButton extends React.ComponentPropsWithoutRef<"button"> {
  icon: YourDashIcon;
  vibrant?: boolean;
  disabled?: boolean;
  useDefaultColor?: boolean;
  className?: string;
  color?: string;
}

const IconButton: React.FC<IIconButton> = ( {
  icon,
  vibrant,
  disabled,
  useDefaultColor,
  className,
  color,
  ...extraProps
} ) => (
  <button
    type={"button"}
    {...extraProps}
    disabled={disabled}
    className={`${ styles.component } ${ vibrant && styles.vibrant } ${ className && className }`}
  >
    <Icon useDefaultColor={useDefaultColor} color={color || "currentColor"} icon={icon}/>
  </button>
);

export default IconButton;
