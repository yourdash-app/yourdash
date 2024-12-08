/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import styles from "./Panel.module.scss";
import React, { memo, useEffect, useState } from "react";
import loadable from "@loadable/component";
import coreCSI from "@yourdash/csi/coreCSI.ts";
import { UKC } from "@yourdash/uikit";

const Panel: React.FC<{
  side: "top" | "right" | "bottom" | "left";
  setLayoutReloadNumber: (num: number) => void;
}> = ({ side, setLayoutReloadNumber }) => {
  const [widgets, _setWidgets] = useState<string[]>([
    "InstanceLogo",
    "ApplicationLauncher",
    "Separator",
    "QuickShortcuts",
    "LocalhostIndicator",
    "UserProfile",
  ]);
  const [panelSize, setPanelSize] = useState<"small" | "medium" | "large" | undefined>(undefined);
  const [num, setNum] = useState<number>(0);

  useEffect(() => {
    setPanelSize(coreCSI.userDB.get("core:panel:size") || "medium");
  }, [num]);

  // @ts-ignore
  window.__yourdashCorePanelReload = () => {
    setNum(num + 1);
    setLayoutReloadNumber(num + 1);
  };

  if (panelSize === undefined) {
    return <></>;
  }

  return (
    <UKC.Box
      className={clippy(
        styles.panel,
        side === "top" && styles.top,
        side === "right" && styles.right,
        side === "bottom" && styles.bottom,
        side === "left" && styles.left,
        panelSize === "small" && styles.small,
        panelSize === "medium" && styles.medium,
        panelSize === "large" && styles.large,
      )}
    >
      {widgets.map((widget) => {
        const LoadableWidget = loadable(() => import(`./widgets/${widget}/Widget`));

        return (
          <LoadableWidget
            key={widget}
            side={side}
          />
        );
      })}
    </UKC.Box>
  );
};

export default memo(Panel, (prevProps, nextProps) => prevProps.side === nextProps.side);
