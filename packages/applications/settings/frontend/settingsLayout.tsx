/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SideBar } from "web-client/src/ui";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";
import { SideBarItemType, SideBarState } from "web-client/src/ui/components/sideBar/SideBar";

const SettingsLayout: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <main className={"grid grid-cols-1 grid-rows-[auto,1fr] md:grid-rows-none md:grid-cols-[auto,1fr] h-full w-full bg-bg"}>
      <SideBar
        defaultState={SideBarState.NormalMinimised}
        title={"Settings"}
        items={[
          {
            type: SideBarItemType.Button,
            icon: YourDashIcon.Home,
            label: "Home",
            onClick() {
              navigate( "/app/a/settings/" );
            }
          },
          {
            type: SideBarItemType.Button,
            icon: YourDashIcon.Paintbrush,
            label: "Personalization",
            onClick() {
              navigate( "/app/a/settings/personalization" );
            }
          },
          {
            type: SideBarItemType.Button,
            icon: YourDashIcon.Login,
            label: "Login sessions",
            onClick() {
              navigate( "/app/a/settings/session" );
            }
          },
          {
            type: SideBarItemType.Button,
            icon: YourDashIcon.Accessibility,
            label: "Accessibility",
            onClick() {
              navigate( "/app/a/settings/accessibility" );
            }
          },
          {
            type: SideBarItemType.Button,
            icon: YourDashIcon.Tools,
            label: "Admin tools",
            onClick() {
              navigate( "/app/a/settings/admin" );
            }
          }
        ]}
      />
      <Outlet/>
    </main>
  );
};

export default SettingsLayout;
