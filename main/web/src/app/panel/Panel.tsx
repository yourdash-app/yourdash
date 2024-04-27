/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import styles from "./Panel.module.scss";
import React, { memo, useEffect, useState } from "react";
import loadable from "@loadable/component";
import csi from "@yourdash/csi/csi";

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
  ]);
  const [panelSize, setPanelSize] = useState<"small" | "medium" | "large" | undefined>(undefined);
  const [num, setNum] = useState<number>(0);

  useEffect(() => {
    setPanelSize(csi.userDB.get("core:panel:size") || "medium");
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
    <section
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

        return <LoadableWidget key={widget} side={side} />;
      })}
    </section>
  );
};

export default memo(Panel, (prevProps, nextProps) => prevProps.side === nextProps.side);
