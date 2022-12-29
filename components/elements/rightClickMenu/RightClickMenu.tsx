import React, { useState } from 'react';
import styles from './RightClickMenu.module.scss';

export interface IRightClickMenu {
  items: {
    name: string,
    shortcut?: string,
    onClick: () => void,
  }[],
  children: React.ReactChild | React.ReactChild[]
}

const RightClickMenu: React.FC<IRightClickMenu> = ({
  items, children 
}) => {
  const [ shown, setShown ] = useState(false)
  const [ posX, setPosX ] = useState(0)
  const [ posY, setPosY ] = useState(0)
  const [ alignLeft, setAlignLeft ] = useState(false)

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
      let rect = e.currentTarget?.getBoundingClientRect()
      if (!rect) return
      setPosX(e.pageX - rect.left)
      setPosY(e.pageY - rect.top)
      setAlignLeft((e.pageX - rect.left) + 320 > rect.width)
    }}
    style={{ position: "relative" }}>
    {children}
    {
      shown ?
        <div className={styles.menu} style={{
          top: `${posY}px`,
          ...alignLeft ? { left: `${posX}px`, } : { right: `${posX}px`, }
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
        : null
    }
  </div >
};

export default RightClickMenu;
