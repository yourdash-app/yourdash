import React, { useContext } from 'react';
import RightClickMenuContext from "../rightClickMenu/RightClickMenuContext";

export interface IDropdownContainer extends React.ComponentPropsWithoutRef<"div"> {
  items: {
    name: string,
    shortcut?: string,
    onClick: () => void,
  }[]
}

const DropdownContainer: React.FC<IDropdownContainer> = ({
                                                           items, children, ...extraProps
                                                         }) => {
  const RootContainerContext = useContext(RightClickMenuContext)

  return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      style={ { background: "transparent", border: "none", padding: 0, margin: 0 } }
      onClick={ e => {
            e.stopPropagation()
            e.preventDefault()

            const clientRect = e.currentTarget.getBoundingClientRect()


            RootContainerContext(
                clientRect.left,
                clientRect.bottom,
                clientRect.width,
                clientRect.height,
                true,
                items
            )

            const listener = (ev: MouseEvent) => {
              ev.preventDefault()
              e.stopPropagation()

              RootContainerContext(
                  0,
                  0,
                  clientRect.width,
                  clientRect.height,
                  false,
                  []
              )

              window.removeEventListener("click", listener)
              window.removeEventListener("contextmenu", listener)
            }
            window.addEventListener("click", listener)
            window.addEventListener("contextmenu", listener)
          }
          }
    >
      {children}
    </div>
  )
};

export default DropdownContainer;
