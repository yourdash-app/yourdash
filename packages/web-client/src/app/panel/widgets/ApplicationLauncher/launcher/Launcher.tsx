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

import styles from "./Launcher.module.scss"
import clippy from "../../../../../helpers/clippy";
import { IconButton, YourDashIcon } from "../../../../../ui/index";
import { memo, useEffect, useState } from "react";
import ApplicationsLauncherApplications from "./Applications/Applications";
import IPanelApplicationsLauncherApplication from "shared/core/panel/applicationsLauncher/application";
import csi from "../../../../../helpers/csi";

const ApplicationLauncher: React.FC<{ side: "top" | "right" | "bottom" | "left", visible: boolean }> = ( { side, visible } ) => {
  const [apps, setApps] = useState<IPanelApplicationsLauncherApplication[]>( [] )
  
  useEffect( () => {
    csi.getJson( "/core/panel/applications", ( data ) => {
      setApps( data )
    } )
  }, [] );
  
  return <div
    className={clippy(
      styles.applicationLauncher,
      side === "top" && styles.sideTop,
      side === "right" && styles.sideRight,
      side === "bottom" && styles.sideBottom,
      side === "left" && styles.sideLeft,
      "animate__animated animate__fadeInLeft animate__duration_500ms",
      !visible && styles.invisible
    )}
  >
    <ApplicationsLauncherApplications apps={apps}/>
    <section className={styles.footer}>
      <IconButton
        className={styles.logoutButton}
        icon={YourDashIcon.Logout}
      />
      <div>
        <img src={""} alt={""}/>
        <IconButton
          icon={YourDashIcon.Person}
          aria-label={"User Profile Settings"}
        />
      </div>
      <span>
        {csi.userDB.get( "core:user:userFullName" ).first}
      </span>
    </section>
  </div>
}

export default memo( ApplicationLauncher )