/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Button from "@yourdash/uikit/src/components/button/button.tsx";
import ButtonWithIcon from "@yourdash/uikit/src/components/buttonWithIcon/buttonWithIcon.tsx";
import { UKIcon } from "@yourdash/uikit/src/components/icon/iconDictionary.ts";
import Sidebar from "@yourdash/uikit/src/views/sidebar/sidebar.tsx";
import SidebarContainer from "@yourdash/uikit/src/views/sidebar/sidebarContainer.tsx";
import React from "react";
import GlobalDbApplication from "../../uk-ewsgit-globaldb/web/globalDbApplication.tsx";
import HomeView from "./views/home/HomeView";

const YourDevApplication: React.FC = () => {
  const [page, setPage] = React.useState<"home" | "global_db" | "user_db">("home");

  return (
    <main className={"h-full grid grid-cols-[auto,1fr] overflow-hidden gap-4 p-4 bg-bg"}>
      <SidebarContainer>
        <Sidebar>
          <ButtonWithIcon
            onClick={() => {
              setPage("home");
            }}
            icon={UKIcon.Home}
            text={"Home"}
          />
          <ButtonWithIcon
            onClick={() => {
              setPage("global_db");
            }}
            icon={UKIcon.Database}
            text={"Global DB"}
          />
          <ButtonWithIcon
            onClick={() => {
              setPage("user_db");
            }}
            icon={UKIcon.Person}
            text={"User DB"}
          />
        </Sidebar>
        {page === "home" && <HomeView />}
        {page === "global_db" && <GlobalDbApplication />}
        {page === "user_db" && null}
      </SidebarContainer>
    </main>
  );
};

export default YourDevApplication;
