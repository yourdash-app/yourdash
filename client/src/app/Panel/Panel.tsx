import React, { useEffect, useRef, useState } from "react"
import { useBeforeUnload } from "react-router-dom"
import clippy from "../../helpers/clippy"
import getJson, { deleteJson, postJson } from "../../helpers/fetch"
import { Icon, IconButton, RightClickMenu, Row, TextInput } from "../../ui"

export enum PanelPosition {
  left,
  top,
  right,
  bottom,
}

export interface IPanel {
  side: PanelPosition;
  setSide: ( side: PanelPosition ) => void;
}

interface PanelQuickShortcut {
  displayName: string;
  url: string;
  icon: string;
}

const PanelQuickShortcuts: React.FC<{ num: number; side: PanelPosition }> = ( {
  num,
  side
} ) => {
  const [quickShortcuts, setQuickShortcuts] = useState<PanelQuickShortcut[]>(
    []
  )

  useEffect( () => {
    getJson( "/panel/quick-shortcuts", resp => setQuickShortcuts( resp ) )
  }, [num] )

  return (
    <>
      { quickShortcuts.map( ( shortcut, ind ) => (
        <RightClickMenu
          key={ shortcut.url }
          items={ [
            {
              name: "Unpin from panel",
              onClick() {
                deleteJson( `/panel/quick-shortcut/${ ind }`, () => {
                  // @ts-ignore
                  Panel.reload() // eslint-disable-line no-use-before-define
                } )
              }
            }
          ] }
        >
          <button
            type={ "button" }
            className={ "w-full aspect-square relative group flex items-center " +
                        "justify-center mr-1 cursor-pointer outline-0" }
            onClick={ e => {
              e.currentTarget.blur()
              window.location.href = shortcut.url
            } }
          >
            <img
              src={ shortcut.icon }
              alt=""
              className={ "w-[2rem] group-hover:scale-110 group-focus-within:scale-110 " +
                          "group-active:scale-95 transition-[var(--transition)]" }
            />
            <span
              className={ clippy(
                "absolute z-50 pl-2 pr-2 pt-0.5 pb-0.5 bg-container-bg rounded-lg" +
                " pointer-events-none group-hover:opacity-100 opacity-0" +
                " group-hover:[transition:var(--transition-fast)] shadow-lg" +
                " [transition:var(--transition)]",
                side === PanelPosition.left &&
                "ml-4 left-full top-1/2 -translate-y-1/2",
                side === PanelPosition.top &&
                "mt-4 top-full left-1/2 -translate-x-1/2",
                side === PanelPosition.right &&
                "mr-4 right-full top-1/2 -translate-y-1/2",
                side === PanelPosition.bottom &&
                "mb-4 bottom-full left-1/2 -translate-x-1/2"
              ) }
            >
              { shortcut.displayName }
            </span>
          </button>
        </RightClickMenu>
      ) ) }
    </>
  )
}

const PanelInstanceIcon: React.FC = () => {
  const [instanceUrl, setInstanceUrl] = useState<string | null>( null )

  useEffect( () => {
    setInstanceUrl( localStorage.getItem( "current_server" ) )
  }, [] )

  if ( !instanceUrl ) {
    return <div/>
  }

  return (
    <button
      type={ "button" }
      className={ "border-none" }
      onClick={ () => ( window.location.href = "#/app/a/dash" ) }
    >
      <img
        src={ `${ instanceUrl }/panel/logo/small` }
        alt={ "" }
        className={ "cursor-pointer select-none mt-1" }
      />
    </button>
  )
}

const PanelAuthorizer: React.FC = () => {
  useEffect( () => {
    if ( !localStorage.getItem( "current_server" ) ) {
      setTimeout( () => {
        console.clear()
      }, 1000 )
      window.location.href = "#/login"
    } else {
      getJson(
        "/login/is-authenticated",
        () => null,
        () => {
          setTimeout( () => {
            console.clear()
          }, 1000 )
          sessionStorage.removeItem( "session_token" )
          window.location.href = "#/login"
        }
      )
    }
  }, [] )

  return null
}

const PanelApplicationLauncherSlideOut: React.FC<{
  side: PanelPosition;
  visible: boolean;
  setVisible: ( value: boolean ) => void;
}> = ( { side, visible } ) => {
  const [userFullName, setUserFullName] = useState<{
    first: string;
    last: string;
  }>( { first: "", last: "" } )

  useEffect( () => {
    getJson( "/panel/user/name", res => {
      setUserFullName( res )
    } )
  }, [] )

  return (
    <section
      className={ clippy(
        side === PanelPosition.left
          ? "left-full top-0 animate__fadeIn"
          : side === PanelPosition.right
            ? "right-full top-0 animate__fadeIn"
            : side === PanelPosition.top
              ? "top-full left-0 animate__fadeIn"
              : /* must be bottom*/ "bottom-full left-0 animate__fadeIn",
        visible ? "flex" : "hidden",
        "absolute w-96 bg-container-bg h-screen animate__animated z-0"
      ) }
      style={ {
        ...( side === PanelPosition.left && {
          borderRight: "0.1rem solid var(--application-panel-border)"
        } ),
        ...( side === PanelPosition.right && {
          borderRight: "0.1rem solid var(--application-panel-border)"
        } ),
        ...( side === PanelPosition.top && {
          borderRight: "0.1rem solid var(--application-panel-border)"
        } ),
        ...( side === PanelPosition.bottom && {
          borderRight: "0.1rem solid var(--application-panel-border)"
        } )
      } }
    >
      <header
        style={ {
          // FIXME: this will only work during development, this needs urgently changing
          backgroundImage: "url(\"http://localhost:3560/login/background\")"
        } }
        className={ "h-32 flex items-center justify-center w-full bg-cover bg-center" }
      >
        <span
          className={ clippy(
            "text-container-fg" +
            "text-4xl" +
            "font-bold" +
            "[filter:_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))_drop-shadow(0_" +
            "10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))" +
            "_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))]" +
            "backdrop-blur-sm" +
            "bg-container-bg" +
            "bg-opacity-50" +
            "pl-4" +
            "pr-4" +
            "pt-2" +
            "pb-2" +
            "rounded-2xl" +
            "overflow-hidden"
          ) }
        >
          Hiya, { userFullName.first }
        </span>
      </header>
    </section>
  )
}

export interface YourDashLauncherApplication {
  name: string;
  displayName: string;
  icon: string;
  description: string;
}

const PanelApplicationLauncherPopOutDateAndTime: React.FC = () => {
  const [date, setDate] = useState( new Date() )

  const interval = useRef<NodeJS.Timer | null>( null )

  useEffect( () => {
    interval.current = setInterval( () => {
      setDate( new Date() )
    }, 60000 )
  }, [] )

  useBeforeUnload( () => {
    if ( interval.current ) {
      clearInterval( interval.current )
    }
  } )

  return <span className={ "pl-1" }>{ date.toDateString() }</span>
}

const PanelApplicationLauncherPopOut: React.FC<{
  side: PanelPosition;
  visible: boolean;
  setVisible: ( value: boolean ) => void;
}> = ( { side, visible, setVisible } ) => {
  const [userFullName, setUserFullName] = useState<{
    first: string;
    last: string;
  }>( { first: "", last: "" } )

  const [applications, setApplications] = useState<
    YourDashLauncherApplication[]
  >( [] )
  const [searchValue, setSearchValue] = useState<string>( "" )

  useEffect( () => {
    getJson( "/panel/user/name", res => {
      setUserFullName( res )
    } )

    getJson( "/panel/launcher/applications", res => {
      setApplications( res )
    } )
  }, [] )

  return (
    <>
      <div
        className={ clippy(
          side === PanelPosition.left
            ? "left-full top-2 ml-3.5"
            : side === PanelPosition.right
              ? "right-full top-2 mr-3.5"
              : side === PanelPosition.top
                ? "top-full left-2 mt-3.5"
                : /* must be bottom*/ "bottom-full left-2 mb-3.5",
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
          side === PanelPosition.top &&
          ( visible
            ? "animate__fadeIn"
            : "animate__fadeOut select-none pointer-events-none" ),
          side === PanelPosition.bottom &&
          ( visible
            ? "animate__fadeIn"
            : "animate__fadeOut select-none pointer-events-none" ),
          side === PanelPosition.left &&
          ( visible
            ? "animate__fadeIn"
            : "animate__fadeOut select-none pointer-events-none" ),
          side === PanelPosition.right &&
          ( visible
            ? "animate__fadeIn"
            : "animate__fadeOut select-none pointer-events-none" )
        ) }
      />
      <section
        className={ clippy(
          side === PanelPosition.left
            ? "left-full top-0 ml-4"
            : side === PanelPosition.right
              ? "right-full top-0 mr-4"
              : side === PanelPosition.top
                ? "top-full left-0 mt-4"
                : /* must be bottom*/ "bottom-full left-0 mb-4",
          `
        absolute
        bg-[rgb(var(--container-bg))]
        w-[36rem]
        max-h-[60rem]
        p-2
        rounded-xl
        [border:solid_0.1rem_var(--application-panel-border)]
        animate__animated
        animate__faster
        opacity-0
        flex
        flex-col
        gap-2
        `,
          side === PanelPosition.top &&
          ( visible
            ? "animate__fadeIn"
            : "animate__fadeOut select-none pointer-events-none" ),
          side === PanelPosition.bottom &&
          ( visible
            ? "animate__fadeIn"
            : "animate__fadeOut select-none pointer-events-none" ),
          side === PanelPosition.left &&
          ( visible
            ? "animate__fadeIn"
            : "animate__fadeOut select-none pointer-events-none" ),
          side === PanelPosition.right &&
          ( visible
            ? "animate__fadeIn"
            : "animate__fadeOut select-none pointer-events-none" )
        ) }
      >
        <section className={ "flex items-center justify-center relative group" }>
          <span className={ "text-2xl mr-auto" }>Hiya, { userFullName.first }</span>
          <TextInput
            className={ "w-[2.25rem] h-[2.25rem] focus-within:w-64 transition-all" }
            onChange={ val => {
              setSearchValue( val )
            } }
          />
          <div
            className={ "absolute right-0 top-0 h-[2.25rem] w-[2.25rem] p-[0.35rem] group-focus-within:opacity-0 " +
                        "pointer-events-none transition-all [border:0.125rem_solid_#00000000]" }
          >
            <Icon name={ "search-16" } color={ "rgb(var(--container-fg))" }/>
          </div>
        </section>
        <section
          className={ clippy(
            `
            grid
            grid-cols-4
            gap-2
            child:rounded-xl
            child:bg-button-bg
            child-hover:bg-button-hover-bg
            child-active:bg-button-active-bg
            child:text-button-fg
            child-hover:text-button-hover-fg
            child-active:text-button-active-fg
            child:border-button-border
            child-hover:border-button-hover-border
            child-active:border-button-active-border
            child:border-2
            child:flex
            child:items-center
            child:justify-center
            child:flex-col
            child:p-2
            child:cursor-pointer
            child:select-none
            child:transition-[var(--transition)]
            child-active:transition-[var(--transition)]
            child-hover:transition-[var(--transition-fast)]
          `
          ) }
        >
          { applications.length !== 0
            ? (
              applications.map( app => {
                if ( searchValue !== "" ) {
                  if (
                    !app.description.includes( searchValue ) &&
                  !app.name.includes( searchValue )
                  ) {
                    return <React.Fragment key={ app.name }/>
                  }
                }

                return (
                  <RightClickMenu
                    key={ app.name }
                    items={ [
                      {
                        name: "Pin to Panel",
                        onClick() {
                          postJson(
                            "/panel/quick-shortcuts/create",
                            {
                              displayName: app.displayName,
                              name: app.name
                            },
                            () => {
                              // @ts-ignore
                              // eslint-disable-next-line no-use-before-define
                              Panel.reload()
                            }
                          )
                        },
                        shortcut: "ctrl+p"
                      }
                    ] }
                  >
                    <button
                      type={ "button" }
                      key={ app.name }
                      onClick={ () => {
                        setVisible( false )
                        window.location.href = `#/app/a/${ app.name }`
                      } }
                    >
                      <img src={ app.icon } alt={ "" } className={ "p-2" }/>
                      <span>{ app.displayName }</span>
                    </button>
                  </RightClickMenu>
                )
              } )
            )
            : (
              <div
                className={ "col-span-4 bg-container-bg h-24 flex items-center justify-center" }
              >
                <span className={ "!text-container-fg !border-none" }>
                  You have no applications?
                </span>
              </div>
            ) }
        </section>
        <section className={ "flex items-center justify-center" }>
          <PanelApplicationLauncherPopOutDateAndTime/>
          <Row className={ "ml-auto" }>
            <IconButton
              icon={ "person-16" }
              onClick={ () => {
                setVisible( false )
                window.location.href = "#/app/a/profile"
              } }
            />
            <IconButton
              icon={ "gear-16" }
              onClick={ () => {
                setVisible( false )
                window.location.href = "#/app/a/settings"
              } }
            />
            <IconButton
              icon={ "logout" }
              onClick={ () => {
                setVisible( false )
                sessionStorage.removeItem( "session_token" )
                localStorage.removeItem( "username" )
                window.location.href = "#/"
              } }
            />
          </Row>
        </section>
      </section>
    </>
  )
}

const PanelApplicationLauncher: React.FC<{
  side: PanelPosition;
  type: number;
}> = ( { side, type } ) => {
  const [isVisible, setIsVisible] = useState<boolean>( false )
  return (
    <div
      className={ clippy(
        side === PanelPosition.left || side === PanelPosition.right
          ? "w-full"
          : "h-full",
        "z-50",
        type !== 1 && "relative"
      ) }
    >
      <IconButton
        icon={ "three-bars-16" }
        onClick={ () => setIsVisible( !isVisible ) }
      />
      { type === 1
        ? (
          <PanelApplicationLauncherSlideOut
            side={ side }
            visible={ isVisible }
            setVisible={ val => setIsVisible( val ) }
          />
        )
        : (
          <PanelApplicationLauncherPopOut
            side={ side }
            visible={ isVisible }
            setVisible={ val => setIsVisible( val ) }
          />
        ) }
    </div>
  )
}

const Panel: React.FC<IPanel> = ( { side, setSide } ) => {
  const [num, setNum] = useState<number>( 0 )
  const [launcherType, setLauncherType] = useState<number>( 0 )

  //  @ts-ignore
  Panel.reload = () => {
    setNum( num + 1 )
  }

  useEffect( () => {
    getJson( "/panel/position", res => {
      setSide( res.position )
    } )

    getJson( "/panel/launcher", res => {
      setLauncherType( res.launcher )
    } )
  }, [num] ) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      style={ {
        ...( side === PanelPosition.top || side === PanelPosition.bottom
          ? {
            flexDirection: "row",
            width: "100%"
          }
          : {
            flexDirection: "column",
            height: "100%"
          } ),
        ...( side === PanelPosition.left && {
          borderRight: "0.1rem solid var(--application-panel-border)"
        } ),
        ...( side === PanelPosition.right && {
          borderLeft: "1",
          gridRowEnd: -1,
          gridColumnStart: 2
        } ),
        ...( side === PanelPosition.top && {
          borderBottom: "0.1rem solid var(--application-panel-border)"
        } ),
        ...( side === PanelPosition.bottom && {
          borderTop: "0.1rem solid var(--application-panel-border)",
          gridColumnEnd: -1,
          gridRowStart: 2
        } )
      } }
      className={ "bg-container-bg flex p-2 gap-1 relative justify-center items-center z-10" }
    >
      {/* invisible component which checks that the user is authorized on the first load of the panel*/ }
      <PanelAuthorizer/>
      <PanelApplicationLauncher side={ side } type={ launcherType }/>
      <PanelInstanceIcon/>
      {/* separator */ }
      <div
        className={ clippy(
          `
          rounded-full
          bg-[var(--application-panel-border)]
          `,
          side === PanelPosition.top || side === PanelPosition.bottom
            ? "h-full w-0.5 ml-1 mr-1"
            : "w-full h-0.5 mt-1 mb-1"
        ) }
      />
      <PanelQuickShortcuts num={ num } side={ side }/>
      <section
        className={ clippy(
          side === PanelPosition.left || side === PanelPosition.right
            ? "mt-auto w-full"
            : "ml-auto h-full",
          "justify-center items-center flex flex-col"
        ) }
      >
        {/*
         
         TODO: feature idea, Quick search ( basically just opens a command panel for all of yourdash )
         Note: remember include application filtering
         
         */ }
        <IconButton icon={ "search-16" }/>
      </section>
    </div>
  )
}

export default Panel
