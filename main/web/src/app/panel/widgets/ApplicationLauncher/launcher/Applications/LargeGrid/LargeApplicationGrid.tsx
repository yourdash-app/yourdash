/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Card from "@yourdash/uikit/components/card/card";
import ContextMenu from "@yourdash/uikit/components/contextMenu/contextMenu.js";
import React from "react";
import IPanelApplicationsLauncherApplication from "@yourdash/shared/core/panel/applicationsLauncher/application";
import csi from "@yourdash/csi/csi";
import styles from "./LargeApplicationGrid.module.scss";
import { useNavigate } from "react-router";

const LargeApplicationGrid: React.FC<{
  applications: IPanelApplicationsLauncherApplication[];
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
                onClick() {
                  csi.postJson("/core/panel/quick-shortcuts/create", { name: application.name }, () => {
                    // @ts-ignore
                    window.__yourdashCorePanelQuickShortcutsReload?.();
                    return 0;
                  });
                },
              },
              {
                label: "Open In New Tab",
                onClick() {
                  window.open(
                    `${window.location.origin}${window.location.pathname}/app/a/${application.name}`,
                    "_blank",
                  );
                  return 0;
                },
              },
            ]}
            className={styles.item}
            key={application.name}
          >
            <Card
              onClick={() => {
                navigate(`/app/a/${application.name}`);
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
