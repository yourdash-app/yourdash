/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useContext } from "react"
import RightClickMenuContext from "./RightClickMenuContext"
import RightClickMenuItem from "./RightClickMenuItem"

export interface IRightClickMenu extends React.ComponentPropsWithoutRef<"section"> {
  items: RightClickMenuItem[]
}

const RightClickMenu: React.FC<IRightClickMenu> = ( {
  items, children, ...extraProps
} ) => {
  const rootContainerContext = useContext( RightClickMenuContext )

  return (
    <section
      { ...extraProps }
      onContextMenu={ e => {
        e.stopPropagation()
        e.preventDefault()

        const clientRect = e.currentTarget.getBoundingClientRect()

        rootContainerContext(
          e.pageX,
          e.pageY,
          clientRect.width,
          clientRect.height,
          true,
          items
        )

        const listener = ( ev: MouseEvent ) => {
          ev.preventDefault()

          rootContainerContext(
            0,
            0,
            clientRect.width,
            clientRect.height,
            false,
            []
          )

          window.removeEventListener( "click", listener )
          window.removeEventListener( "contextmenu", listener )
        }

        window.addEventListener( "click", listener )
        window.addEventListener( "contextmenu", listener )
      } }
    >
      {children}
    </section>
  )
}

export default RightClickMenu
