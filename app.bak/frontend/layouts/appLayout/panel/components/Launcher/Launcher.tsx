import React, { useState } from "react";
import styles from "../../Panel.module.scss";
import Chiplet from "~/chipletui";
import PanelLauncherSlideOut from "./LauncherSlideOut";
import { PanelQuickShortcut } from "~/../backend/src/helpers/panel/types";
import { YourDashUser } from "~/../backend/src/helpers/user/types";

interface ILauncher {
  background: string;
  userData: YourDashUser;
  quickShortcuts: PanelQuickShortcut[];
  setQuickShortcuts: (value: PanelQuickShortcut[]) => void;
}

const Launcher: React.FC<ILauncher> = ({ background, userData, quickShortcuts, setQuickShortcuts }) => {
  const [ slideOutVisible, setSlideOutVisible ] = useState( false );

  return (
      <>
        <button
            type="button"
            className={ styles.launcher }
            onClick={ () => {
              setSlideOutVisible( !slideOutVisible );
            } }
        >
          <Chiplet.Icon
              name="app-launcher-16"
              style={ {
                aspectRatio: "1/1",
                height: "100%",
              } }
              color={ "var(--app.bak-panel-fg)" }
          />
        </button>
        <PanelLauncherSlideOut
            backgroundImage={ background }
            fullName={ userData?.name || "error" }
            setVisibility={ (value: boolean) => {
              setSlideOutVisible( value );
            } }
            visible={ slideOutVisible }
            addQuickShortcut={ (shortcut: PanelQuickShortcut) => {
              setQuickShortcuts( [ ...quickShortcuts, shortcut ] );
            } }
            userName={ userData?.username || "ERROR" }
        />
      </>
  );
};

export default Launcher;
