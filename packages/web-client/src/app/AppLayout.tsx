import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import clippy from "../helpers/clippy";
import Panel, { PanelPosition } from "./Panel/Panel";
import styles from "./appLayout.module.scss";

const AppLayout: React.FC = () => {
  const [panelLayout, setPanelLayout] = useState<PanelPosition>( PanelPosition.left );
  
  if ( new URLSearchParams( window.location.search ).has( "standalone" ) ) {
    return <Outlet />;
  }
  
  return (
    <div
      className={ clippy(
        styles.layout,
        panelLayout === PanelPosition.left && styles.left,
        panelLayout === PanelPosition.top && styles.top,
        panelLayout === PanelPosition.right && styles.right,
        panelLayout === PanelPosition.bottom && styles.bottom
      ) }
    >
      <Panel
        setSide={ val => setPanelLayout( val ) }
        side={ panelLayout }
      />
      <main className={ styles.content }>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
