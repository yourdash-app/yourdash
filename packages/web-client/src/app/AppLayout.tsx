/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Outlet } from "react-router";
import PanelLayout from "./panel/PanelLayout";
import { memo, useEffect } from "react";
import csi from "../helpers/csi";

const AppLayout: React.FC = () => {
  const isStandalone = new URLSearchParams( window.location.search ).has( "standalone" )
  
  useEffect( () => {
    csi.getUserDB()
  }, [] );
  
  // Standalone mode displays only the application and not the Panel
  if ( isStandalone ) {
    return <Outlet />;
  }
  
  return <PanelLayout />
}

export default memo( AppLayout )