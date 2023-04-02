import styles from "./Card.module.scss";
import React, { CSSProperties } from "react";

export interface ICard {
  compact?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

const Card: React.FC<ICard> = ({
                                 children, compact, onClick, style, className
                               }) => {
  // @formatter:off
  return (
      onClick
      ? (
          <div /* eslint-disable-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
              tabIndex={ 0 } /* eslint-disable-line jsx-a11y/no-noninteractive-tabindex */
              style={ style }
              onClick={ onClick }
              className={ `${ styles.component } ${ compact ? styles.compact : "" } ${ styles.clickable } ${ className }` }
          >{ children }</div>
      )
      : (
          <div
              style={ style }
              className={ `${ styles.component } ${ compact ? styles.compact : "" } ${ className }` }
          >{ children }</div>
      )
  )
};

export default Card;
