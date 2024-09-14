/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import useResource from "@yourdash/csi/useResource.ts";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.ts";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton.tsx";
import Box from "@yourdash/uikit/components/box/box.tsx";
import { useNavigate } from "react-router-dom";
import styles from "./Launcher.module.scss";
import React, { memo } from "react";
import ApplicationsLauncherApplications from "./Applications/Applications.tsx";
import IPanelApplicationsLauncherFrontendModule from "@yourdash/shared/core/panel/applicationsLauncher/application.ts";
import coreCSI from "@yourdash/csi/coreCSI.ts";

const ApplicationLauncher: React.FC<{
  side: "top" | "right" | "bottom" | "left";
  visible: boolean;
}> = ({ side, visible }) => {
  const navigate = useNavigate();
  const apps = useResource<IPanelApplicationsLauncherFrontendModule[]>(() => coreCSI.getJson("/core/panel/applications"), []) || [];
  const [layout, setLayout] = React.useState<"large-grid" | "small-grid" | "list">("large-grid");

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
      <Box className={styles.content}>
        <ApplicationsLauncherApplications
          apps={apps}
          layout={layout}
        />
      </Box>
      <Box className={styles.footer}>
        <IconButton
          accessibleLabel={"Logout"}
          className={styles.logoutButton}
          icon={UKIcon.Logout}
          onClick={() => {
            coreCSI.logout();
            navigate("/login");
          }}
        />
        <div>
          <IconButton
            accessibleLabel={"Profile"}
            icon={UKIcon.Person}
            aria-label={"User Profile Settings"}
            onClick={() => {
              navigate(`/instance-profiles/me`);
            }}
          />
        </div>
        <span>{coreCSI.userDB.get<{ first: string; last: string }>("user:name")?.first || "Unknown First Name"}</span>
        <IconButton
          accessibleLabel={"Filter small grid"}
          className={"ml-auto"}
          icon={UKIcon.Filter}
          onClick={() => {
            setLayout("small-grid");
          }}
        />
        <IconButton
          accessibleLabel={"Filter large grid"}
          icon={UKIcon.Filter}
          onClick={() => {
            setLayout("large-grid");
          }}
        />
        <IconButton
          accessibleLabel={"Filter list"}
          icon={UKIcon.Filter}
          onClick={() => {
            setLayout("list");
          }}
        />
      </Box>
    </div>
  );
};

export default memo(ApplicationLauncher);
