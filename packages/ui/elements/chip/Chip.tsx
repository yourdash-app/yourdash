import React from "react"
import style from "./Chip.module.scss"

export interface IChip {
  label: string,
  active?: boolean,
  onClick?: () => void,
}

const Chip: React.FC<IChip> = ({
  label, active, onClick 
}) => {
  return <div className={`${style.component} ${active ? style.toggled : ""}`} onClick={onClick}>
    {label}
  </div>
}

export default Chip
