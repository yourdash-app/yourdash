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
    RootContainerContext(
        e.pageX,
        e.pageY,
        true,
        items
    )

    const listener = (e: MouseEvent) => {
      e.preventDefault()

      RootContainerContext(
          0,
          0,
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
