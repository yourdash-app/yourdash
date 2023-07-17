import React, { CSSProperties } from "react";

import styles from "./Card.module.scss";
import clippy from "../../../helpers/clippy";

export interface ICard extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onClick?: () => void;
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
  level?: "primary" | "secondary" | "tertiary";
  showBorder?: boolean;
}

const Card: React.FC<ICard> = ( {
  children,
  onClick,
  style,
  className,
  level,
  showBorder,
  ...extraProps
} ) => {
  if ( onClick ) {
    return (
      <div /* eslint-disable-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
        tabIndex={0} /* eslint-disable-line jsx-a11y/no-noninteractive-tabindex */
        // @ts-ignore
        style={{ ...style }}
        onClick={onClick}
        {...extraProps}
        className={clippy( styles.component, styles.clickable, level === "secondary" && styles.secondary, level === "tertiary" && styles.tertiary, className, showBorder && styles.border )}
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
