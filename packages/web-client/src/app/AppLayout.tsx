/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import { Button, Card, Heading, Spinner } from "../ui/index";
import PanelLayout from "./panel/PanelLayout";
import React, { memo, useEffect } from "react";
import csi from "../helpers/csi";
import styles from "./AppLayout.module.scss"

const AppLayout: React.FC = () => {
  const navigate = useNavigate()

  const [ loaded, setLoaded ] = React.useState<boolean>( false );
  const [ didTakeTooLong, setDidTakeTooLong ] = React.useState<boolean>( false );
  const isStandalone = new URLSearchParams( window.location.search ).has( "standalone" )

  useEffect( () => {
    const timer = setTimeout( () => {
      setDidTakeTooLong( true )
    }, 5_000 /* 5 secconds */ )

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
      <Spinner />
      <Card
        className={"flex items-center justify-center"}
        showBorder
      >
        <h1 className={"text-5xl font-bold pl-4 pr-4"}>Loading YourDash</h1>
      </Card>
      <Card
        className={"fixed bottom-4 text-center animate__animated animate__fadeInUp"}
        showBorder
      >
        <div className={"pl-2 pr-2"}>
          {
            didTakeTooLong
              ? <div className={"flex gap-2 flex-col -ml-2 -mr-2 items-center justify-center"}>
                <div className={"flex items-center justify-center"}>
                  <Heading level={3}>Your instance took too long to load</Heading>
                </div>
                <div className={"flex gap-2"}>
                  <Button
                    onClick={() => {
                      window.location.reload()
                    }}
                  >
                  Retry
                  </Button>
                  <Button
                    onClick={() => {
                      localStorage.clear()
                      navigate( "/login" )
                    }}
                  >
                  Change Instance
                  </Button>
                </div>
              </div>
              : <>
                This should not take longer than 5 seconds
              </>
          }
        </div>
      </Card>
    </div>

  // Standalone mode displays only the application and not the Panel
  if ( isStandalone ) {
    if ( JSON.parse( localStorage.getItem( "installed_applications" )?.toString() || "[]" ).contains( "" ) )

      return <div className={styles.applicationFrame}>
        <Outlet />
      </div>;
  }

  return <PanelLayout />
}

export default memo( AppLayout )
