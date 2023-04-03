import React, { useEffect, useState } from "react"
import { IconButton } from "../../ui/index";

export interface IPanel {
  side: "top" | "left" | "right" | "bottom",
  setSide: (side: "top" | "left" | "right" | "bottom") => void
}

const Panel: React.FC<IPanel> = ({ side, setSide }) => {
  return <div style={ {
    ...side === "top" || side === "bottom"
       ? {
          flexDirection: "row",
          width: "100%"
        }
       : {
          flexDirection: "column",
          height: "100%"
        },
    ...side === "left" && { borderRight: "var(--application-panel-border)" },
    ...side === "right" && { borderLeft: "var(--application-panel-border)" },
    ...side === "top" && { borderBottom: "var(--application-panel-border)" },
    ...side === "bottom" && { borderTop: "var(--application-panel-border)" }
  } } className={ `bg-[rgb(var(--container-bg))] flex p-2 gap-1` }>
    <PanelInstanceIcon/>
    <IconButton onClick={ () => {
      setSide( "left" )
    } } icon="arrow-left-16"/>
    <IconButton onClick={ () => {
      setSide( "right" )
    } } icon="arrow-right-16"/>
    <IconButton onClick={ () => {
      setSide( "top" )
    } } icon="arrow-up-16"/>
    <IconButton onClick={ () => {
      setSide( "bottom" )
    } } icon="arrow-down-16"/>
  </div>
}

export default Panel

const PanelInstanceIcon: React.FC = () => {
  const [ instanceUrl, setInstanceUrl ] = useState<string | null>( null )
  
  useEffect( () => {
    setInstanceUrl( localStorage.getItem( "current_server" ) )
  }, [] )
  
  if (!instanceUrl) return <div></div>
  
  return <img src={ `${ instanceUrl }/panel/logo/small` } alt={ `` }/>
}
