/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.ts";
import TextInput from "@yourdash/uikit/components/textInput/textInput.tsx";
import React, { useEffect } from "react";
import IPanelApplicationsLauncherFrontendModule from "@yourdash/shared/core/panel/applicationsLauncher/application.ts";
import LargeApplicationGrid from "./LargeGrid/LargeApplicationGrid.tsx";
import styles from "./Applications.module.scss";
import { useNavigate } from "react-router";
import SmallApplicationGrid from "./SmallGrid/SmallApplicationGrid.tsx";
import ApplicationList from "./List/ApplicationList.tsx";

let filteredApplications: IPanelApplicationsLauncherFrontendModule[] = [];

const ApplicationsLauncherApplications: React.FC<{
  apps: IPanelApplicationsLauncherFrontendModule[];
  layout: "large-grid" | "small-grid" | "list";
}> = ({ apps, layout }) => {
  const navigate = useNavigate();
  const [applications, setApplications] = React.useState<IPanelApplicationsLauncherFrontendModule[]>(apps);

  useEffect(() => {
    setApplications(apps);

    // for development purposes only
    // setLayout( "list" )
  }, [apps]);

  return (
    <>
      <TextInput
        accessibleName={"Search Applications"}
        placeholder={"Search Applications"}
        className={clippy(styles.searchBar, "top-0 sticky z-10")}
        onEnter={() => {
          if (filteredApplications.length === 1) {
            navigate(`/app/a/${filteredApplications[0].displayName}`);
          }
        }}
        onChange={(val) => {
          filteredApplications = apps.filter((application) => {
            return (
              application.displayName.toLowerCase().includes(val.toLowerCase()) ||
              application.description.toLowerCase().includes(val.toLowerCase()) ||
              application.displayName.toLowerCase().includes(val.toLowerCase())
            );
          });

          setApplications(filteredApplications);
        }}
        icon={UKIcon.Search}
      />

      {layout === "large-grid" && <LargeApplicationGrid modules={applications} />}
      {layout === "small-grid" && <SmallApplicationGrid applications={applications} />}
      {layout === "list" && <ApplicationList applications={applications} />}
    </>
  );
};

export default ApplicationsLauncherApplications;
