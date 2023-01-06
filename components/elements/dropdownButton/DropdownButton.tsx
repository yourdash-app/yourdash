import { useState } from 'react';
import styles from './DropdownButton.module.scss';

export interface IDropdownButton extends React.ComponentPropsWithoutRef<"div"> {
  children: string;
  items: {
    name: string,
    shortcut?: string,
    onClick: () => void
  }[];
  className?: string;
}

const DropdownButton: React.FC<IDropdownButton> = ({
  children, items, className, ...extraProps 
}) => {
  const [ selectedOption, setSelectedOption ] = useState("")
  const [ dropdownShown, setDropdownShown ] = useState(false)
  const [ willOverflowScreen, setWillOverflowScreen ] = useState(false)

  return <div
    {...extraProps}
    className={`${styles.componentRoot} ${className}`}
    style={{ height: "max-content", }}>
    <div
      style={{ height: "max-content" }}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        const listener = () => {
          setDropdownShown(false)
          document.body.removeEventListener("auxclick", listener)
          document.body.addEventListener("click", listener)
        }
        document.body.addEventListener("click", listener)
        document.body.addEventListener("auxclick", listener)
        setDropdownShown(!dropdownShown)
        const rect = e.currentTarget.getBoundingClientRect()
        setWillOverflowScreen(
          (rect.left + 320) > window.innerWidth
        )
      }}>
      <button
        className={`${styles.component}`}>
        {selectedOption || children}
      </button>
    </div>
    {dropdownShown ?
      <div className={styles.menu} style={{
        top: "100%",
        ...willOverflowScreen ? { right: 0, } : { left: 0 },
        position: "absolute"
      }}>
        {
          items.map((item, ind) => {
            return <li key={ind} onClick={() => {
              setSelectedOption(item.name)
              item.onClick()
            }}>
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

export default DropdownButton;
