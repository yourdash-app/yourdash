import React from "react";
import styles from "./ActionBar.module.scss"
import Icon from "../icon/Icon";
import { type YourDashIcon } from "../icon/iconDictionary";

interface IActionBarProps {
  actions: {
    label: string, icon: YourDashIcon, onClick: () => void
  }[];
  focusedActions?: {
    label: string, icon: YourDashIcon, onClick: () => void
  }[]
}

const ActionBar: React.FC<IActionBarProps> = ({ children, actions, focusedActions }) => (
  <div className={styles.component}>
    <section className={styles.focussedActions}>
      {focusedActions?.map(action => (
        <button className={styles.focussedAction} type="button" key={action.label} onClick={action.onClick}>
          <Icon className={styles.icon} name={action.icon} color={"var(--actionbar-fg)"}/>
          <span>{action.label}</span>
        </button>
      ))
    }
    </section>
    <section className={styles.actions}>
      {
      actions.map(action => (
        <button type="button" key={action.label} className={styles.action} onClick={action.onClick}>
          <div className={styles.iconBackground}>
            <Icon className={styles.icon} name={action.icon} color={"var(--actionbar-fg)"}/>
          </div>
          <span className={styles.name}>{action.label}</span>
        </button>
      ))
    }
    </section>
    {children}
  </div>
)

export default ActionBar