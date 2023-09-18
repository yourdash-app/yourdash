/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { CSSProperties, MouseEventHandler } from "react";

import styles from "./Card.module.scss";
import clippy from "web-client/src/helpers/clippy";

export interface ICard extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onClick?: MouseEventHandler<HTMLDivElement> | ( () => void );
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
  level?: "primary" | "secondary" | "tertiary";
  showBorder?: boolean;
  unStyledClickable?: boolean;
}

const Card: React.FC<ICard> = ( {
  children,
  onClick,
  style,
  className,
  level,
  showBorder,
  unStyledClickable: unStyledClickable,
  ...extraProps
} ) => {
  if ( onClick ) {
    return (
      <div
        tabIndex={0}
        // @ts-ignore
        style={{ ...style }}
        onClick={onClick}
        {...extraProps}
        className={clippy( styles.component, !unStyledClickable && styles.clickable, level === "secondary" && styles.secondary, level === "tertiary" && styles.tertiary, className, showBorder && styles.border )}
      >
        {children}
      </div>
    );
  } else {
    return (
      <div {...extraProps} style={style} className={clippy( styles.component, level === "secondary" && styles.secondary, level === "tertiary" && styles.tertiary, className, showBorder && styles.border )}>
        {children}
      </div>
    );
  }
};

export default Card;
