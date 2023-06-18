import React, {CSSProperties} from 'react';

import styles from './Card.module.scss';

export interface ICard {
  onClick?: () => void;
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
  level?: 'primary' | 'secondary' | 'tertiary'
}

const Card: React.FC<ICard> = ({children, onClick, style, className, level}) => {
  if (onClick) {
    return (
      <div /* eslint-disable-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
        tabIndex={0} /* eslint-disable-line jsx-a11y/no-noninteractive-tabindex */
        // @ts-ignore
        style={{...style}}
        onClick={onClick}
        className={`${styles.component} ${styles.clickable} ${level === 'secondary' ? styles.secondary : ''} ${level === 'tertiary' ? styles.tertiary : ''} ${className}`}
      >
        {children}
      </div>
    );
  } else {
    return (
      <div style={style} className={`${ styles.component } ${level === 'secondary' ? styles.secondary : ''} ${level === 'tertiary' ? styles.tertiary : ''} ${ className }`}>
        {children}
      </div>
    );
  }
};

export default Card;
