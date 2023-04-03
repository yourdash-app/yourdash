import React, { useState } from "react"
import { Outlet } from "react-router-dom";
import Panel from "./Panel/Panel"

const Layout: React.FC = () => {
  const [ panelLayout, setPanelLayout ] = useState<"left" | "top" | "right" | "bottom">( "left" )
  return <div style={ {
    ...(panelLayout === "left" || panelLayout === "right")
       ? {
          gridTemplateColumns: panelLayout === "left"
                               ? "auto 1fr"
                               : "1fr auto",
        }
       : {
          gridTemplateRows: panelLayout === "top"
                            ? "auto 1fr"
                            : "1fr auto"
        }
  } } className={ `grid h-screen` }>
    {
      (panelLayout === "left" || panelLayout === "top")
      ? <>
        <Panel setSide={ (val) => setPanelLayout( val ) } side={ panelLayout }/>
        <Outlet/>
      </>
      : <>
        <Outlet/>
        <Panel setSide={ (val) => setPanelLayout( val ) } side={ panelLayout }/>
      </>
    }
  </div>
}

export default Layout
