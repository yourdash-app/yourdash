/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react"
import FilePathWidget from "./widgets/filePathWidget/Index"

export interface IStatusBar {
  path: string, // a path which can be parsed to form a filePathWidget
}

const StatusBar: React.FC<IStatusBar> = ( { path } ) => {
  return <section>
    <FilePathWidget filePath={path}/>
  </section>
}

export default StatusBar
