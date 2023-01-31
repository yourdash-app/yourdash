import React, { useState } from "react";
import styles from "./SideBar.module.scss"
import Icon from "../icon/Icon";
import { type ChipletIcon } from "../icon/iconDictionary";
import IconButton from "../backup/elements/iconButton/IconButton";

interface ISideBarProps {
  title: string
  items: {
    label: string,
    icon: ChipletIcon,
    onClick: () => void
  }[];
  expandedByDefault?: boolean,
  headerContent?: React.ReactNode
}

const SideBar: React.FC<ISideBarProps> = ({ items, title, expandedByDefault, headerContent }) => {
  const [ expanded, setExpanded ] = useState(expandedByDefault || false)
  return (
    <div className={ styles.component } data-expanded={ expanded }>
      <IconButton className={ styles.toggleButton } icon={ "three-bars-16" } onClick={ () => {return setExpanded(!expanded)} }/>
      <header className={ styles.header }>
        <h2 className={ styles.title }>{title}</h2>
        {headerContent}
      </header>
      <section className={ styles.items }>
        {
          items.map(item => {
            return (
              <button className={ styles.item } type="button" key={ item.label } onClick={ item.onClick }>
                <Icon name={ item.icon }/>
                <span className={ styles.itemLabel }>
                  {item.label}
                </span>
              </button>
            )
          })
        }
      </section>
    </div>
  )
}


export default SideBar