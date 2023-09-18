/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "../../../../helpers/clippy";
import styles from "./Widget.module.scss"

const SeparatorWidget: React.FC<{side: "top" | "right" | "bottom" | "left" }> = ( { side } ) => {
  return <div className={ clippy(
    styles.separator,
    ( side === "top" || side === "bottom" ) ? styles.horizontal : styles.vertical
  ) }></div>
}

export default SeparatorWidget
