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
import { modulePath } from "./meta.yourdash";

const SettingsLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <SidebarContainer showSidebarByDefault>
      <Sidebar>
        <Heading
          level={2}
          text={"Settings"}
        />
        <Separator direction={"column"} />
        <Button
          text={"Home"}
          onClick={() => navigate(`${modulePath}/`)}
        />
        <Button
          text={"Personalisation"}
          onClick={() => navigate(`${modulePath}/personalization`)}
        />
        <Button
          text={"Login Sessions"}
          onClick={() => navigate(`${modulePath}/session`)}
        />
        <Button
          text={"Administrator Tools"}
          onClick={() => navigate(`${modulePath}/admin`)}
        />
        <Button
          text={"Developer Tools"}
          onClick={() => navigate(`${modulePath}/developer`)}
        />
        <Separator direction={"column"} />
        <Heading
          text={"Dev"}
          level={4}
        />
        <Button
          text={"Test Category"}
          onClick={() => navigate(`${modulePath}/cat/test`)}
        />
        <Button
          text={"Test Solo Setting"}
          onClick={() => navigate(`${modulePath}/cat/test/test-setting`)}
        />
      </Sidebar>
      <Outlet />
    </SidebarContainer>
  );
};

export default SettingsLayout;
