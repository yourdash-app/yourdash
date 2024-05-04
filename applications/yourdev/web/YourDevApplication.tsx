/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary";
import SideBar, { SIDEBAR_ITEM_TYPE, SIDEBAR_STATE } from "@yourdash/chiplet/components/sideBar/SideBar";
import React from "react";
import GlobalDbApplication from "../../global_db/frontend/globalDbApplication";
import HomeView from "./views/home/HomeView";

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
            icon: UKIcon.Home,
            onClick: () => {
              setPage("home");
            },
          },
          {
            type: SIDEBAR_ITEM_TYPE.Button,
            label: "Global DB",
            icon: UKIcon.Database,
            onClick: () => {
              setPage("global_db");
            },
          },
          {
            type: SIDEBAR_ITEM_TYPE.Button,
            label: "User DB",
            icon: UKIcon.Person,
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
