import React, { useContext, useState } from "react"
import RightClickMenuContext from "../rightClickMenu/RightClickMenuContext"
import Button from "../button/Button"

export interface IDropdownButton {
    children: string;
    items: {
        name: string;
        onClick: () => void;
    }[];
    className?: string;
}

const DropdownButton: React.FC<IDropdownButton> = ( { children, items, className } ) => {
  const RootContainerContext = useContext( RightClickMenuContext )

  const [selectedOption, setSelectedOption] = useState( "" )
  const [dropdownShown, setDropdownShown] = useState( false )

  return (
    <Button
      className={ className }
      onClick={ e => {
        e.stopPropagation()
        e.preventDefault()

        const clientRect = e.currentTarget.getBoundingClientRect()

        if ( dropdownShown ) {
          RootContainerContext( 0, 0, clientRect.width, clientRect.height, false, [] )

          setDropdownShown( false )
          return
        }

        RootContainerContext(
          clientRect.left,
          clientRect.bottom,
          clientRect.width,
          clientRect.height,
          true,
          items.map( item => {
            return {
              name: item.name,
              onClick: () => {
                setSelectedOption( item.name )
                item.onClick()
              },
              shortcut: ""
            }
          } )
        )

        setDropdownShown( true )

        const listener = ( ev: MouseEvent ) => {
          ev.preventDefault()

          RootContainerContext( 0, 0, clientRect.width, clientRect.height, false, [] )

          setDropdownShown( false )

          window.removeEventListener( "click", listener )
          window.removeEventListener( "contextmenu", listener )
        }

        window.addEventListener( "click", listener )
        window.addEventListener( "contextmenu", listener )
      } }
    >
      {selectedOption || children}
    </Button>
  )
}

export default DropdownButton
