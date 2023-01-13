import React, { useContext, useState } from 'react';
import styles from './RightClickMenu.module.scss';
import RightClickMenuContext from './RightClickMenuContext';
import RightClickMenuItem from './RightClickMenuItem';

export interface IRightClickMenu extends React.ComponentPropsWithoutRef<"section"> {
  items: RightClickMenuItem[]
}

const RightClickMenu: React.FC<IRightClickMenu> = ({
  items, children
}) => {
  const RootContainerContext = useContext(RightClickMenuContext)

  return <section onContextMenu={(e) => {
    e.stopPropagation()
    e.preventDefault()
    RootContainerContext(
      e.pageX,
      e.pageY,
      true,
      items
    )

    let listener = (e: MouseEvent) => {
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
  }}>
    {children}
  </section>
};

export default RightClickMenu;
