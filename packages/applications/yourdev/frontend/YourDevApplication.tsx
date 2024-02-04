/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { SideBar } from "@yourdash/web-client/src/ui";
import { useNavigate } from "react-router-dom";
import GlobalDbApplication from "@yourdash/applications/global_db/frontend/globalDbApplication";
import { SIDEBAR_ITEM_TYPE, SIDEBAR_STATE } from "@yourdash/web-client/src/ui/components/sideBar/SideBar";
import HomeView from "./views/home/HomeView";
import { YourDashIcon } from "@yourdash/web-client/src/ui/components/icon/iconDictionary";

const YourDevApplication: React.FC = () => {
  const [page, setPage] = React.useState<"home" | "global_db" | "user_db">("home");

  return (
    <main className={"h-full grid grid-cols-[auto,1fr] overflow-hidden gap-4 p-4 bg-bg"}>
      <SideBar
        title={"YourDev"}
        defaultState={SIDEBAR_STATE.FloatingMinimised}
        items={[
          {
            type: SIDEBAR_ITEM_TYPE.Button,
            label: "Home",
            icon: YourDashIcon.Home,
            onClick: () => {
              setPage("home");
            },
          },
          {
            type: SIDEBAR_ITEM_TYPE.Button,
            label: "Global DB",
            icon: YourDashIcon.Database,
            onClick: () => {
              setPage("global_db");
            },
          },
          {
            type: SIDEBAR_ITEM_TYPE.Button,
            label: "User DB",
            icon: YourDashIcon.Person,
            onClick: () => {
              setPage("user_db");
            },
          },
        ]}
      />
      {page === "home" && <HomeView />}
      {page === "global_db" && <GlobalDbApplication />}
      {page === "user_db" && null}
    </main>
  );
};

export default YourDevApplication;
