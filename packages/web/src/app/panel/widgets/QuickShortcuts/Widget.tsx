/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import toAuthImgUrl from "@yourdash/csi/toAuthImgUrl.ts";
import useResource from "@yourdash/csi/useResource.ts";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import { useNavigate } from "react-router-dom";
import coreCSI from "@yourdash/csi/coreCSI.ts";
import styles from "./Widget.module.scss";
import React from "react";

const QuickShortcuts: React.FC<{ side: "top" | "right" | "bottom" | "left" }> = ({ side }) => {
  const navigate = useNavigate();

  const [num, setNum] = React.useState<number>(0);
  const modules = useResource(() => coreCSI.getJson("/core/panel/quick-shortcuts", "/core/panel/quick-shortcuts"), [num]) || [];

  // @ts-ignore
  window.__yourdashCorePanelQuickShortcutsReload = () => {
    setNum(num + 1);
  };

  return (
    <>
      {modules.map((module) => {
        if (!module) return <>Invalid Module</>;

        return (
          <UK.Core.IncrementLevel key={module.name}>
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
                UK.Core.useLevelClass(1),
              )}
            >
              <UKImage
                className={styles.applicationIcon}
                src={toAuthImgUrl(module.icon)}
                accessibleLabel={module.name}
              />
              <span className={styles.applicationLabel}>{module.name}</span>
            </div>
          </UK.Core.IncrementLevel>
        );
      })}
    </>
  );
};

export default QuickShortcuts;
