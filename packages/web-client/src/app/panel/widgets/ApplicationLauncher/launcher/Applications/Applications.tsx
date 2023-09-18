/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect } from "react";
import IPanelApplicationsLauncherApplication from "shared/core/panel/applicationsLauncher/application";
import ApplicationGrid from "./Grid/ApplicationGrid";
import { TextInput } from "../../../../../../ui/index";
import styles from "./Applications.module.scss"
import { useNavigate } from "react-router";

let filteredApplications: IPanelApplicationsLauncherApplication[] = []

const ApplicationsLauncherApplications: React.FC<{apps: IPanelApplicationsLauncherApplication[]}> = ( { apps } ) => {
  const navigate = useNavigate()
  const [layout, setLayout] = React.useState<"grid" | "list">( "grid" )
  const [applications, setApplications] = React.useState<IPanelApplicationsLauncherApplication[]>( apps )
  
  useEffect( () => {
    setApplications( apps )
  }, [apps] );
  
  return <>
    <TextInput
      className={styles.searchBar}
      onKeyDown={( e ) => {
        if ( e.key === "Enter" ) {
          if ( filteredApplications.length === 1 ) {
            navigate( `/app/a/${filteredApplications[0].name}` )
          }
        }
      }}
      onChange={( val ) => {
        filteredApplications = apps.filter( application => application.name.toLowerCase().includes( val.toLowerCase() ) || application.description.toLowerCase().includes( val.toLowerCase() ) || application.displayName.toLowerCase().includes( val.toLowerCase() ) )
        
        setApplications(
          filteredApplications
        )
      }}
    />

    { layout === "grid" && <ApplicationGrid applications={applications}></ApplicationGrid> }
    { layout === "list" && <></> }
  </>
}

export default ApplicationsLauncherApplications