/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import { YourDashIcon } from "@yourdash/uikit/depChiplet/components/icon/iconDictionary";
import IconButton from "@yourdash/uikit/depChiplet/components/iconButton/IconButton";
import { useNavigate } from "react-router-dom";
import styles from "./Launcher.module.scss";
import React, { memo, useEffect, useState } from "react";
import ApplicationsLauncherApplications from "./Applications/Applications";
import IPanelApplicationsLauncherApplication from "@yourdash/shared/core/panel/applicationsLauncher/application";
import csi from "@yourdash/csi/csi";

const ApplicationLauncher: React.FC<{
  side: "top" | "right" | "bottom" | "left";
  visible: boolean;
}> = ({ side, visible }) => {
  const navigate = useNavigate();
  const [apps, setApps] = useState<IPanelApplicationsLauncherApplication[]>([]);
  const [layout, setLayout] = React.useState<"large-grid" | "small-grid" | "list">("large-grid");

  useEffect(() => {
    csi.getJson("/core/panel/applications", (data) => {
      setApps(data);
    });
  }, []);

  return (
    <div
      className={clippy(
        styles.applicationLauncher,
        side === "top" && `${styles.sideTop} animate__slideInLeft`,
        side === "right" && `${styles.sideRight} animate__slideInDown`,
        side === "bottom" && `${styles.sideBottom} animate__slideInLeft`,
        side === "left" && `${styles.sideLeft} animate__slideInDown`,
        "animate__animated animate__duration_500ms",
        !visible && styles.invisible,
      )}
    >
      <div className={styles.content}>
        <ApplicationsLauncherApplications apps={apps} layout={layout} />
      </div>
      <section className={styles.footer}>
        <IconButton
          className={styles.logoutButton}
          icon={YourDashIcon.Logout}
          onClick={() => {
            csi.logout();
            navigate("/login");
          }}
        />
        <div>
          <img src={""} alt={""} />
          <IconButton icon={YourDashIcon.Person} aria-label={"User Profile Settings"} />
        </div>
        <span>{csi.userDB.get("user:name")?.first || "Unknown First Name"}</span>
        <IconButton
          className={"ml-auto"}
          icon={YourDashIcon.Filter}
          onClick={() => {
            setLayout(layout === "large-grid" ? "small-grid" : layout === "small-grid" ? "list" : "large-grid");
          }}
        />
      </section>
    </div>
  );
};

export default memo(ApplicationLauncher);
