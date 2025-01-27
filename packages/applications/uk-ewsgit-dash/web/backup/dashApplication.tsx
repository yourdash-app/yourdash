/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { UKIcon } from "@yourdash/uikit/src/components/icon/iconDictionary.ts";
import IconButton from "@yourdash/uikit/src/components/iconButton/iconButton.tsx";
import * as React from "react";
import coreCSI from "@yourdash/csi/coreCSI";
import loadable from "@loadable/component";
import { useNavigate } from "react-router-dom";
import { acsi, modulePath } from "../meta.yourdash";

const DashboardLayout = loadable(() => import("./layouts/dashboard/DashboardLayout"));
// TODO: recreate the browserLayout
// const BrowserLayout = loadable(() => import("./layouts/browser/BrowserLayout"));

const DashApplication: React.FC = () => {
  const navigate = useNavigate();
  const [userFullName, setUserFullName] = React.useState({
    first: "",
    last: "",
  });
  const [userName, setUserName] = React.useState("");
  const [layout, setLayout] = React.useState<"browser" | "dashboard">("dashboard");

  React.useEffect(() => {
    acsi.syncGetJson("/user-full-name", {}, (res) => {
      setUserFullName(res);
    });

    setUserName(localStorage.getItem("username") || "ERROR");
    setLayout(coreCSI.userDB.get("dash:useBrowserLayout") ? "browser" : "dashboard");
  }, []);

  if (userFullName.first === "" && userFullName.last === "") {
    return null;
  }

  return (
    <div
      className={"overflow-hidden bg-cover bg-center h-full w-full"}
      style={{
        backgroundImage: `url(${coreCSI.getInstanceUrl()}/login/instance/background)`,
      }}
    >
      {layout === "dashboard" ? (
        <DashboardLayout
          username={userName}
          fullName={userFullName}
        />
      ) : (
        <>
          <IconButton
            accessibleLabel={"Hello world"}
            icon={UKIcon.Gear}
            onClick={() => {
              navigate(`${modulePath}/personalization/dashboard`);
            }}
          />
          "Browser Layout is temporarily disabled"
        </>
      )}
    </div>
  );
};

export default DashApplication;
