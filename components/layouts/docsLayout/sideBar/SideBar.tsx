import { useState } from "react"
import IconButton from "../../../elements/iconButton/IconButton"
import styles from "./SideBar.module.scss"

export default function DocsSideBar() {
  const [ isExpanded, setIsExpanded ] = useState(true)
  return <div className={`${styles.component} ${isExpanded ? styles.expanded : ""}`}>
    <header>
      <span>Docs</span>
      <IconButton icon="three-bars-16" color="#ff0000" onClick={() => {
        setIsExpanded(!isExpanded)
      }} />
    </header>
  </div>
}