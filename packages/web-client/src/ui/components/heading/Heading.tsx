/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import clippy from "../../../helpers/clippy";
import styles from "./Heading.module.scss"

interface IHeading {
  level?: 1 | 2 | 3 | 4,
  children: React.ReactNode,
  className?: string
}

const Heading: React.FC<IHeading> = ( { level, children, className } ) => {
  switch ( level ) {
  case 1:
    return <h1 className={clippy( styles.component, styles.level1, className || "" )}>{children}</h1>
  case 2:
    return <h2 className={clippy( styles.component, styles.level2, className || "" )}>{children}</h2>
  case 3:
    return <h3 className={clippy( styles.component, styles.level3, className || "" )}>{children}</h3>
  case 4:
    return <h4 className={clippy( styles.component, styles.level4, className || "" )}>{children}</h4>
  default:
    return <h1 className={clippy( styles.component, styles.level1, className || "" )}>{children}</h1>
  }
}

export default Heading
