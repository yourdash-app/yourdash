/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react"
import RightClickMenuRootContainer from "./components/rightClickMenu/RightClickMenuRootContainer";

const ChipletUiRootIntegration: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <RightClickMenuRootContainer>
      {children}
    </RightClickMenuRootContainer>
  )
}

export default ChipletUiRootIntegration
