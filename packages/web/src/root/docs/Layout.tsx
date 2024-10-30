/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import ButtonWithIcon from "@yourdash/uikit/src/components/buttonWithIcon/buttonWithIcon.tsx";
import Heading from "@yourdash/uikit/src/components/heading/heading.tsx";
import { UKIcon } from "@yourdash/uikit/src/components/icon/iconDictionary.ts";
import Sidebar from "@yourdash/uikit/src/views/sidebar/Sidebar.tsx";
import SidebarContainer from "@yourdash/uikit/src/views/sidebar/SidebarContainer";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DocsLayout: React.FC = () => {
  const navigate = useNavigate();
  return (
    <SidebarContainer>
      <div className={"col-span-2 w-full h-max flex items-center justify-center p-2 bg-red-400 text-black"}>
        <Heading
          level={2}
          text={"YourDash Docs are mid-refactor and are incomplete."}
        />
      </div>
      <Sidebar>
        <Heading
          level={2}
          text={"Docs"}
        />
        <ButtonWithIcon
          icon={UKIcon.Home}
          text={"Home"}
          onClick={() => {
            navigate("/docs/");
          }}
        />
        <ButtonWithIcon
          icon={UKIcon.Info}
          text={"Get Started"}
          onClick={() => {
            navigate("/docs/get-started");
          }}
        />
        <ButtonWithIcon
          icon={UKIcon.Accessibility}
          text={"Translation"}
          onClick={() => {
            navigate("/docs/translation");
          }}
        />
      </Sidebar>
      <Outlet />
    </SidebarContainer>
  );
};

export default DocsLayout;
