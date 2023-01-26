import React from "react";
import styles from "./ActionBar.module.scss"
import Icon from "../icon/Icon";
import { type YourDashIcon } from "../icon/iconDictionary";

interface IActionBarProps {
  actions: {
    name: string,
    icon: YourDashIcon,
    onClick: () => void
  }[];
}

const ActionBar: React.FC<IActionBarProps> = ({ children, actions }) => (
  <div className={styles.component}>
    {
        actions.map(action => (
          <button type="button" key={action.name} className={styles.action} onClick={action.onClick}>
            <Icon className={styles.icon} name={action.icon} />
            <span className={styles.name}>{action.name}</span>
          </button>
        ))
      }
    {children}
  </div>
)

export default ActionBar