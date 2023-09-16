/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { SideBar } from "web-client/src/ui";
import { useNavigate } from "react-router-dom";
import GlobalDbApplication from "applications/global_db/frontend/globalDbApplication";
import YourDevHome from "./YourDevHome";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

const YourDevApplication: React.FC = () => {
  const [page, setPage] = React.useState<"home" | "global_db" | "user_db">( "home" );
  
  return (
    <main className={"h-full grid grid-cols-[auto,1fr]"}>
      <SideBar
        title={"YourDash Demo Application"}
        items={[
          {
            label: "Home",
            icon: YourDashIcon.Home,
            onClick: () => {
              setPage( "home" );
            }
          },
          {
            label: "Global DB",
            icon: YourDashIcon.Database,
            onClick: () => {
              setPage( "global_db" );
            }
          },
          {
            label: "User DB",
            icon: YourDashIcon.Person,
            onClick: () => {
              setPage( "user_db" );
            }
          }
        ]}
      />
      {page === "home" && <YourDevHome/>}
      {page === "global_db" && <GlobalDbApplication/>}
      {page === "user_db" && null}
    
    </main>
  );
};

export default YourDevApplication;
