/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

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
