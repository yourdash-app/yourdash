import { useContext, useState } from 'react';
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

  return (
    <Button
      { ...extraProps }
      className={ className }
      onClick={ e => {
            e.stopPropagation()
            e.preventDefault()

            const clientRect = e.currentTarget.getBoundingClientRect()

            if (dropdownShown) {
              RootContainerContext(
                  0,
                  0,
                  clientRect.width,
                  clientRect.height,
                  false,
                  []
              )

              setDropdownShown(false)
              return
            }


            RootContainerContext(
                clientRect.left,
                clientRect.bottom,
                clientRect.width,
                clientRect.height,
                true,
                items.map(item => {
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

            const listener = (ev: MouseEvent) => {
              ev.preventDefault()

              RootContainerContext(
                  0,
                  0,
                  clientRect.width,
                  clientRect.height,
                  false,
                  []
              )

              setDropdownShown(false)

              window.removeEventListener("click", listener)
              window.removeEventListener("contextmenu", listener)
            }

            window.addEventListener("click", listener)
            window.addEventListener("contextmenu", listener)
          } }
    >
      {selectedOption || children}
    </Button>
  )
};

export default DropdownButton;
