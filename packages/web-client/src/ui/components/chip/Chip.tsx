/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import style from "./Chip.module.scss";

export interface IChip {
  active?: boolean,
  onClick?: () => void,
  children: string
}

const Chip: React.FC<IChip> = ({
  children,
  active,
  onClick
}) => (
  <button type="button" className={`${ style.component } ${ active ? style.toggled : "" }`} onClick={onClick}>
    {children}
  </button>
);

export default Chip;
