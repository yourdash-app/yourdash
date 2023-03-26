import React from "react"

export interface IMajorButton {
  children: React.ReactNode,
}

const MajorButton: React.FC<IMajorButton> = ({ children }) => {
  return <div>MajorButton component</div>
}

export default MajorButton
