import React from "react";
import styles from "./Badge.module.scss"

export interface IBadgeProps {
  badgeCount: number;
}

const Badge: React.FC<IBadgeProps> = ({children, badgeCount}) => {return (
  <div className={ styles.component }>
    {
        badgeCount !== 0
            ? (
              <span className={ styles.indicator }>
                {badgeCount > 999 ? "999+" : badgeCount}
              </span>
            ) : null
      }
    {children}
  </div>
)}

export default Badge
