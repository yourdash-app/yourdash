import { useState } from 'react';
import styles from './SideBar.module.scss';
import YourDashIcon from '../icon/iconDictionary';
import IconButton from '../iconButton/IconButton'
import Icon from '../icon/Icon';

export interface ISideBar extends React.ComponentPropsWithoutRef<"div"> {
  items: (
      {
      name: string,
      icon: YourDashIcon,
      onClick: () => void,
      type: "button",
    } | {
      type: "separator"
    } | {
      name: string,
      icon: YourDashIcon,
      type: "category",
      items: {
        name: string,
        icon: YourDashIcon,
        onClick: () => void,
        type: "button",
      }[]
    }
  )[]
  title: string,
}

const SideBar: React.FC<ISideBar> = ({
  title, items, ...extraProps 
}) => {
  const [ toggledSections, setToggledSections ] = useState([] as number[])
  const [ expanded, setExpanded ] = useState(true)

  return <main className={`${styles.component} ${expanded ? styles.expanded : ""}`} {...extraProps}>
    <header className={styles.header}>
      <IconButton icon={expanded ? 'x-16' : 'three-bars-16'} onClick={() => {
        setExpanded(!expanded)
      }} />
      <h1>{title}</h1>  
    </header>
    <section className={styles.items}>
      {
        items.map((item, ind) => {
          switch (item.type) {
            case "separator":
              return <div key={ind} className={styles.separator}></div>
            case "button":
              return <button key={ind} className={styles.button} onClick={item.onClick}>
                <Icon color={"var(--button-fg)"} name={item.icon} />
                <span>
                  {item.name}
                </span>
              </button>
            case "category":
              return <div className={styles.category} data-expanded={toggledSections.indexOf(ind) !== -1}>
                <header onClick={() => {
                  if (toggledSections.indexOf(ind) !== -1) {
                    setToggledSections(toggledSections.filter((toggled) => toggled !== ind))
                  } else {
                    setToggledSections([ ...toggledSections, ind ])
                  }
                }}>
                  <Icon color={"var(--button-fg)"} name={item.icon} />
                  <span>
                    {item.name}
                  </span>
                  <Icon color={"var(--button-fg)"} name="chevron-down-16" />
                </header>
                <section>
                  {
                    item.items.map((item, ind) => {
                      switch (item.type) {
                        case "button":
                          return <button key={ind} className={styles.button} onClick={item.onClick}>
                            <Icon color={"var(--button-fg)"} name={item.icon} />
                            <span>
                              {item.name}
                            </span>
                          </button>
                        default: 
                          return <div key={ind}>Unknown item type</div>
                      }
                    })
                  }
                </section>
              </div>
            default: 
              return <div key={ind}>Unknown item type</div>
          }
        })
      }
    </section>
  </main>;
};

export default SideBar;