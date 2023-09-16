/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react"
import styles from "./Badge.module.scss"

export interface IBadgeProps {
  badgeCount: number;
  children: React.ReactNode
}

const Badge: React.FC<IBadgeProps> = ( { children, badgeCount } ) => {
  return (
    badgeCount !== 0
      ? (
        <div className={ styles.component }>
          <span
            className={ styles.indicator }
            style={ {
              ...badgeCount < 10 ? { aspectRatio: "1/1" } : {}
            } }
          >
            { badgeCount > 999 ? "999+" : badgeCount }
          </span>
          { children }
        </div>
      )
      : (
        <div className={ styles.component }>
          { children }
        </div>
      )
  )
}

export default Badge
