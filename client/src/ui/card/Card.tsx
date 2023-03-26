import React from "react"

export interface ICard {
  children: React.ReactNode,
}

const Card: React.FC<ICard> = ({ children }) => {
  return <div>Card component</div>
}

export default Card
