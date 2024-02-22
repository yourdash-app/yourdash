/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import clippy from "../../../helpers/clippy";
import { Icon, IconButton } from "../../index";
import { YourDashIcon } from "../icon/iconDictionary";
import styles from "./SideBar.module.scss";

export enum SIDEBAR_STATE {
  NormalExpanded,
  NormalMinimised,
  FloatingToggleMinimised,
  FloatingToggleExpanded,
  FloatingExpanded,
  FloatingMinimised,
}

export enum SIDEBAR_ITEM_TYPE {
  Button,
  Separator,
}

type SideBarItem<T extends SIDEBAR_ITEM_TYPE> = T extends SIDEBAR_ITEM_TYPE.Button
  ? {
      label: string;
      icon: YourDashIcon;
      onClick: () => void;
      type: SIDEBAR_ITEM_TYPE.Button;
    }
  : {
      id: string;
      type: SIDEBAR_ITEM_TYPE.Separator;
    };

export interface ISideBar {
  title: string;
  items: SideBarItem<SIDEBAR_ITEM_TYPE>[];
  defaultState: SIDEBAR_STATE;
}

const SideBar: React.FC<ISideBar> = ({ title, items, defaultState }) => {
  const [state, setState] = React.useState(defaultState);

  switch (state) {
    case SIDEBAR_STATE.NormalExpanded:
    case SIDEBAR_STATE.NormalMinimised:
      return (
        <div
          className={clippy(
            styles.normal,
            state === SIDEBAR_STATE.NormalMinimised ? styles.normalMinimised : styles.normalExpanded,
          )}
        >
          <section className={styles.header}>
            <IconButton
              className={styles.toggleButton}
              icon={YourDashIcon.ThreeBars}
              onClick={() => {
                switch (state) {
                  case SIDEBAR_STATE.NormalExpanded:
                    setState(SIDEBAR_STATE.NormalMinimised);
                    break;
                  case SIDEBAR_STATE.NormalMinimised:
                    setState(SIDEBAR_STATE.NormalExpanded);
                    break;
                  default:
                    console.log("this is unreachable (if you see this, please open an issue)");
                    break;
                }
              }}
            />
            <span className={clippy(styles.title, "animate__animated animate__fadeInRight animate__500ms")}>
              {title}
            </span>
          </section>
          <div className={styles.separator} />
          <section className={styles.itemsContainer}>
            {items.map((i) => {
              switch (i.type) {
                case SIDEBAR_ITEM_TYPE.Button:
                  return (
                    <button className={styles.itemButton} key={i.label} onClick={i.onClick}>
                      <Icon icon={i.icon} className={styles.itemIcon} />
                      {state === SIDEBAR_STATE.NormalExpanded ? (
                        <div className={clippy(styles.label, "animate__animated animate__fadeInRight animate__500ms")}>
                          {i.label}
                        </div>
                      ) : (
                        <div
                          className={clippy(styles.label, "animate__animated animate__fadeIn animate__duration_250ms")}
                        >
                          {i.label}
                        </div>
                      )}
                    </button>
                  );
                case SIDEBAR_ITEM_TYPE.Separator:
                  return <div key={i.id} className={styles.itemSeparator} />;
                default:
                  console.log("this is unreachable (if you see this, please make sure to type your sidebar items)");
                  break;
              }
            })}
          </section>
        </div>
      );
    case SIDEBAR_STATE.FloatingToggleMinimised:
    case SIDEBAR_STATE.FloatingToggleExpanded:
      return (
        <div
          className={clippy(
            styles.floatingToggle,
            state === SIDEBAR_STATE.FloatingToggleMinimised
              ? styles.floatingToggleMinimised
              : styles.floatingToggleExpanded,
          )}
        >
          <section className={styles.header}>
            <IconButton
              className={styles.toggleButton}
              icon={YourDashIcon.ThreeBars}
              onClick={() => {
                switch (state) {
                  case SIDEBAR_STATE.FloatingToggleExpanded:
                    setState(SIDEBAR_STATE.FloatingToggleMinimised);
                    break;
                  case SIDEBAR_STATE.FloatingToggleMinimised:
                    setState(SIDEBAR_STATE.FloatingToggleExpanded);
                    break;
                  default:
                    console.log("this is unreachable (if you see this, please open an issue)");
                    break;
                }
              }}
            />
            <span className={clippy(styles.title, "animate__animated animate__fadeInRight animate__500ms")}>
              {title}
            </span>
          </section>
          <div className={styles.separator} />
          <section className={styles.itemsContainer}>
            {items.map((i) => {
              switch (i.type) {
                case SIDEBAR_ITEM_TYPE.Button:
                  return (
                    <button className={styles.itemButton} key={i.label} onClick={i.onClick}>
                      <Icon icon={i.icon} className={styles.itemIcon} />
                      {state === SIDEBAR_STATE.FloatingToggleExpanded ? (
                        <div className={clippy(styles.label, "animate__animated animate__fadeInRight animate__500ms")}>
                          {i.label}
                        </div>
                      ) : (
                        <div
                          className={clippy(styles.label, "animate__animated animate__fadeIn animate__duration_250ms")}
                        >
                          {i.label}
                        </div>
                      )}
                    </button>
                  );
                case SIDEBAR_ITEM_TYPE.Separator:
                  return <div key={i.id} className={styles.itemSeparator} />;
                default:
                  console.log("this is unreachable (if you see this, please make sure to type your sidebar items)");
                  break;
              }
            })}
          </section>
        </div>
      );
    case SIDEBAR_STATE.FloatingExpanded:
    case SIDEBAR_STATE.FloatingMinimised:
      return (
        <div
          className={clippy(
            styles.floating,
            state === SIDEBAR_STATE.FloatingMinimised ? styles.floatingMinimised : styles.floatingExpanded,
          )}
        >
          <section className={styles.header}>
            <IconButton
              className={styles.toggleButton}
              icon={YourDashIcon.ThreeBars}
              onClick={() => {
                switch (state) {
                  case SIDEBAR_STATE.FloatingExpanded:
                    setState(SIDEBAR_STATE.FloatingMinimised);
                    break;
                  case SIDEBAR_STATE.FloatingMinimised:
                    setState(SIDEBAR_STATE.FloatingExpanded);
                    break;
                  default:
                    console.log("this is unreachable (if you see this, please open an issue)");
                    break;
                }
              }}
            />
            <span className={clippy(styles.title, "animate__animated animate__fadeInRight animate__500ms")}>
              {title}
            </span>
          </section>
          <div className={styles.separator} />
          <section className={styles.itemsContainer}>
            {items.map((i) => {
              switch (i.type) {
                case SIDEBAR_ITEM_TYPE.Button:
                  return (
                    <button className={styles.itemButton} key={i.label} onClick={i.onClick}>
                      <Icon icon={i.icon} className={styles.itemIcon} />
                      {state === SIDEBAR_STATE.FloatingExpanded ? (
                        <div className={clippy(styles.label, "animate__animated animate__fadeInRight animate__500ms")}>
                          {i.label}
                        </div>
                      ) : (
                        <div
                          className={clippy(styles.label, "animate__animated animate__fadeIn animate__duration_250ms")}
                        >
                          {i.label}
                        </div>
                      )}
                    </button>
                  );
                case SIDEBAR_ITEM_TYPE.Separator:
                  return <div key={i.id} className={styles.itemSeparator} />;
                default:
                  console.log("this is unreachable (if you see this, please make sure to type your sidebar items)");
                  break;
              }
            })}
          </section>
        </div>
      );
    default:
      return <div>error</div>;
  }
};

export default SideBar;
