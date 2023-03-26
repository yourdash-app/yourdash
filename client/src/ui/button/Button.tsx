import React from "react"

export interface IButton {
  children: React.ReactNode,
}

const Button: React.FC<IButton> = ({ children }) => {
  return <div>Button component</div>
}

export default Button
