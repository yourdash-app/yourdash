/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { modulePath } from "./meta.yourdash";
import { UKC, UKV } from "@yourdash/uikit";
import styles from "./settingsLayout.module.scss";

const SettingsLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <UKV.SidebarContainer showSidebarByDefault>
      <UKV.Sidebar>
        <UKC.Heading
          className={styles.alignLeft}
          level={3}
          text={"Settings"}
        />
        <UKC.Separator direction={"column"} />
        <UKC.Button
          text={"Home"}
          onClick={() => navigate(`${modulePath}/`)}
        />
        <UKC.Button
          text={"Personalisation"}
          onClick={() => navigate(`${modulePath}/personalization`)}
        />
        <UKC.Button
          text={"Login Sessions"}
          onClick={() => navigate(`${modulePath}/session`)}
        />
        <UKC.Button
          text={"Administrator Tools"}
          onClick={() => navigate(`${modulePath}/admin`)}
        />
        <UKC.Button
          text={"Developer Tools"}
          onClick={() => navigate(`${modulePath}/developer`)}
        />
        <UKC.Separator direction={"column"} />
        <UKC.Heading
          className={styles.alignLeft}
          text={"Dev"}
          level={4}
        />
        <UKC.Button
          text={"Test Category"}
          onClick={() => navigate(`${modulePath}/cat/test`)}
        />
        <UKC.Button
          text={"Test Solo Setting"}
          onClick={() => navigate(`${modulePath}/cat/test/test-setting`)}
        />
      </UKV.Sidebar>
      <Outlet />
    </UKV.SidebarContainer>
  );
};

export default SettingsLayout;
