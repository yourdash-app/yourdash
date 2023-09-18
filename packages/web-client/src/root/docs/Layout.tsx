/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { SideBar } from "../../ui";
import { Outlet, useNavigate } from "react-router-dom";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

const DocsLayout: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main className={"grid grid-cols-[auto,1fr] h-full w-full"}>
      <SideBar
        expandedByDefault
        title={"Docs"}
        items={[
          {
            icon: YourDashIcon.Home,
            label: "Overview",
            onClick() {
              navigate( "/docs/" );
            }
          },
          {
            icon: YourDashIcon.Info,
            label: "Get Started",
            onClick() {
              navigate( "/docs/get-started" );
            }
          },
          {
            icon: YourDashIcon.Accessibility,
            label: "Translation",
            onClick() {
              navigate( "/docs/translation" );
            }
          }
        ]}
      />
      <Outlet/>
    </main>
  );
};

export default DocsLayout;
