import styles from "../../Panel.module.scss";
import Chiplet from "~/chipletui";
import SERVER, { verifyAndReturnJson } from "../../../../../server";
import ServerImage from "~/pages/app/(components)/serverImage/ServerImage";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { type PanelLauncherApplication, PanelQuickShortcut } from "~/../backend/src/helpers/panel/types";

export interface IPanelLauncherSlideOut {
  visible: boolean;
  setVisibility: (visible: boolean) => void;
  backgroundImage: string;
  fullName: string;
  addQuickShortcut: (shortcut: PanelQuickShortcut) => void;
  userName: string;
}

const PanelLauncherSlideOut: React.FC<IPanelLauncherSlideOut> = ({
                                                                   visible,
                                                                   backgroundImage,
                                                                   fullName,
                                                                   setVisibility,
                                                                   addQuickShortcut,
                                                                   userName,
                                                                 }) => {
  const router = useRouter();
  const [ installedApps, setInstalledApps ] = useState( [] as PanelLauncherApplication[] );
  const [ searchQuery, setSearchQuery ] = useState( "" );

  useEffect( () => {
    verifyAndReturnJson(
        SERVER.get( `/core/panel/launcher/apps` ),
        (res: PanelLauncherApplication[]) => {
          setInstalledApps( res );
        },
        () => {
          console.error( `error fetching the instance's installed apps` );
        }
    );
  }, [] );

  return (
      <>
        <div className={ `${ styles.launcherSlideOut } ${ visible
                                                          ? styles.launcherSlideOutVisible
                                                          : "" }` }>
          <div data-header="true" style={ { backgroundImage } }>
            <div data-title="true">Hiya, { fullName }</div>
            <Chiplet.TextInput
                data-search
                onChange={ (e) => {
                  setSearchQuery( e.currentTarget.value.toLowerCase() );
                } }
                placeholder="Search"
            />
          </div>
          <div className={ styles.launcherGrid }>
            { installedApps
              ? (
                  installedApps.map( (app) => {
                    if (
                        app?.name?.toLowerCase()?.includes( searchQuery ) ||
                        app?.description?.toLowerCase()?.includes( searchQuery )
                    )
                      return (
                          <Chiplet.RightClickMenu
                              items={ [
                                {
                                  name: "Pin to quick shortcuts",
                                  onClick: () => {
                                    verifyAndReturnJson(
                                        SERVER.post( `/core/panel/quick-shortcut/create`, {
                                          body: JSON.stringify( {
                                                                  name: app.name,
                                                                  url: `/app/a/${app.name}`,
                                                                } ),
                                        } ),
                                        (data) => {
                                          addQuickShortcut( data[0] );
                                        },
                                        () => {
                                          console.error(
                                              `unable to create quick shortcut with name: ${ app.name }`
                                          );
                                        }
                                    );
                                  },
                                },
                                {
                                  name: "Open in new tab",
                                  onClick: () => {
                                    window.open( `${ location.origin }/app/${ app.name }` );
                                  },
                                },
                              ] }
                              key={ app.name }
                          >
                            <Chiplet.Card
                                className={ styles.launcherGridItem }
                                onClick={ () => {
                                  if (`/app/a/${app.name}` === router.pathname) return setVisibility( false );
                                  setVisibility( false );
                                  router.push( `/app/a/${app.name}` );
                                } }
                            >
                              <img src={ app.icon } draggable={ false } loading={ "lazy" } alt=""/>
                              <span className={ `${ app.underDevelopment && styles.underDevelopment }` }>
                                                { app.displayName }
                                            </span>
                            </Chiplet.Card>
                          </Chiplet.RightClickMenu>
                      );
                  } )
              )
              : (
                  <Chiplet.Button
                      onClick={ () => {
                        router.reload();
                      } }
                  >
                    Reload Launcher Items
                  </Chiplet.Button>
              ) }
          </div>
          <footer data-footer="true">
            <ServerImage
                onClick={ () => {
                  router.push( `/app/user/profile/${ userName }` );
                } }
                tabIndex={ 0 }
                src={ "/current/user/avatar" }
                alt=""
            />
            <span>
                        { fullName }
                    </span>
            <Chiplet.IconButton
                icon="gear-16"
                color={ "var(--container-fg)" }
                onClick={ () => {
                  setVisibility( false );
                  router.push( "/app/settings" );
                } }
            />
            <Chiplet.IconButton
                icon="logout"
                onClick={ () => {
                  localStorage.removeItem( "sessiontoken" );
                  localStorage.removeItem( "username" );
                  router.push( "/login/" );
                } }
            />
          </footer>
        </div>
        <section>{/*  TODO: add notifications here, they should slide in from the right side  */ }</section>
      </>
  );
};

export default PanelLauncherSlideOut;
