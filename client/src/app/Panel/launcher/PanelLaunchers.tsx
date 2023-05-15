import React, { useState } from "react"
import clippy from "../../../helpers/clippy"
import { IconButton } from "../../../ui"
import { PanelPosition } from "../Panel"
import PanelApplicationLauncherPopOut from "./popout/PanelPopoutLauncher"
import PanelApplicationLauncherSlideOut from "./slideout/PanelSlideoutLauncher"

const PanelApplicationLauncher: React.FC<{
    side: PanelPosition;
    type: number;
}> = ( { side, type } ) => {
  const [isVisible, setIsVisible] = useState<boolean>( false )
  return (
    <div
      className={
        clippy(
          side === PanelPosition.left || side === PanelPosition.right
            ? "w-full mb-1"
            : "h-full mr-1",
          "z-50",
          type !== 1 && "relative"
        )
      }
    >
      <IconButton
        icon={ "app-launcher-16" }
        className={ "p-0.5" }
        onClick={ () => {
          return setIsVisible( !isVisible )
        } }
      />
      {
        type === 1
          ? (
            <PanelApplicationLauncherSlideOut
              side={ side }
              visible={ isVisible }
              setVisible={ val => {
                return setIsVisible( val )
              } }
            />
          )
          : (
            <PanelApplicationLauncherPopOut
              side={ side }
              visible={ isVisible }
              setVisible={ val => {
                return setIsVisible( val )
              } }
            />
          )
      }
    </div>
  )
}

export default PanelApplicationLauncher
