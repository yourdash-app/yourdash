import React, { useEffect, useState } from "react"
import clippy from "../../../../helpers/clippy"
import csi from "../../../../helpers/csi"
import { Icon, IconButton, Row, TextInput } from "../../../../ui"
import { PanelPosition, YourDashLauncherApplication } from "../../Panel"
import LauncherGridView from "../sharedComponents/LauncherGridView"
import LauncherDateAndTime from "../sharedComponents/LauncherDateAndTime"
import { useNavigate } from "react-router-dom"

const PanelApplicationLauncherPopOut: React.FC<{
  side: PanelPosition; visible: boolean; setVisible: ( value: boolean ) => void;
}> = ( { side, visible, setVisible } ) => {
  const navigate = useNavigate()
  const [userFullName, setUserFullName] = useState<{
    first: string; last: string;
  }>( { first: "", last: "" } )

  const [applications, setApplications] = useState<YourDashLauncherApplication[]>( [] )
  const [searchValue, setSearchValue] = useState<string>( "" )

  useEffect( () => {
    csi.getJson( "/panel/user/name", res => {
      setUserFullName( res )
    } )

    csi.getJson( "/panel/launcher/applications", res => {
      setApplications( res )
    } )
  }, [] )

  return (
    <>
      <div
        className={ clippy(
          side === PanelPosition.left ? "left-full top-2 ml-3.5" : side === PanelPosition.right ? "right-full top-2 mr-3.5" : side === PanelPosition.top ? "top-full left-2 mt-3.5" : /* must be bottom*/ "bottom-full left-2 mb-3.5",
          `
          h-4
          aspect-square
          bg-container-bg
          [border:solid_0.1rem_var(--application-panel-border)]
          absolute
          rotate-45
          animate__animated
          animate__faster
          opacity-0
        `,
          side === PanelPosition.top && ( visible ? "animate__fadeIn" : "animate__fadeOut select-none pointer-events-none" ),
          side === PanelPosition.bottom && ( visible ? "animate__fadeIn" : "animate__fadeOut select-none pointer-events-none" ),
          side === PanelPosition.left && ( visible ? "animate__fadeIn" : "animate__fadeOut select-none pointer-events-none" ),
          side === PanelPosition.right && ( visible ? "animate__fadeIn" : "animate__fadeOut select-none pointer-events-none" )
        ) }
      />
      <section
        className={ clippy(
          side === PanelPosition.left ? "left-full top-0 ml-4" : side === PanelPosition.right ? "right-full top-0 mr-4" : side === PanelPosition.top ? "top-full left-0 mt-4" : /* must be bottom*/ "bottom-full left-0 mb-4",
          "absolute bg-container-bg min-w-[39rem] max-h-[80rem] rounded-container-rounding [border:solid_0.1rem_var(--application-panel-border)] animate__animated animate__faster opacity-0 flex flex-col gap-2 overflow-hidden",
          side === PanelPosition.top && ( visible ? "animate__fadeIn" : "animate__fadeOut select-none pointer-events-none" ),
          side === PanelPosition.bottom && ( visible ? "animate__fadeIn" : "animate__fadeOut select-none pointer-events-none" ),
          side === PanelPosition.left && ( visible ? "animate__fadeIn" : "animate__fadeOut select-none pointer-events-none" ),
          side === PanelPosition.right && ( visible ? "animate__fadeIn" : "animate__fadeOut select-none pointer-events-none" )
        ) }
      >
        <section className={ "flex items-center justify-center relative group bg-container-secondary-bg p-2 pl-3" }>
          <span className={ "text-2xl mr-auto" }>Hiya, { userFullName.first }</span>
          <TextInput
            className={ "w-[2.25rem] h-[2.25rem] focus-within:w-64 transition-all" }
            onChange={ val => {
              setSearchValue( val )
            } }
          />
          <div
            className={ "absolute right-2 top-2 h-[2.25rem] w-[2.25rem] p-[0.35rem] group-focus-within:opacity-0 pointer-events-none transition-all [border:0.125rem_solid_#00000000]" }
          >
            <Icon name={ "search-16" } color={ "rgb(var(--container-fg))" }/>
          </div>
        </section>
        <LauncherGridView applications={ applications } setVisible={ setVisible } searchValue={ searchValue }/>
        <section className={ "flex items-center justify-center bg-container-secondary-bg p-2 pl-3" }>
          <LauncherDateAndTime/>
          <Row className={ "ml-auto" }>
            <IconButton
              icon={ "person-16" }
              onClick={ () => {
                setVisible( false )
                navigate( "/app/a/profile" )
              } }
            />
            <IconButton
              icon={ "gear-16" }
              onClick={ () => {
                setVisible( false )
                navigate( "/app/a/settings" )
              } }
            />
            <IconButton
              icon={ "logout" }
              onClick={ () => {
                setVisible( false )
                localStorage.removeItem( "session_token" )
                localStorage.removeItem( "username" )
                navigate( "/" )
              } }
            />
          </Row>
        </section>
      </section>
    </>
  )
}

export default PanelApplicationLauncherPopOut
