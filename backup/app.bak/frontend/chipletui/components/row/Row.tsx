import styles from './Row.module.scss';
import { CSSProperties } from "react";

export interface IRow {
  style?: CSSProperties;
  className?: string;
  children: React.ReactNode
}

const Row: React.FC<IRow> = ({
  children, style, className
}) => {
  return <div style={ style } className={ `${ styles.component } ${ className }` }>{children}</div>;
};

export default Row;
