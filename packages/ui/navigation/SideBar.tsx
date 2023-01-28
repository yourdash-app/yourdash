import React, { useState } from "react";
import styles from "./SideBar.module.scss"
import Icon from "../icon/Icon";
import { type ChipletIcon } from "../icon/iconDictionary";

interface ISideBarProps {
  title: string
  items: {
    label: string,
    icon: ChipletIcon,
    onClick: () => void
  }[];
  expandedByDefault?: boolean
}

const SideBar: React.FC<ISideBarProps> = ({ items, title, expandedByDefault }) => {
  const [ expanded, setExpanded ] = useState(expandedByDefault || false)
  return (
    <div className={styles.component} data-expanded={expanded}>
      <header>
        <button
          title={"toggle sidebar"}
          type="button"
          className={styles.toggle}
          onClick={() => {
                return setExpanded(!expanded)
              }}
        >
          <Icon name={"three-bars-16"} color={"var(--sidebar-fg)"}/>
        </button>
        <h2 className={styles.title}>{title}</h2>
      </header>
      {
          items.map(item => {
            return (
              <button type="button" key={item.label} className={styles.item} onClick={item.onClick}>
                <Icon className={styles.icon} name={item.icon} color={"var(--sidebar-fg)"}/>
                <span className={styles.label}>{item.label}</span>
              </button>
            )
          })
        }
    </div>
  )
}


export default SideBar