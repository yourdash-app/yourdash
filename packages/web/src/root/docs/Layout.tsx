/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKButtonWithIcon from "@yourdash/uikit/src/components/buttonWithIcon/UKButtonWithIcon.js";
import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import { UKIcons } from "@yourdash/uikit/src/core/iconDictionary.js";
import UKSidebar from "@yourdash/uikit/src/views/sidebar/UKSidebar.js";
import UKSidebarContainer from "@yourdash/uikit/src/views/sidebar/UKSidebarContainer.js";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DocsLayout: React.FC = () => {
  const navigate = useNavigate();
  return (
    <UKSidebarContainer>
      <div className={"col-span-2 w-full h-max flex items-center justify-center p-2 bg-red-400 text-black"}>
        <UKHeading
          level={2}
          text={"YourDash Docs are mid-refactor and are incomplete."}
        />
      </div>
      <UKSidebar>
        <UKHeading
          level={2}
          text={"Docs"}
        />
        <UKButtonWithIcon
          icon={UKIcons.Home}
          text={"Home"}
          onClick={() => {
            navigate("/docs/");
          }}
        />
        <UKButtonWithIcon
          icon={UKIcons.Info}
          text={"Get Started"}
          onClick={() => {
            navigate("/docs/get-started");
          }}
        />
        <UKButtonWithIcon
          icon={UKIcons.Accessibility}
          text={"Translation"}
          onClick={() => {
            navigate("/docs/translation");
          }}
        />
      </UKSidebar>
      <Outlet />
    </UKSidebarContainer>
  );
};

export default DocsLayout;
