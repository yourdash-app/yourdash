/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Panel from "./Panel.tsx";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import styles from "./PanelLayout.module.scss";
import coreCSI from "@yourdash/csi/coreCSI.ts";

const PanelLayout: React.FC = () => {
  const [panelSide, setPanelSide] = React.useState<"top" | "right" | "bottom" | "left" | undefined>(undefined);
  const [reloadNumber, setReloadNumber] = React.useState<number>(0);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setPanelSide("bottom");
    } else {
      setPanelSide(coreCSI.userDB.get("core:panel:side") || "left");
    }
  }, [reloadNumber]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setPanelSide("bottom");
    } else {
      setPanelSide(coreCSI.userDB.get("core:panel:side") || "left");
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setPanelSide("bottom");
      } else {
        setPanelSide(coreCSI.userDB.get("core:panel:side") || "left");
      }
    });
  }, []);

  if (panelSide === undefined) {
    return <></>;
  }

  switch (panelSide) {
    case "top":
      return (
        <div className={clippy(styles.layout, styles.top)}>
          <Panel
            side={"top"}
            setLayoutReloadNumber={(num) => setReloadNumber(num)}
          />
          <div
            key={1}
            className={styles.applicationFrame}
          >
            <Outlet key={1} />
          </div>
        </div>
      );
    case "left":
      return (
        <div className={clippy(styles.layout, styles.left)}>
          <Panel
            side={"left"}
            setLayoutReloadNumber={(num) => setReloadNumber(num)}
          />
          <div
            key={1}
            className={styles.applicationFrame}
          >
            <Outlet key={1} />
          </div>
        </div>
      );
    case "bottom":
      return (
        <div className={clippy(styles.layout, styles.bottom)}>
          <div
            key={1}
            className={styles.applicationFrame}
          >
            <Outlet key={1} />
          </div>
          <Panel
            side={"bottom"}
            setLayoutReloadNumber={(num) => setReloadNumber(num)}
          />
        </div>
      );
    case "right":
      return (
        <div className={clippy(styles.layout, styles.right)}>
          <div
            key={1}
            className={styles.applicationFrame}
          >
            <Outlet key={1} />
          </div>
          <Panel
            side={"right"}
            setLayoutReloadNumber={(num) => setReloadNumber(num)}
          />
        </div>
      );
    default:
      return <>An Unexpected Error Occurred</>;
  }
};

export default PanelLayout;
