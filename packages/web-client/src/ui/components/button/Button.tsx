/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import styles from "./Button.module.scss";

export interface IButton extends React.ComponentPropsWithoutRef<"button"> {
  className?: string;
}

const Button: React.FC<IButton> = ( {
  children, className, ...extraProps
} ) => (
  <button
    type="button"
    {...extraProps}
    className={`${ styles.component } ${ className }`}
  >
    {children}
  </button>
);

export default Button;
