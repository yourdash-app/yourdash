/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import tun from "@yourdash/tunnel/src/index.js";
import UKCard from "@yourdash/uikit/components/card/UKCard.js";
import UKContextMenu from "@yourdash/uikit/components/contextMenu/UKContextMenu.js";
import useToast from "@yourdash/uikit/src/core/toasts/useToast.js";
import React from "react";
import IPanelApplicationsLauncherFrontendModule from "@yourdash/shared/core/panel/applicationsLauncher/application.ts";
import coreCSI from "@yourdash/csi/coreCSI.ts";
import styles from "./LargeApplicationGrid.module.scss";
import { useNavigate } from "react-router";
import { z } from "zod";

const LargeApplicationGrid: React.FC<{
  modules: IPanelApplicationsLauncherFrontendModule[];
}> = ({ modules }) => {
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <section className={styles.grid}>
      {modules.map((module) => {
        return (
          <UKContextMenu
            items={[
              {
                label: "Pin To Panel",
                async onClick() {
                  let success = await tun.post(
                    "/core/panel/quick-shortcuts/create",
                    { id: module.id },
                    "json",
                    z.object({
                      success: z.boolean(),
                    }),
                  );

                  if (success.data.success) {
                    // @ts-ignore
                    window.__yourdashCorePanelQuickShortcutsReload?.();
                    toast.create({
                      type: "success",
                      content: { title: "Application pinned successfully", body: "" },
                    });
                  } else {
                    toast.create({
                      type: "error",
                      content: { body: "Failed to pin application", title: "An application must only be pinned once to the panel." },
                    });
                  }

                  return 0;
                },
              },
              {
                label: "Open In New Tab",
                onClick() {
                  if (module.type === "frontend") {
                    window.open(`${window.location.origin}${module.endpoint}`, "_blank");
                  } else {
                    window.open(`${module.url}`, "_blank");
                  }
                  return 0;
                },
              },
            ]}
            className={styles.item}
            key={module.id}
          >
            <UKCard
              onClick={() => {
                if (module.type === "frontend") {
                  navigate(`${module.endpoint}`);
                } else {
                  navigate(`${module.url}`);
                }
              }}
              className={styles.itemContent}
            >
              <img
                className={styles.itemIcon}
                src={`${coreCSI.getInstanceUrl()}/core/panel/applications/app/largeGrid/${module.id}`}
                draggable={false}
                loading={"lazy"}
                alt=""
              />
              <span className={styles.itemLabel}>{module.displayName}</span>
            </UKCard>
          </UKContextMenu>
        );
      })}
    </section>
  );
};

export default LargeApplicationGrid;
