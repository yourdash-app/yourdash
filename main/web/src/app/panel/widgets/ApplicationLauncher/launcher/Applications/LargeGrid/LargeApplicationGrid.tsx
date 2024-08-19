/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Card from "@yourdash/uikit/components/card/card";
import ContextMenu from "@yourdash/uikit/components/contextMenu/contextMenu.js";
import React from "react";
import IPanelApplicationsLauncherFrontendModule from "@yourdash/shared/core/panel/applicationsLauncher/application";
import coreCSI from "@yourdash/csi/coreCSI";
import styles from "./LargeApplicationGrid.module.scss";
import { useNavigate } from "react-router";

const LargeApplicationGrid: React.FC<{
  modules: IPanelApplicationsLauncherFrontendModule[];
}> = ({ modules }) => {
  const navigate = useNavigate();

  return (
    <section className={styles.grid}>
      {modules.map((module) => {
        return (
          <ContextMenu
            items={[
              {
                label: "Pin To Panel",
                async onClick() {
                  await coreCSI.postJson("/core/panel/quick-shortcuts/create", { id: module.id, moduleType: module.type });
                  // @ts-ignore
                  window.__yourdashCorePanelQuickShortcutsReload?.();
                  return 0;
                },
              },
              {
                label: "Open In New Tab",
                onClick() {
                  window.open(`${window.location.origin}${window.location.pathname}/app/a/${module.id}`, "_blank");
                  return 0;
                },
              },
            ]}
            className={styles.item}
            key={module.id}
          >
            <Card
              onClick={() => {
                navigate(module.url);
              }}
              className={styles.itemContent}
            >
              <img
                className={styles.itemIcon}
                src={`${coreCSI.getInstanceUrl()}${module.icon}`}
                draggable={false}
                loading={"lazy"}
                alt=""
              />
              <span className={styles.itemLabel}>{module.displayName}</span>
            </Card>
          </ContextMenu>
        );
      })}
    </section>
  );
};

export default LargeApplicationGrid;
