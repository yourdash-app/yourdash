import { useContext, useState } from 'react';
import styles from './DropdownButton.module.scss';
import Button from '../button/Button';
import RightClickMenuContext from '../rightClickMenu/RightClickMenuContext';

export interface IDropdownButton extends React.ComponentPropsWithoutRef<"button"> {
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
  const RootContainerContext = useContext(RightClickMenuContext)

  const [ selectedOption, setSelectedOption ] = useState("")
  const [ dropdownShown, setDropdownShown ] = useState(false)

  return <Button {...extraProps} className={className} onClick={(e) => {
    e.stopPropagation()
    e.preventDefault()

    if (dropdownShown) {
      RootContainerContext(
        0,
        0,
        false,
        []
      )

      setDropdownShown(false)

      return
    }

    const clientRect = e.currentTarget.getBoundingClientRect()

    RootContainerContext(
      clientRect.left,
      clientRect.bottom,
      true,
      items.map((item) => {
        return {
          name: item.name,
          onClick: () => {
            setSelectedOption(item.name)
            item.onClick()
          },
          shortcut: item.shortcut
        }
      })
    )

    setDropdownShown(true)

    let listener = (e: MouseEvent) => {
      e.preventDefault()

      RootContainerContext(
        0,
        0,
        false,
        []
      )

      setDropdownShown(false)

      window.removeEventListener("click", listener)
      window.removeEventListener("contextmenu", listener)
    }

    window.addEventListener("click", listener)
    window.addEventListener("contextmenu", listener)
  }}>
    {selectedOption || children}
  </Button>
};

export default DropdownButton;
