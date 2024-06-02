/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary";
import Button from "@yourdash/uikit/components/button/button";
import Heading from "@yourdash/uikit/components/heading/heading";
import Separator from "@yourdash/uikit/components/separator/separator";
import SideBar from "@yourdash/uikit/views/sideBar/SideBar";
import SidebarContainer from "@yourdash/uikit/views/sidebar/SidebarContainer";
import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const SettingsLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    // <main className={"grid grid-cols-1 grid-rows-[auto,1fr] md:grid-rows-none md:grid-cols-[auto,1fr] h-full w-full bg-bg"}>
    //   <SideBar
    //     defaultState={SIDEBAR_STATE.NormalMinimised}
    //     title={"Settings"}
    //     items={[
    //       {
    //         type: SIDEBAR_ITEM_TYPE.Button,
    //         icon: UKIcon.Home,
    //         label: "Home",
    //         onClick() {
    //           navigate("/app/a/settings/");
    //         },
    //       },
    //       {
    //         type: SIDEBAR_ITEM_TYPE.Button,
    //         icon: UKIcon.Paintbrush,
    //         label: "Personalization",
    //         onClick() {
    //           navigate("/app/a/settings/personalization");
    //         },
    //       },
    //       {
    //         type: SIDEBAR_ITEM_TYPE.Button,
    //         icon: UKIcon.Login,
    //         label: "Login sessions",
    //         onClick() {
    //           navigate("/app/a/settings/session");
    //         },
    //       },
    //       {
    //         type: SIDEBAR_ITEM_TYPE.Button,
    //         icon: UKIcon.Accessibility,
    //         label: "Accessibility",
    //         onClick() {
    //           navigate("/app/a/settings/accessibility");
    //         },
    //       },
    //       {
    //         type: SIDEBAR_ITEM_TYPE.Button,
    //         icon: UKIcon.Tools,
    //         label: "Admin tools",
    //         onClick() {
    //           navigate("/app/a/settings/admin");
    //         },
    //       },
    //     ]}
    //   />
    //   <Outlet />
    // </main>
    <SidebarContainer showSidebarByDefault>
      <SideBar>
        <Heading
          level={2}
          text={"Settings"}
        />
        <Separator direction={"column"} />
        <Button
          text={"Home"}
          onClick={() => navigate("/app/a/settings/")}
        />
        <Button
          text={"Personalisation"}
          onClick={() => navigate("/app/a/settings/personalization")}
        />
        <Button
          text={"Login Sessions"}
          onClick={() => navigate("/app/a/settings/session")}
        />
        <Button
          text={"Administrator Tools"}
          onClick={() => navigate("/app/a/settings/admin")}
        />
        <Button
          text={"Developer Tools"}
          onClick={() => navigate("/app/a/settings/developer")}
        />
      </SideBar>
      <Outlet />
    </SidebarContainer>
  );
};

export default SettingsLayout;
