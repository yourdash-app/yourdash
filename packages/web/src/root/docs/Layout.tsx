/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary.ts";
import SideBar, { SIDEBAR_ITEM_TYPE, SIDEBAR_STATE } from "@yourdash/chiplet/components/sideBar/SideBar.tsx";
import Heading from "@yourdash/uikit/components/heading/heading.tsx";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DocsLayout: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main className={"grid grid-cols-[auto,1fr] grid-rows-[auto,1fr] h-full w-full"}>
      <div className={"col-span-2 w-full h-max flex items-center justify-center p-2 bg-red-400 text-black"}>
        <Heading
          level={2}
          text={"YourDash Docs are mid-refactor and are incomplete."}
        />
      </div>
      <SideBar
        defaultState={SIDEBAR_STATE.NormalExpanded}
        title={"Docs"}
        items={[
          {
            type: SIDEBAR_ITEM_TYPE.Button,
            icon: UKIcon.Home,
            label: "Overview",
            onClick() {
              navigate("/docs/");
            },
          },
          {
            type: SIDEBAR_ITEM_TYPE.Button,
            icon: UKIcon.Info,
            label: "Get Started",
            onClick() {
              navigate("/docs/faq");
            },
          },
          {
            type: SIDEBAR_ITEM_TYPE.Button,
            icon: UKIcon.Accessibility,
            label: "Translation",
            onClick() {
              navigate("/docs/translation");
            },
          },
        ]}
      />
      <Outlet />
    </main>
  );
};

export default DocsLayout;
