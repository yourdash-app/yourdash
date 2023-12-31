/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { useNavigate } from "react-router-dom";
import styles from "./Launcher.module.scss"
import clippy from "../../../../../helpers/clippy";
import { IconButton, YourDashIcon } from "../../../../../ui/index";
import React, { memo, useEffect, useState } from "react";
import ApplicationsLauncherApplications from "./Applications/Applications";
import IPanelApplicationsLauncherApplication from "shared/core/panel/applicationsLauncher/application";
import csi from "../../../../../web-client/src/helpers/csi";

const ApplicationLauncher: React.FC<{ side: "top" | "right" | "bottom" | "left", visible: boolean }> = ( { side, visible } ) => {
  const navigate = useNavigate()
  const [ apps, setApps ] = useState<IPanelApplicationsLauncherApplication[]>( [] )

  useEffect( () => {
    csi.getJson( "/core/panel/applications", ( data ) => {
      setApps( data )
    } )
  }, [] );

  return <div
    className={
      clippy(
        styles.applicationLauncher,
        side === "top" && `${styles.sideTop} animate__slideInLeft`,
        side === "right" && `${styles.sideRight} animate__slideInDown`,
        side === "bottom" && `${styles.sideBottom} animate__slideInLeft`,
        side === "left" && `${styles.sideLeft} animate__slideInDown`,
        "animate__animated animate__duration_500ms",
        !visible && styles.invisible
      )
    }
  >
    <div className={styles.content}>
      <ApplicationsLauncherApplications apps={apps}/>
      <section className={styles.footer}>
        <IconButton
          className={styles.logoutButton}
          icon={YourDashIcon.Logout}
          onClick={() => {
            csi.logout();
            navigate( "/login" )
          }}
        />
        <div>
          <img src={""} alt={""}/>
          <IconButton
            icon={YourDashIcon.Person}
            aria-label={"User Profile Settings"}
          />
        </div>
        <span>
          {csi.userDB.get( "core:user:name" )?.first || "Unknown First Name"}
        </span>
      </section>
    </div>
  </div>
}

export default memo( ApplicationLauncher )
