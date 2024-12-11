/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import useResource from "@yourdash/csi/useResource.ts";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import { useNavigate } from "react-router-dom";
import styles from "./Launcher.module.scss";
import React, { memo } from "react";
import ApplicationsLauncherApplications from "./Applications/Applications.tsx";
import coreCSI from "@yourdash/csi/coreCSI.ts";
import UK, { UKC } from "@yourdash/uikit";

const ApplicationLauncher: React.FC<{
  side: "top" | "right" | "bottom" | "left";
  visible: boolean;
}> = ({ side, visible }) => {
  const navigate = useNavigate();
  const apps = useResource(() => coreCSI.getJson("/core/panel/applications", "/core/panel/applications"), []) || [];
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
      <UKC.Box className={styles.content}>
        <ApplicationsLauncherApplications
          // @ts-ignore
          apps={apps || []}
          layout={layout}
        />
      </UKC.Box>
      <UKC.Box className={styles.footer}>
        <UKC.IconButton
          accessibleLabel={"Logout"}
          className={styles.logoutButton}
          icon={UK.Core.Icons.Logout}
          onClick={() => {
            coreCSI.logout();
            navigate("/login");
          }}
        />
        <div>
          <UKC.IconButton
            accessibleLabel={"Profile"}
            icon={UK.Core.Icons.Person}
            aria-label={"User Profile Settings"}
            onClick={() => {
              navigate(`/instance-profiles/me`);
            }}
          />
        </div>
        <span>{coreCSI.userDB.get<{ first: string; last: string }>("user:name")?.first || "Unknown First Name"}</span>
        <UKC.IconButton
          accessibleLabel={"Filter small grid"}
          className={"ml-auto"}
          icon={UK.Core.Icons.Filter}
          onClick={() => {
            setLayout("small-grid");
          }}
        />
        <UKC.IconButton
          accessibleLabel={"Filter large grid"}
          icon={UK.Core.Icons.Filter}
          onClick={() => {
            setLayout("large-grid");
          }}
        />
        <UKC.IconButton
          accessibleLabel={"Filter list"}
          icon={UK.Core.Icons.Filter}
          onClick={() => {
            setLayout("list");
          }}
        />
      </UKC.Box>
    </div>
  );
};

export default memo(ApplicationLauncher);
