import React, { useState } from "react";
import styles from "./SideBar.module.scss"
import Icon from "../icon/Icon";
import { type ChipletIcon } from "../icon/iconDictionary";

interface ISideBarProps {
  actions: {
    label: string,
    icon: ChipletIcon,
    onClick: () => void
  }[];
  focusedActions?: {
    label: string,
    icon: ChipletIcon,
    onClick: () => void
  }[]
}

const SideBar: React.FC<ISideBarProps> = ({ actions, focusedActions }) => {
  return (
    <div className={styles.component}>
      <section className={styles.focussedActions}>
        {
            focusedActions?.map(action => {
              return (
                <button className={styles.focussedAction} type="button" key={action.label} onClick={action.onClick}>
                  <Icon className={styles.icon} name={action.icon} color={"var(--actionbar-fg)"}/>
                  <span>{action.label}</span>
                </button>
              )
            })
          }
      </section>
      <section className={styles.actions}>
        {
            actions.map(action => {
              return (
                <button type="button" key={action.label} className={styles.action} onClick={action.onClick}>
                  <div className={styles.iconBackground}>
                    <Icon className={styles.icon} name={action.icon} color={"var(--actionbar-fg)"}/>
                  </div>
                  <span className={styles.name}>{action.label}</span>
                </button>
              )
            })
          }
      </section>
    </div>
  )
}


export default SideBar