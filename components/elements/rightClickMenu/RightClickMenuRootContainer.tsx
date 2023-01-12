import * as React from "react"
import RightClickMenuContext from "./RightClickMenuContext"
import styles from "./RightClickMenuRootContainer.module.scss"
import RightClickMenuItem from "./RightClickMenuItem"

export interface IRightClickMenuRootContainer { }

const RightClickMenuRootContainer: React.FC<IRightClickMenuRootContainer> = ({ children }) => {
  const [ position, setPosition ] = React.useState({ x: 0, y: 0 })
  const [ visible, setVisible ] = React.useState(false)
  const [ items, setItems ] = React.useState([] as RightClickMenuItem[])

  return <RightClickMenuContext.Provider value={(x, y, visible, items) => {
    setPosition({ x: x, y: y });
    setVisible(visible);
    setItems(items)
  }}>
    <div
      style={{
        top: position.y,
        left: position.x,
        display: visible ? "flex" : "none"
      }}
      className={styles.component}
    >
      {
        items.map((item, ind) => {
          return <span onClick={item.onClick} key={ind}> {item.name}</span>
        })
      }
    </div>
    {children}
  </RightClickMenuContext.Provider >
}

export default RightClickMenuRootContainer