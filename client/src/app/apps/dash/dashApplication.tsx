import React, {useEffect, useState} from "react";
import csi from "helpers/csi";
import useTranslate from "../../../helpers/l10n";
import BrowserLayout from "./layouts/browser/BrowserLayout";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";

const DashApplication: React.FC = () => {
  const trans = useTranslate("dash");
  const [userFullName, setUserFullName] = useState({
    first: "",
    last: ""
  });
  const [userName, setUserName] = useState("");
  const [layout, setLayout] = useState<"browser" | "dashboard">("dashboard");

  useEffect(() => {
    csi.getJson("/app/dash/user-full-name", res => {
      setUserFullName(res);
    });

    setUserName(localStorage.getItem("username") || "ERROR");
  }, []);

  if (userFullName.first === "" && userFullName.last === "") {
    return null;
  }

  switch (layout) {
    case "browser":
      return (
        <BrowserLayout
          username={userName}
          fullName={userFullName}
        />
      );
    case "dashboard":
      return (
        <DashboardLayout
          username={userName}
          fullName={userFullName}
        />
      );
    default:
      return null;
  }
};

export default DashApplication;
