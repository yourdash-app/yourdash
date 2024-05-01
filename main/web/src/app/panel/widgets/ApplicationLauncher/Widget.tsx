/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.js";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton.js";
import React, { useEffect } from "react";
import styles from "./Widget.module.scss";
import ApplicationLauncher from "./launcher/Launcher";
import { useLocation } from "react-router";

const ApplicationLauncherWidget: React.FC<{ side: "top" | "right" | "bottom" | "left" }> = ({ side }) => {
  const [launcherVisible, setLauncherVisible] = React.useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setLauncherVisible(false);
  }, [location]);

  return (
    <div className={styles.widgetContainer}>
      <IconButton
        accessibleLabel="Application Launcher"
        icon={UKIcon.AppLauncher}
        className={styles.launcherButton}
        onClick={() => setLauncherVisible(!launcherVisible)}
      />
      <ApplicationLauncher
        side={side}
        visible={launcherVisible}
      />
    </div>
  );
};

export default ApplicationLauncherWidget;
