/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import clippy from "../../../helpers/clippy";
import { Icon, IconButton } from "../../index";
import { YourDashIcon } from "../icon/iconDictionary";
import styles from "./SideBar.module.scss"

export enum SideBarState {
  NormalExpanded,
  NormalMinimised,
  FloatingToggleMinimised,
  FloatingToggleExpanded,
  FloatingExpanded,
  FloatingMinimised
}

export enum SideBarItemType {
  Button,
  Separator
}

export interface ISideBar {
  title: string,
  items: { label: string, icon: YourDashIcon, onClick: () => void, type: SideBarItemType }[],
  defaultState: SideBarState
}

const SideBar: React.FC<ISideBar> = ( { title, items, defaultState } ) => {
  const [state, setState] = React.useState( defaultState );
  
  switch ( state ) {
  case SideBarState.NormalExpanded:
  case SideBarState.NormalMinimised:
    return <div className={clippy( styles.normal, state === SideBarState.NormalMinimised ? styles.normalMinimised : styles.normalExpanded )}>
      <section className={styles.header}>
        <IconButton
          className={styles.toggleButton}
          icon={YourDashIcon.ThreeBars}
          onClick={() => {
            switch( state ) {
            case SideBarState.NormalExpanded:
              setState( SideBarState.NormalMinimised );
              break;
            case SideBarState.NormalMinimised:
              setState( SideBarState.NormalExpanded );
              break;
            default:
              console.log( "this is unreachable (if you see this, please open an issue)" )
              break;
            }
          } }
        />
        <span className={clippy( styles.title, "animate__animated animate__fadeInRight animate__500ms" )}>{title}</span>
      </section>
      <div className={styles.separator}/>
      <section className={styles.itemsContainer}>
        {
          items.map( i => {
            switch ( i.type ) {
            case SideBarItemType.Button:
              return <button
                className={styles.itemButton}
                key={i.label}
                onClick={i.onClick}
              >
                <Icon
                  icon={i.icon}
                  className={styles.itemIcon}
                />
                {
                  state === SideBarState.NormalExpanded
                    ? <div className={clippy( styles.label, "animate__animated animate__fadeInRight animate__500ms" )}>{i.label}</div>
                    : <div className={clippy( styles.label, "animate__animated animate__fadeIn animate__duration_250ms" )}>{i.label}</div>
                }
              </button>
            case SideBarItemType.Separator:
              return <div key={i.label} className={styles.itemSeparator}/>
            default:
              console.log( "this is unreachable (if you see this, please make sure to type your sidebar items)" )
              break;
            }
          } )
        }
      </section>
    </div>
  case SideBarState.FloatingToggleMinimised:
  case SideBarState.FloatingToggleExpanded:
    return <div className={clippy( styles.normal, state === SideBarState.FloatingToggleMinimised ? styles.floatingToggleMinimised : styles.floatingToggleExpanded )}>
      <section className={styles.header}>
        <IconButton
          className={styles.toggleButton}
          icon={YourDashIcon.ThreeBars}
          onClick={() => {
            switch( state ) {
            case SideBarState.FloatingToggleExpanded:
              setState( SideBarState.FloatingToggleMinimised );
              break;
            case SideBarState.FloatingToggleMinimised:
              setState( SideBarState.FloatingToggleExpanded );
              break;
            default:
              console.log( "this is unreachable (if you see this, please open an issue)" )
              break;
            }
          } }
        />
        <span className={clippy( styles.title, "animate__animated animate__fadeInRight animate__500ms animate__duration_250ms" )}>{title}</span>
      </section>
      <div className={styles.separator}/>
      <section className={styles.itemsContainer}>
        {
          items.map( i => {
            switch ( i.type ) {
            case SideBarItemType.Button:
              return <button
                className={styles.itemButton}
                key={i.label}
                onClick={i.onClick}
              >
                <Icon
                  icon={i.icon}
                  className={styles.itemIcon}
                />
                {
                  state === SideBarState.FloatingToggleExpanded
                    ? <div className={clippy( styles.label, "animate__animated animate__fadeInRight animate__500ms" )}>{i.label}</div>
                    : <div className={clippy( styles.label, "animate__animated animate__fadeIn animate__duration_250ms" )}>{i.label}</div>
                }
              </button>
            case SideBarItemType.Separator:
              return <div key={i.label} className={styles.itemSeparator}/>
            default:
              console.log( "this is unreachable (if you see this, please make sure to type your sidebar items)" )
              break;
            }
          } )
        }
      </section>
    </div>
  case SideBarState.FloatingExpanded:
  case SideBarState.FloatingMinimised:
    return <div className={clippy( styles.normal, state === SideBarState.FloatingMinimised ? styles.floatingToggleMinimised : styles.floatingToggleExpanded )}>
      <section className={styles.header}>
        <IconButton
          className={styles.toggleButton}
          icon={YourDashIcon.ThreeBars}
          onClick={() => {
            switch( state ) {
            case SideBarState.FloatingExpanded:
              setState( SideBarState.FloatingToggleMinimised );
              break;
            case SideBarState.FloatingMinimised:
              setState( SideBarState.FloatingToggleExpanded );
              break;
            default:
              console.log( "this is unreachable (if you see this, please open an issue)" )
              break;
            }
          } }
        />
        <span className={clippy( styles.title, "animate__animated animate__fadeInRight animate__500ms animate__duration_250ms" )}>{title}</span>
      </section>
      <div className={styles.separator}/>
      <section className={styles.itemsContainer}>
        {
          items.map( i => {
            switch ( i.type ) {
            case SideBarItemType.Button:
              return <button
                className={styles.itemButton}
                key={i.label}
                onClick={i.onClick}
              >
                <Icon
                  icon={i.icon}
                  className={styles.itemIcon}
                />
                {
                  state === SideBarState.FloatingExpanded
                    ? <div className={clippy( styles.label, "animate__animated animate__fadeInRight animate__500ms" )}>{i.label}</div>
                    : <div className={clippy( styles.label, "animate__animated animate__fadeIn animate__duration_250ms" )}>{i.label}</div>
                }
              </button>
            case SideBarItemType.Separator:
              return <div key={i.label} className={styles.itemSeparator}/>
            default:
              console.log( "this is unreachable (if you see this, please make sure to type your sidebar items)" )
              break;
            }
          } )
        }
      </section>
    </div>
  default:
    return <div>error</div>
  }
}

export default SideBar;
