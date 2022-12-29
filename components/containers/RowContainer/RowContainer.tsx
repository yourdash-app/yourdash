import { CSSProperties } from 'react';
import styles from './RowContainer.module.css';

export interface IRowContainer {
  children: React.ReactChild | React.ReactChild[];
  className?: string;
  style?: CSSProperties
}

const RowContainer: React.FC<IRowContainer> = ({
  children, className, style 
}) => {
  return <div style={style} className={`${styles.component} ${className}`}>{children}</div>;
};

export default RowContainer;
