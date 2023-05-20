import React, { CSSProperties, useState } from "react"
import styles from "./SideBar.module.scss"
import IconButton from "../iconButton/IconButton"
import { ChipletIcon } from "../icon/iconDictionary"
import { Icon } from "../.."

export interface ISideBarProps {
  title: string;
  items: {
    label: string;
    icon: ChipletIcon;
    onClick: () => void;
  }[];
  expandedByDefault?: boolean;
  headerContent?: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

const SideBar: React.FC<ISideBarProps> = ( { items, title, expandedByDefault, headerContent, style, className } ) => {
  const [expanded, setExpanded] = useState( expandedByDefault || false )
  return (
    <div className={ `${ styles.component } ${ className }` } data-expanded={ expanded } style={ style }>
      <IconButton
        className={ styles.toggleButton }
        icon={ "three-bars-16" }
        onClick={ () => {
          return setExpanded( !expanded )
        } }
      />
      <header className={ styles.header }>
        <section className={ styles.titleContainer }>
          <h2 className={ styles.title }>{ title }</h2>
        </section>
        { headerContent }
      </header>
      <section className={ styles.items }>
        { items.map( item => {
          return (
            <button className={ styles.item } type="button" key={ item.label } onClick={ item.onClick }>
              <Icon className={ styles.itemIcon } name={ item.icon }/>
              <span className={ styles.itemLabel } data-expanded={ expanded }>
                { item.label }
              </span>
            </button>
          )
        } ) }
      </section>
    </div>
  )
}

export default SideBar
