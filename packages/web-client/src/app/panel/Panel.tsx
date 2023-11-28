/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import styles from "./Panel.module.scss"
import clippy from "../../helpers/clippy";
import React, { useEffect, useState } from "react";
import loadable from "@loadable/component";
import { YourDashIcon, IconButton } from "../../ui/index";
import csi from "../../helpers/csi";
import panelLayout from "./PanelLayout";

const Panel: React.FC<{ side: "top" | "right" | "bottom" | "left", setLayoutReloadNumber: ( num: number ) => void }> = ( { side, setLayoutReloadNumber } ) => {
  const [widgets, setWidgets] = useState<string[]>( ["InstanceLogo", "ApplicationLauncher", "Separator", "QuickShortcuts"] )
  const [panelSize, setPanelSize] = useState<"small" | "medium" | "large" | undefined>( undefined )
  const [num, setNum] = useState<number>( 0 )

  useEffect( () => {
    setPanelSize( csi.userDB.get( "core:panel:size" ) || "medium" )
  }, [num] );

  // @ts-ignore
  window.__yourdashCorePanelReload = () => {
    setNum( num + 1 )
    setLayoutReloadNumber( num + 1 )
  }

  if ( panelSize === undefined ) {
    return <></>
  }

  return <section className={clippy(
    styles.panel,
    side === "top" && styles.top + " animate__fadeInDown",
    side === "right" && styles.right + " animate__fadeInRight",
    side === "bottom" && styles.bottom + " animate__fadeInUp",
    side === "left" && styles.left + " animate__fadeInLeft",
    panelSize === "small" && styles.small,
    panelSize === "medium" && styles.medium,
    panelSize === "large" && styles.large,
    "animate__animated"
  )}>
    {
      widgets.map( widget => {
        const LoadableWidget = loadable( () => import( `./widgets/${widget}/Widget` ) )

        return <LoadableWidget key={widget} side={side} />
      } )
    }
  </section>
}

export default Panel
