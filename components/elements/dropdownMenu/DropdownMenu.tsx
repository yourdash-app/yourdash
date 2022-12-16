import React, { useState } from 'react';
import styles from './DropdownMenu.module.scss';

export interface IDropdownMenu {
  items: {
    name: string,
    shortcut?: string,
    onClick: () => void,
  }[],
  children: React.ReactChild | React.ReactChild[]
}

const DropdownMenu: React.FC<IDropdownMenu> = ({ items, children }) => {
  const [ shown, setShown ] = useState(false)

  return <div
    style={{
      position: "relative"
    }}>
    <div onClick={(e) => {
      e.preventDefault()
      e.stopPropagation()
      let listener = () => {
        setShown(false)
        document.body.removeEventListener("auxclick", listener)
        document.body.addEventListener("click", listener)
      }
      document.body.addEventListener("click", listener)
      document.body.addEventListener("auxclick", listener)
      setShown(true)
    }}>
      {children}
    </div>
    {shown ?
      <div className={styles.menu} style={{
        top: "100%",
        left: 0,
        position: "absolute"
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

export default DropdownMenu;
