/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Icon from "@yourdash/uikit/components/icon/icon.js";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.js";
import DecrementLevel from "@yourdash/uikit/core/decrementLevel.js";
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
    <DecrementLevel>
      <div className={styles.widgetContainer}>
        <button
          aria-label={"Application Launcher"}
          className={styles.launcherButton}
          onClick={() => setLauncherVisible(!launcherVisible)}
        >
          <Icon
            icon={UKIcon.AppLauncher}
            className={styles.launcherButtonIcon}
          />
        </button>
        <ApplicationLauncher
          side={side}
          visible={launcherVisible}
        />
      </div>
    </DecrementLevel>
  );
};

export default ApplicationLauncherWidget;
