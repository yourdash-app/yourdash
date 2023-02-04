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
  return (
    <button type="button" className={ `${style.component} ${active ? style.toggled : ""}` } onClick={ onClick }>
      {label}
    </button>
  )
}

export default Chip
