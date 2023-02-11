import React, { useContext } from 'react';
import RightClickMenuContext from './RightClickMenuContext';
import RightClickMenuItem from './RightClickMenuItem';

export interface IRightClickMenu extends React.ComponentPropsWithoutRef<"section"> {
  items: RightClickMenuItem[]
}

const RightClickMenu: React.FC<IRightClickMenu> = ({
                                                     items, children
                                                   }) => {
  const RootContainerContext = useContext(RightClickMenuContext)

  return (
    <section onContextMenu={ e => {
        e.stopPropagation()
        e.preventDefault()

        const clientRect = e.currentTarget.getBoundingClientRect()

        RootContainerContext(
            e.pageX,
            e.pageY,
            clientRect.width,
            clientRect.height,
            true,
            items
        )

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

          window.removeEventListener("click", listener)
          window.removeEventListener("contextmenu", listener)
        }

        window.addEventListener("click", listener)
        window.addEventListener("contextmenu", listener)
      } }
    >
      {children}
    </section>
  )
};

export default RightClickMenu;
