import React from "react"
import style from "./Chip.module.scss"

export interface IChip {
  label: string,
  toggled?: boolean,
  onClick?: () => void
}

const Chip: React.FC<IChip> = ({ label, toggled, onClick }) => {
  return <div className={`${style.component} ${toggled ? style.toggled : ""}`} onClick={onClick}>
    {label}
  </div>
}

export default Chip