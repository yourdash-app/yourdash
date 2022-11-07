import React from "react"
import style from "./Chip.module.scss"

export interface IChip {
  label: string,
  toggled?: boolean,
}

const Chip: React.FC<IChip> = ({ label, toggled }) => {
  return <div className={`${style.component} ${toggled ? style.toggled : ""}`}>
    {label}
  </div>
}

export default Chip