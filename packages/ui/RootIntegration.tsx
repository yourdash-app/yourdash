import React from "react"
import "./variables.css"
import RightClickMenuRootContainer from "./components/rightClickMenu/RightClickMenuRootContainer";

const ChipletUiRootIntegration: React.FC = ({ children }) => {
  return (
    <RightClickMenuRootContainer>
      {children}
    </RightClickMenuRootContainer>
  )
}

export default ChipletUiRootIntegration
