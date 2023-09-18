/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect } from "react"
import { Outlet } from "react-router"
import Panel from "./Panel";
import clippy from "../../helpers/clippy";
import styles from "./PanelLayout.module.scss"
import csi from "../../helpers/csi";

const PanelLayout: React.FC = () => {
  const [panelSide, setPanelSide] = React.useState<"top" | "right" | "bottom" | "left" | undefined>( undefined )
  const [reloadNumber, setReloadNumber] = React.useState<number>( 0 )
  
  useEffect( () => {
    setPanelSide( csi.userDB.get( "core:panel:side" ) || "left" )
  }, [reloadNumber] );
  
  if ( panelSide === undefined ) {
    return <></>
  }
  
  switch ( panelSide ) {
  case "top":
    return <div className={clippy( styles.layout, styles.top )}>
      <Panel side={"top"} setLayoutReloadNumber={( num ) => setReloadNumber( num )}/>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  case "left":
    return <div className={clippy( styles.layout, styles.left )}>
      <Panel side={"left"} setLayoutReloadNumber={( num ) => setReloadNumber( num )}/>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  case "bottom":
    return <div className={clippy( styles.layout, styles.bottom )}>
      <main className={styles.content}>
        <Outlet />
      </main>
      <Panel side={"bottom"} setLayoutReloadNumber={( num ) => setReloadNumber( num )}/>
    </div>
  case "right":
    return <div className={clippy( styles.layout, styles.right )}>
      <main className={styles.content}>
        <Outlet />
      </main>
      <Panel side={"right"} setLayoutReloadNumber={( num ) => setReloadNumber( num )}/>
    </div>
  default:
    return <>An Unexpected Error Occurred</>
  }
}

export default PanelLayout
