/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect } from "react";
import { IconButton, YourDashIcon } from "../../../../ui/index";
import styles from "./Widget.module.scss"
import ApplicationLauncher from "./launcher/Launcher";
import { useLocation } from "react-router";

const ApplicationLauncherWidget: React.FC<{ side: "top" | "right" | "bottom" | "left" }> = ( { side } ) => {
  const [ launcherVisible, setLauncherVisible ] = React.useState<boolean>( false )
  const location = useLocation()

  useEffect( () => {
    setLauncherVisible( false )
  }, [ location ] );

  return <div className={styles.widgetContainer}>
    <IconButton
      icon={YourDashIcon.AppLauncher}
      className={styles.launcherButton}
      onClick={() => setLauncherVisible( !launcherVisible )}
    />
    <ApplicationLauncher side={side} visible={launcherVisible} />
  </div>
}

export default ApplicationLauncherWidget;
