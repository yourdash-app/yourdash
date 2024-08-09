/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Card from "@yourdash/uikit/components/card/card";
import ContextMenu from "@yourdash/uikit/components/contextMenu/contextMenu.js";
import React from "react";
import IPanelApplicationsLauncherFrontendModule from "@yourdash/shared/core/panel/applicationsLauncher/application";
import csi from "@yourdash/csi/csi";
import styles from "./LargeApplicationGrid.module.scss";
import { useNavigate } from "react-router";

const LargeApplicationGrid: React.FC<{
  applications: IPanelApplicationsLauncherFrontendModule[];
}> = ({ applications }) => {
  const navigate = useNavigate();

  return (
    <section className={styles.grid}>
      {applications.map((application) => {
        return (
          <ContextMenu
            items={[
              {
                label: "Pin To Panel",
                async onClick() {
                  await csi.postJson("/core/panel/quick-shortcuts/create", { id: application.id, moduleType: application.type });
                  // @ts-ignore
                  window.__yourdashCorePanelQuickShortcutsReload?.();
                  return 0;
                },
              },
              {
                label: "Open In New Tab",
                onClick() {
                  window.open(`${window.location.origin}${window.location.pathname}/app/a/${application.id}`, "_blank");
                  return 0;
                },
              },
            ]}
            className={styles.item}
            key={application.id}
          >
            <Card
              onClick={() => {
                navigate(application.url);
              }}
              className={styles.itemContent}
            >
              <img
                className={styles.itemIcon}
                src={`${csi.getInstanceUrl()}${application.icon}`}
                draggable={false}
                loading={"lazy"}
                alt=""
              />
              <span className={styles.itemLabel}>{application.displayName}</span>
            </Card>
          </ContextMenu>
        );
      })}
    </section>
  );
};

export default LargeApplicationGrid;
