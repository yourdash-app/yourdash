/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Outlet } from "react-router";
import { Card, Spinner } from "../ui/index";
import PanelLayout from "./panel/PanelLayout";
import React, { memo, useEffect } from "react";
import csi from "../helpers/csi";
import styles from "./AppLayout.module.scss"

const AppLayout: React.FC = () => {
  const [ loaded, setLoaded ] = React.useState<boolean>( false );
  const isStandalone = new URLSearchParams( window.location.search ).has( "standalone" )

  useEffect( () => {
    const timer = setTimeout( () => {
      window.location.reload()
    }, 5000 )

    csi.getUserDB().then( () => {
      setLoaded( true );
      clearTimeout( timer )
    } )

    return () => {
      clearTimeout( timer )
    }
  }, [] );

  if ( !loaded )
    return <div className={"w-full h-full flex items-center justify-center flex-col gap-4"}>
      <Spinner/>
      <Card
        className={"flex items-center justify-center"}
        showBorder
      >
        <h1 className={"text-5xl font-bold pl-4 pr-4"}>Loading YourDash</h1>
      </Card>
      <Card
        className={"fixed bottom-4 text-center animate__animated animate__fadeInUp p-2 pl-4 pr-4"}
        showBorder
      >
        This should not take longer than 10 seconds
      </Card>
    </div>

  // Standalone mode displays only the application and not the Panel
  if ( isStandalone ) {
    return <div className={styles.applicationFrame}>
      <Outlet />
    </div>;
  }

  return <PanelLayout />
}

export default memo( AppLayout )
