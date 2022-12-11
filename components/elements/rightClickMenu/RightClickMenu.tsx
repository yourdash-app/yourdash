import React, { useState } from 'react';
import styles from './RightClickMenu.module.scss';

export interface IRightClickMenu {
  items: {
    name: string,
    shortcut?: string,
    onClick: () => void,
  }[],
  children: React.ReactChild | React.ReactChild[],
  offset?: {
    x?: string,
    y?: string
  }
}

const RightClickMenu: React.FC<IRightClickMenu> = ({ items, children, offset }) => {
  const [ shown, setShown ] = useState(false)
  const [ posX, setPosX ] = useState(0)
  const [ posY, setPosY ] = useState(0)

  return <div
    onContextMenu={(e) => {
      e.preventDefault()
      e.stopPropagation()
      let listener = () => {
        setShown(false)
        document.body.removeEventListener("click", listener)
      }
      document.body.addEventListener("click", listener)
      document.body.addEventListener("auxclick", listener)
      setShown(!shown)
      setPosX(e.pageX)
      setPosY(e.pageY)
    }}
    style={{
      position: "relative"
    }}>
    {children}
    {shown ?
      <div className={styles.menu} style={{
        top: `calc(${posY}px ${offset?.y ? offset?.y : "+ 0px"})`,
        left: `calc(${posX}px ${offset?.x ? offset?.x : "+ 0px"})`
      }}>
        {
          items.map((item, ind) => {
            return <li key={ind} onClick={item.onClick}>
              <span>{item.name}</span>
              {
                item?.shortcut ? <span>{item.shortcut}</span> : null
              }
            </li>
          })
        }
      </div>
      : null}
  </div>
};

export default RightClickMenu;
