import React from "react"

export interface IDateInput {
  children: React.ReactNode,
}

const DateInput: React.FC<IDateInput> = ({ children }) => {
  return <div>DateInput component</div>
}

export default DateInput
