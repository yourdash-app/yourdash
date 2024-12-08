/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import IPanelApplicationsLauncherFrontendModule from "@yourdash/shared/core/panel/applicationsLauncher/application.ts";
import coreCSI from "@yourdash/csi/coreCSI.ts";
import styles from "./LargeApplicationGrid.module.scss";
import { useNavigate } from "react-router";
import { UKC } from "@yourdash/uikit";

const LargeApplicationGrid: React.FC<{
  modules: IPanelApplicationsLauncherFrontendModule[];
}> = ({ modules }) => {
  const navigate = useNavigate();

  return (
    <section className={styles.grid}>
      {modules.map((module) => {
        return (
          <UKC.ContextMenu
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
                  window.open(`${window.location.origin}/app/a/${module.id}`, "_blank");
                  return 0;
                },
              },
            ]}
            className={styles.item}
            key={module.id}
          >
            <UKC.Card
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
            </UKC.Card>
          </UKC.ContextMenu>
        );
      })}
    </section>
  );
};

export default LargeApplicationGrid;
