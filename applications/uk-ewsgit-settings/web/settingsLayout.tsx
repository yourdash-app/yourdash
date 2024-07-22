/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Button from "@yourdash/uikit/components/button/button";
import Heading from "@yourdash/uikit/components/heading/heading";
import Separator from "@yourdash/uikit/components/separator/separator";
import Sidebar from "@yourdash/uikit/views/sidebar/Sidebar";
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
      <Sidebar>
        <Heading
          level={2}
          text={"Settings"}
        />
        <Separator direction={"column"} />
        <Button
          text={"Home"}
          onClick={() => navigate("/app/a/uk-ewsgit-settings/")}
        />
        <Button
          text={"Personalisation"}
          onClick={() => navigate("/app/a/uk-ewsgit-settings/personalization")}
        />
        <Button
          text={"Login Sessions"}
          onClick={() => navigate("/app/a/uk-ewsgit-settings/session")}
        />
        <Button
          text={"Administrator Tools"}
          onClick={() => navigate("/app/a/uk-ewsgit-settings/admin")}
        />
        <Button
          text={"Developer Tools"}
          onClick={() => navigate("/app/a/uk-ewsgit-settings/developer")}
        />
        <Separator direction={"column"} />
        <Heading
          text={"Dev"}
          level={4}
        />
        <Button
          text={"Test Category"}
          onClick={() => navigate("/app/a/uk-ewsgit-settings/cat/test")}
        />
        <Button
          text={"Test Solo Setting"}
          onClick={() => navigate("/app/a/uk-ewsgit-settings/cat/test/test-setting")}
        />
      </Sidebar>
      <Outlet />
    </SidebarContainer>
  );
};

export default SettingsLayout;
