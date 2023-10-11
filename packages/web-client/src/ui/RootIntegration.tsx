/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react"
import RightClickMenuRootContainer from "./components/rightClickMenu/RightClickMenuRootContainer";
import ToastContext from "./components/toast/ToastContext";

const ChipletUiRootIntegration: React.FC<{ children: React.ReactNode }> = ( { children } ) => {
  return (
    <ToastContext.Provider>
      <RightClickMenuRootContainer>
        {children}
      </RightClickMenuRootContainer>
    </ToastContext.Provider>
  )
}

export default ChipletUiRootIntegration
