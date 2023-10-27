/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import styles from "./Index.module.scss"

export interface IWidget {
  filePath: string
}

const Widget: React.FC<IWidget> = ( { filePath } ) => {
  return <div className={styles.widget}>{filePath}</div>
}

export default Widget
