import React from "react";
import styles from "./Badge.module.scss"

export interface IBadgeProps {
  badgeCount: number;
  children: React.ReactNode
}

const Badge: React.FC<IBadgeProps> = ({ children, badgeCount }) => {
  return (
      badgeCount !== 0 ? (
        <div className={ styles.component }>
          <span className={ styles.indicator }>
            {badgeCount > 999 ? "999+" : badgeCount}
          </span>
          {children}
        </div>
      ) : (
        <div className={ styles.component }>
          {children}
        </div>
      )
  )
}

export default Badge
