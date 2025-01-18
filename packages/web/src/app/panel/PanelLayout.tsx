/*
 * Copyright ©2025 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKImage from "@yourdash/uikit/components/image/UKImage.js";
import UKText from "@yourdash/uikit/components/text/UKText.js";
import { UKIcons } from "@yourdash/uikit/core/iconDictionary.js";
import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Panel from "./Panel.tsx";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import styles from "./PanelLayout.module.scss";
import coreCSI from "@yourdash/csi/coreCSI.ts";
import UKIconButton from "@yourdash/uikit/components/iconButton/UKIconButton.js";

const PanelLayout: React.FC<{
  showBackButton: boolean;
  onBackButton: () => void;
  controls: React.ReactNode;
  applicationDisplayName: string;
  applicationIcon: string;
}> = ({ showBackButton, onBackButton, controls, applicationDisplayName, applicationIcon }) => {
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
          <div className={styles.applicationPanelFrame}>
            <div className={styles.applicationPanel}>
              {showBackButton && (
                <UKIconButton
                  icon={UKIcons.ChevronLeft}
                  accessibleLabel={"Go Back"}
                  onClick={onBackButton}
                />
              )}
              <UKImage
                className={styles.applicationIcon}
                src={applicationIcon}
                accessibleLabel={""}
              />
              <UKText
                text={applicationDisplayName}
                className={styles.applicationDisplayName}
              />
              <div key={"controls"}>{controls}</div>
            </div>
            <div
              key={1}
              className={styles.applicationFrame}
            >
              <Outlet key={1} />
            </div>
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
          <div className={styles.applicationPanelFrame}>
            <div className={styles.applicationPanel}>
              {showBackButton && (
                <UKIconButton
                  icon={UKIcons.ChevronLeft}
                  accessibleLabel={"Go Back"}
                  onClick={onBackButton}
                />
              )}
              <UKImage
                className={styles.applicationIcon}
                src={applicationIcon}
                accessibleLabel={""}
              />
              <UKText
                text={applicationDisplayName}
                className={styles.applicationDisplayName}
              />
              <React.Fragment>{controls}</React.Fragment>
            </div>
            <div
              key={1}
              className={styles.applicationFrame}
            >
              <Outlet key={1} />
            </div>
          </div>
        </div>
      );
    case "bottom":
      return (
        <div className={clippy(styles.layout, styles.bottom)}>
          <div className={styles.applicationPanelFrame}>
            <div className={styles.applicationPanel}>
              {showBackButton && (
                <UKIconButton
                  icon={UKIcons.ChevronLeft}
                  accessibleLabel={"Go Back"}
                  onClick={onBackButton}
                />
              )}
              <UKImage
                className={styles.applicationIcon}
                src={applicationIcon}
                accessibleLabel={""}
              />
              <UKText
                text={applicationDisplayName}
                className={styles.applicationDisplayName}
              />
              <React.Fragment>{controls}</React.Fragment>
            </div>
            <div
              key={1}
              className={styles.applicationFrame}
            >
              <Outlet key={1} />
            </div>
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
          <div className={styles.applicationPanelFrame}>
            <div className={styles.applicationPanel}>
              {showBackButton && (
                <UKIconButton
                  icon={UKIcons.ChevronLeft}
                  accessibleLabel={"Go Back"}
                  onClick={onBackButton}
                />
              )}
              <UKImage
                className={styles.applicationIcon}
                src={applicationIcon}
                accessibleLabel={""}
              />
              <UKText
                text={applicationDisplayName}
                className={styles.applicationDisplayName}
              />
              <React.Fragment>{controls}</React.Fragment>
            </div>
            <div
              key={1}
              className={styles.applicationFrame}
            >
              <Outlet key={1} />
            </div>
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
