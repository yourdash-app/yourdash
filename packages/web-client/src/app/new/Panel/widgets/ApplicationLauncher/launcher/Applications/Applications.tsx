/*
 * Copyright © 2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { useEffect } from "react";
import IPanelApplicationsLauncherApplication from "shared/core/panel/applicationsLauncher/application";
import ApplicationGrid from "./Grid/ApplicationGrid";
import { TextInput } from "../../../../../../../ui/index";
import styles from "./Applications.module.scss"

const ApplicationsLauncherApplications: React.FC<{apps: IPanelApplicationsLauncherApplication[]}> = ( { apps } ) => {
  const [layout, setLayout] = React.useState<"grid" | "list">( "grid" )
  const [applications, setApplications] = React.useState<IPanelApplicationsLauncherApplication[]>( apps )
  
  useEffect( () => {
    setApplications( apps )
  }, [apps] );
  
  return <>
    <TextInput
      className={styles.searchBar}
      onChange={( val ) => {
        setApplications(
          apps.filter( application => application.name.toLowerCase().includes( val.toLowerCase() ) || application.description.toLowerCase().includes( val.toLowerCase() ) || application.displayName.toLowerCase().includes( val.toLowerCase() ) )
        )
      }}
    />

    { layout === "grid" && <ApplicationGrid applications={applications}></ApplicationGrid> }
    { layout === "list" && <></> }
  </>
}

export default ApplicationsLauncherApplications