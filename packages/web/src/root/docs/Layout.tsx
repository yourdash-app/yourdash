/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UK, { UKC, UKV } from "@yourdash/uikit";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DocsLayout: React.FC = () => {
  const navigate = useNavigate();
  return (
    <UKV.SidebarContainer>
      <div className={"col-span-2 w-full h-max flex items-center justify-center p-2 bg-red-400 text-black"}>
        <UKC.Heading
          level={2}
          text={"YourDash Docs are mid-refactor and are incomplete."}
        />
      </div>
      <UKV.Sidebar>
        <UKC.Heading
          level={2}
          text={"Docs"}
        />
        <UKC.ButtonWithIcon
          icon={UK.Core.Icons.Home}
          text={"Home"}
          onClick={() => {
            navigate("/docs/");
          }}
        />
        <UKC.ButtonWithIcon
          icon={UK.Core.Icons.Info}
          text={"Get Started"}
          onClick={() => {
            navigate("/docs/get-started");
          }}
        />
        <UKC.ButtonWithIcon
          icon={UK.Core.Icons.Accessibility}
          text={"Translation"}
          onClick={() => {
            navigate("/docs/translation");
          }}
        />
      </UKV.Sidebar>
      <Outlet />
    </UKV.SidebarContainer>
  );
};

export default DocsLayout;
