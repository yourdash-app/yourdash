/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import * as React from "react";
import csi from "web-client/src/helpers/csi";
import useTranslate from "web-client/src/helpers/i18n";
import loadable from "@loadable/component";
import { IconButton, YourDashIcon } from "web-client/src/ui/index";
import { useNavigate } from "react-router";

const DashboardLayout = loadable(
  () => import("./layouts/dashboard/DashboardLayout"),
);
const BrowserLayout = loadable(() => import("./layouts/browser/BrowserLayout"));

const DashApplication: React.FC = () => {
  const navigate = useNavigate();
  const [userFullName, setUserFullName] = React.useState({
    first: "",
    last: "",
  });
  const [userName, setUserName] = React.useState("");
  const [layout, setLayout] = React.useState<"browser" | "dashboard">(
    "dashboard",
  );

  React.useEffect(() => {
    csi.getJson("/app/dash/user-full-name", (res) => {
      setUserFullName(res);
    });

    setUserName(localStorage.getItem("username") || "ERROR");
    setLayout(
      csi.userDB.get("dash:useBrowserLayout") ? "browser" : "dashboard",
    );
  }, []);

  if (userFullName.first === "" && userFullName.last === "") {
    return null;
  }

  return (
    <div
      className={"overflow-hidden bg-cover bg-center h-full w-full"}
      style={{
        backgroundImage: `url(${localStorage.getItem(
          "current_server",
        )}/login/instance/background)`,
      }}
    >
      {layout === "dashboard" ? (
        <DashboardLayout username={userName} fullName={userFullName} />
      ) : (
        <>
          <IconButton
            icon={YourDashIcon.Gear}
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
