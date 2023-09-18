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
  >{children}</button>
);

export default Button;
