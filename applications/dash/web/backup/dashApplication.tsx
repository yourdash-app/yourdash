/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary";
import IconButton from "@yourdash/chiplet/components/iconButton/IconButton";
import * as React from "react";
import csi from "@yourdash/csi/csi";
import loadable from "@loadable/component";
import { useNavigate } from "react-router-dom";

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
    csi.syncGetJson("/app/dash/user-full-name", (res) => {
      setUserFullName(res);
    });

    setUserName(localStorage.getItem("username") || "ERROR");
    setLayout(csi.userDB.get("dash:useBrowserLayout") ? "browser" : "dashboard");
  }, []);

  if (userFullName.first === "" && userFullName.last === "") {
    return null;
  }

  return (
    <div
      className={"overflow-hidden bg-cover bg-center h-full w-full"}
      style={{
        backgroundImage: `url(${csi.getInstanceUrl()}/login/instance/background)`,
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
            icon={UKIcon.Gear}
            onClick={() => {
              navigate("/app/a/settings/personalization/dashboard");
            }}
          />
          "Browser Layout is temporarily disabled"
        </>
      )}
    </div>
  );
};

export default DashApplication;
