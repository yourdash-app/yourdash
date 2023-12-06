/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import IPanelApplicationsLauncherApplication from "shared/core/panel/applicationsLauncher/application";
import csi from "../../../../../../../helpers/csi";
import { Card, RightClickMenu } from "../../../../../../../ui/index";
import styles from "./ApplicationGrid.module.scss"
import { useNavigate } from "react-router";

const ApplicationGrid: React.FC<{ applications: IPanelApplicationsLauncherApplication[] }> = ( { applications } ) => {
  const navigate = useNavigate()

  return <section className={styles.grid}>
    {
      applications.map( application => {
        return <RightClickMenu
          items={[
            {
              name: "Pin To Panel",
              onClick() {
                csi.postJson(
                  "/core/panel/quick-shortcuts/create",
                  { name: application.name },
                  () => {
                    // @ts-ignore
                    window.__yourdashCorePanelQuickShortcutsReload?.()
                    return 0
                  }
                )
              }
            },
            {
              name: "Open In New Tab",
              onClick() {
                window.open( `${ window.location.origin }${ window.location.pathname }#/app/a/${ application.name }`, "_blank" )
                return 0
              }
            }
          ]}
          className={styles.item}
          key={application.name}
        >
          <Card
            onClick={() => {
              navigate( `/app/a/${application.name}` )
            }}
            showBorder={true}
            className={styles.itemContent}
          >
            <img
              loading={"lazy"}
              className={styles.itemIcon}
              src={`${ csi.getInstanceUrl() }${application.icon}`}
              alt=""
            />
            <span className={styles.itemLabel}>{application.displayName}</span>
          </Card>
        </RightClickMenu>
      } )
    }
  </section>
}

export default ApplicationGrid;
