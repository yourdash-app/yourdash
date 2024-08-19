/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import useResource from "@yourdash/csi/useResource";
import clippy from "@yourdash/shared/web/helpers/clippy";
import Image from "@yourdash/uikit/components/image/image";
import IncrementLevel from "@yourdash/uikit/core/incrementLevel";
import { useLevelClass } from "@yourdash/uikit/core/level";
import { useNavigate } from "react-router-dom";
import coreCSI from "@yourdash/csi/coreCSI";
import styles from "./Widget.module.scss";
import React from "react";
import { EndpointCorePanelQuickShortcuts } from "@yourdash/shared/endpoints/core/panel/quickShortcuts"

const QuickShortcuts: React.FC<{ side: "top" | "right" | "bottom" | "left" }> = ({ side }) => {
  const navigate = useNavigate();

  const [num, setNum] = React.useState<number>(0);
  const modules =
    useResource<
      EndpointCorePanelQuickShortcuts
    >(() => coreCSI.getJson("/core/panel/quick-shortcuts"), [num]) || [];

  // @ts-ignore
  window.__yourdashCorePanelQuickShortcutsReload = () => {
    setNum(num + 1);
  };

  return (
    <>
      {modules.map((module) => {
        if (!module) return <>Invalid Module</>;

        return (
          <IncrementLevel key={module.name}>
            <div
              key={module.name}
              onClick={() => {
                navigate(module.url);
              }}
              className={clippy(
                styles.application,
                side === "top" && styles.top,
                side === "right" && styles.right,
                side === "bottom" && styles.bottom,
                side === "left" && styles.left,
                useLevelClass(1),
              )}
            >
              <Image
                authenticatedImage
                className={styles.applicationIcon}
                src={module.icon}
                accessibleLabel={module.name}
              />
              <span className={styles.applicationLabel}>{module.name}</span>
            </div>
          </IncrementLevel>
        );
      })}
    </>
  );
};

export default QuickShortcuts;
