import React from "react";
import styles from "./ApplicationBar.module.scss"

interface IApplicationBarProps {
  actions: {
    name: string,
    icon: string,
    onClick: () => void
  }[];
}

const ApplicationBar: React.FC<IApplicationBarProps> = ({ children, actions }) => (
  <div className={styles.component}>
    {
        actions.map(action => (
          <div key={action.name} className={styles.action} onClick={action.onClick}>
            <span className={styles.icon}>icon</span>
            <span>{action.name}</span>
          </div>
        ))
      }
    {children}
  </div>
)

export default ApplicationBar