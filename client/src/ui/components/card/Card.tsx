import styles from "./Card.module.scss";
import React, { CSSProperties } from "react";

export interface ICard {
  onClick?: () => void;
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

const Card: React.FC<ICard> = ({ children, onClick, style, className }) => {
  // @formatter:off
  return onClick ? (
    <div /* eslint-disable-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
      tabIndex={0} /* eslint-disable-line jsx-a11y/no-noninteractive-tabindex */
      style={style}
      onClick={onClick}
      className={`${styles.component} ${styles.clickable} ${className}`}
    >
      {children}
    </div>
  ) : (
    <div style={style} className={`${styles.component} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
