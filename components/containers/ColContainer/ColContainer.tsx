import { CSSProperties } from 'react';
import styles from './ColContainer.module.css';

export interface IColContainer {
  children: React.ReactChild | React.ReactChild[];
  className?: string;
  style?: CSSProperties;
}

const ColContainer: React.FC<IColContainer> = ({ children, className, style }) => {
  return <div style={style} className={`${styles.component} ${className}`}>{children}</div>;
};

export default ColContainer;
