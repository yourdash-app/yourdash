import React from "react"
import style from "./Chip.module.scss"

export interface IChip {
  label: string
}

const Chip: React.FC<IChip> = ({ label }) => {
  return <div className={style.component}>
    {label}
  </div>
}

export default Chip