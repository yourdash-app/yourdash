import styles from './Column.module.scss';
import { CSSProperties } from "react";

export interface IColumn {
  style?: CSSProperties;
  className?: string;
  children: React.ReactNode
}

const Column: React.FC<IColumn> = ({
  children, style, className
}) => {
  return <div style={ style } className={ `${ styles.component } ${ className }` }>{children}</div>;
};

export default Column;
