import React, { useState } from 'react';
import styles from './DropdownMenu.module.scss';

export interface IDropdownMenu extends React.ComponentPropsWithoutRef<"div"> {
  items: {
    name: string,
    shortcut?: string,
    onClick: () => void,
  }[]
}

const DropdownMenu: React.FC<IDropdownMenu> = ({ items, children, ...extraProps }) => {
  const [ shown, setShown ] = useState(false)

  return <div
    {...extraProps}
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
      setShown(!shown)
    }}>
      {children}
    </div>
    {shown ?
      <div
        className={styles.menu}
        onClick={(e) => {
          e.stopPropagation()
        }}
        style={{
          top: "100%",
          left: 0,
          position: "absolute"
        }}>
        {
          items.map((item, ind) => {
            return <div
              key={ind}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                item.onClick()
              }}>
              <span>{item.name}</span>
              {
                item?.shortcut ? <span>{item.shortcut}</span> : null
              }
            </div>
          })
        }
      </div>
      : null}
  </div>
};

export default DropdownMenu;
