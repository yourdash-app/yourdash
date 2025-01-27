/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import useResource from "@yourdash/csi/useResource.ts";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import UKIconButton from "@yourdash/uikit/src/components/iconButton/UKIconButton.js";
import { useNavigate } from "react-router-dom";
import styles from "./Launcher.module.scss";
import React, { memo } from "react";
import ApplicationsLauncherApplications from "./Applications/Applications.tsx";
import coreCSI from "@yourdash/csi/coreCSI.ts";
import UKBox from "@yourdash/uikit/src/components/box/UKBox.js";
import { UKIcons } from "@yourdash/uikit/src/core/iconDictionary.js";

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
      <UKBox className={styles.content}>
        <ApplicationsLauncherApplications
          // @ts-ignore
          apps={apps || []}
          layout={layout}
        />
      </UKBox>
      <UKBox className={styles.footer}>
        <UKIconButton
          accessibleLabel={"Logout"}
          className={styles.logoutButton}
          icon={UKIcons.Logout}
          onClick={() => {
            coreCSI.logout();
            navigate("/login");
          }}
        />
        {/* TODO: replace with a custom button with the user's avatar */}
        <UKIconButton
          accessibleLabel={"Profile"}
          icon={UKIcons.Person}
          aria-label={"User Profile Settings"}
          onClick={() => {
            navigate(`/profile/me`);
          }}
        />
        <span>{"Unknown First Name"}</span>
        <UKIconButton
          accessibleLabel={"Filter small grid"}
          className={"ml-auto"}
          icon={UKIcons.Filter}
          onClick={() => {
            setLayout("small-grid");
          }}
        />
        <UKIconButton
          accessibleLabel={"Filter large grid"}
          icon={UKIcons.Filter}
          onClick={() => {
            setLayout("large-grid");
          }}
        />
        <UKIconButton
          accessibleLabel={"Filter list"}
          icon={UKIcons.Filter}
          onClick={() => {
            setLayout("list");
          }}
        />
      </UKBox>
    </div>
  );
};

export default memo(ApplicationLauncher);
