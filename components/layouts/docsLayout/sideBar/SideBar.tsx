import { useState } from "react"
import Button from "../../../elements/button/Button"
import styles from "./SideBar.module.scss"

export default function DocsSideBar() {
  const [ isExpanded, setIsExpanded ] = useState(true)
  return <div className={`${styles.component} ${isExpanded ? styles.expanded : ""}`}>
    <div>
      <span>Docs</span>
      <Button onClick={() => { setIsExpanded(!isExpanded) }}>
        =
      </Button>
    </div>
  </div>
}