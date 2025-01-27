/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import DropdownIconButton from "@yourdash/chiplet/components/dropdownIconButton/DropdownIconButton.tsx";
import RightClickMenu from "@yourdash/chiplet/components/rightClickMenu/RightClickMenu.tsx";
import React from "react";
import IPanelApplicationsLauncherFrontendModule from "@yourdash/shared/core/panel/applicationsLauncher/application.ts";
import coreCSI from "@yourdash/csi/coreCSI.ts";
import styles from "./ApplicationList.module.scss";
import { useNavigate } from "react-router";
import UKCard from "@yourdash/uikit/src/components/card/UKCard.js";
import { UKIcons } from "@yourdash/uikit/src/core/iconDictionary.js";

const ApplicationList: React.FC<{ applications: IPanelApplicationsLauncherFrontendModule[] }> = ({ applications }) => {
  const navigate = useNavigate();

  return (
    <section className={styles.grid}>
      {applications.map((application) => {
        return (
          <RightClickMenu
            items={[
              {
                label: "Pin To Panel",
                async onClick() {
                  await coreCSI.postJson("/core/panel/quick-shortcuts/create", { id: application.id, moduleType: application.type });
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
            onClick={() => {
              switch (application.type) {
                case "frontend":
                  navigate(application.endpoint!);
                  break;
                case "externalFrontend":
                  window.location.href = application.url!;
                  break;
              }
            }}
          >
            <UKCard className={styles.itemContent}>
              <img
                loading={"lazy"}
                className={styles.itemIcon}
                src={`${coreCSI.getInstanceUrl()}${application.icon}`}
                draggable={false}
                alt=""
              />
              <span className={styles.itemLabel}>{application.displayName}</span>
              <DropdownIconButton
                className={"ml-auto"}
                items={[
                  {
                    label: "Pin To Panel",
                    async onClick() {
                      await coreCSI.postJson("/core/panel/quick-shortcuts/create", { id: application.id, moduleType: application.type });
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
                icon={UKIcons.ThreeBars}
              />
            </UKCard>
          </RightClickMenu>
        );
      })}
    </section>
  );
};

export default ApplicationList;
