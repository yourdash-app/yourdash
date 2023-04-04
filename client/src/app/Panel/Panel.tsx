import React, { useEffect, useState } from "react"
import { IconButton } from "../../ui/index";
import getJson from "../../helpers/fetch";
import clsx from "clsx";

export interface IPanel {
  side: "top" | "left" | "right" | "bottom",
  setSide: ( side: "top" | "left" | "right" | "bottom" ) => void
}

const Panel: React.FC<IPanel> = ( { side, setSide } ) => {
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
    ...side === "right" && { borderLeft: "var(--application-panel-border)", gridRowEnd: -1, gridColumnStart: 2 },
    ...side === "top" && { borderBottom: "var(--application-panel-border)" },
    ...side === "bottom" && { borderTop: "var(--application-panel-border)", gridColumnEnd: -1, gridRowStart: 2 }
  } } className={ `bg-[rgb(var(--container-bg))] flex p-2 gap-1 relative` }>
    {/* invisible component which checks that the user is authorized on the first load of the panel*/ }
    <PanelAuthorizer/>
    <PanelInstanceIcon/>
    <PanelApplicationLauncher side={ side } type={ "popOut" }/>
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
    <section className={ `${ ( side === "left" || side === "right" )
        ? "mt-auto w-full"
        : "ml-auto h-full" }` }>
      <IconButton icon={ "gear-16" }/>
    </section>
  </div>
}

export default Panel

const PanelInstanceIcon: React.FC = () => {
  const [ instanceUrl, setInstanceUrl ] = useState<string | null>( null )
  
  useEffect( () => {
    setInstanceUrl( localStorage.getItem( "current_server" ) )
  }, [] )
  
  if ( !instanceUrl ) return <div></div>
  
  return <img src={ `${ instanceUrl }/panel/logo/small` } alt={ `` }/>
}

const PanelAuthorizer: React.FC = () => {
  useEffect( () => {
    getJson( `/`, ( res => {
      if ( !res ) window.location.href = "#/login"
    } ) )
  }, [] )
  
  return <></>
}

const PanelApplicationLauncher: React.FC<{
  side: "left" | "top" | "right" | "bottom",
  type: "slideOut" | "popOut"
}> = ( { side, type } ) => {
  const [ isVisible, setIsVisible ] = useState<boolean>( false )
  return <div
      className={ clsx(
          ( side === "left" || side === "right" )
              ? "w-full"
              : "h-full",
          `relative`
      ) }>
    <IconButton icon={ "three-bars-16" } onClick={ () => setIsVisible( !isVisible ) }/>
    {
      type === "slideOut"
          ? <PanelApplicationLauncherSlideOut side={ side } visible={ isVisible }/>
          : <PanelApplicationLauncherPopOut side={ side } visible={ isVisible }/>
    }
  </div>
}

const PanelApplicationLauncherSlideOut: React.FC<{
  side: "left" | "top" | "right" | "bottom",
  visible: boolean
}> = ( { side, visible } ) => {
  const [ userFullName, setUserFullName ] = useState<{ first: string, last: string }>( { first: "", last: "" } )
  
  useEffect( () => {
    getJson( `/panel/username`, ( res ) => { setUserFullName( res ) } )
  }, [] )
  
  return <section className={ clsx(
      side === "left"
          ? "left-full top-0 ml-2"
          : side === "right"
              ? "right-full top-0 mr-2"
              : side === "top"
                  ? "top-full left-0 mt-2"
                  : /* must be bottom*/ "bottom-full left-0 mb-2",
      visible
          ? "flex"
          : "hidden", `absolute bg-red-400 w-96`
  ) }>
    <h1>Launcher SlideOut</h1>
  </section>
}

const PanelApplicationLauncherPopOut: React.FC<{
  side: "left" | "top" | "right" | "bottom",
  visible: boolean
}> = ( { side, visible } ) => {
  const [ userFullName, setUserFullName ] = useState<{ first: string, last: string }>( { first: "", last: "" } )
  
  useEffect( () => {
    getJson( `/panel/user/name`, ( res ) => { setUserFullName( res ) } )
  }, [] )
  
  return <section className={ clsx(
      side === "left"
          ? "left-full top-0 ml-4"
          : side === "right"
              ? "right-full top-0 mr-4"
              : side === "top"
                  ? "top-full left-0 mt-4"
                  : /* must be bottom*/ "bottom-full left-0 mb-4",
      `absolute bg-[rgb(var(--container-bg))] w-96 p-2 rounded-xl [border:var(--application-panel-border)] animate__animated flex`,
      side === "top" && ( visible ? "animate__backInDown animate__faster" : "animate__backOutUp animate__fast" ),
      side === "bottom" && ( visible ? "animate__backInUp animate__faster" : "animate__backOutDown animate__fast" ),
      side === "left" && ( visible ? "animate__backInLeft animate__faster" : "animate__backOutLeft animate__fast" ),
      side === "right" && ( visible ? "animate__backInRight animate__faster" : "animate__backOutRight animate__fast" )
  ) }>
    <span>Hiya, { userFullName.first }</span>
  </section>
}
