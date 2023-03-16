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
