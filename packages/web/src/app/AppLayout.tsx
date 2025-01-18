/*
 * Copyright ©2025 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import PanelLayout from "./panel/PanelLayout.tsx";
import React, { useEffect, useState } from "react";
import styles from "./AppLayout.module.scss";
import ApplicationPanelContext from "./panel/ApplicationPanelContext.tsx";

const AppLayout: React.FC = () => {
  const isStandalone = new URLSearchParams(window.location.search).has("standalone");

  const [applicationDisplayName, setApplicationDisplayName] = useState<string>("");
  const [applicationIcon, setApplicationIcon] = useState<string>("");
  const [controls, setControls] = useState<React.ReactNode>(<></>);
  const [onBackButton, setOnBackButton] = useState<() => void>(() => {});
  const [showBackButton, setShowBackButton] = useState<boolean>(false);

  // Standalone mode displays only the application and not the Panel
  if (isStandalone) {
    return (
      <div className={styles.applicationFrame}>
        <Outlet />
      </div>
    );
  }

  return (
    <ApplicationPanelContext.Provider
      value={{
        setApplicationDisplayName: (displayName) => {
          setApplicationDisplayName(displayName);
        },
        setApplicationIcon: (applicationIcon) => {
          setApplicationIcon(applicationIcon);
        },
        setControls: (controls) => {
          setControls(controls);
        },
        setOnBackButton: (cb) => {
          setOnBackButton(cb);
        },
        setShowBackButton: (showBackButton) => {
          setShowBackButton(showBackButton);
        },
      }}
    >
      <PanelLayout
        applicationDisplayName={applicationDisplayName}
        applicationIcon={applicationIcon}
        controls={controls}
        onBackButton={onBackButton}
        showBackButton={showBackButton}
      />
    </ApplicationPanelContext.Provider>
  );
};

export default AppLayout;
