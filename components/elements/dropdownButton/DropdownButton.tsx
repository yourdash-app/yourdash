import { useState } from 'react';
import styles from './DropdownButton.module.scss';

export interface IDropdownButton extends React.ComponentPropsWithoutRef<"button"> {
  children: string;
  items: {
    name: string,
    shortcut?: string,
    onClick: () => void
  }[]
}

const DropdownButton: React.FC<IDropdownButton> = ({
  children, items, ...extraProps 
}) => {
  const [ selectedOption, setSelectedOption ] = useState("")
  const [ dropdownShown, setDropdownShown ] = useState(false)
  const [ willOverflowScreen, setWillOverflowScreen ] = useState(false)

  return <div
    style={{
      position: "relative",
      height: "max-content"
    }}>
    <div
      style={{ height: "max-content" }}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        let listener = () => {
          setDropdownShown(false)
          document.body.removeEventListener("auxclick", listener)
          document.body.addEventListener("click", listener)
        }
        document.body.addEventListener("click", listener)
        document.body.addEventListener("auxclick", listener)
        setDropdownShown(!dropdownShown)
        let rect = e.currentTarget.getBoundingClientRect()
        setWillOverflowScreen(
          (rect.left + 320) > window.innerWidth
        )
      }}>
      <button
        {...extraProps}
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
