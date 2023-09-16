/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

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
