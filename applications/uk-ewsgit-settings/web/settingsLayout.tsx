/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { modulePath } from "./meta.yourdash";
import styles from "./settingsLayout.module.scss";
import UKSidebar from "@yourdash/uikit/views/sidebar/UKSidebar.js";
import UKSidebarContainer from "@yourdash/uikit/views/sidebar/UKSidebarContainer.js";
import UKHeading from "@yourdash/uikit/components/heading/UKHeading.js";
import UKButton from "@yourdash/uikit/components/button/UKButton.js";
import UKSeparator from "@yourdash/uikit/components/separator/UKSeparator.js";

const SettingsLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <UKSidebarContainer showSidebarByDefault>
      <UKSidebar>
        <UKHeading
          className={styles.alignLeft}
          level={3}
          text={"Settings"}
        />
        <UKSeparator direction={"column"} />
        <UKButton
          text={"Home"}
          onClick={() => navigate(`${modulePath}/`)}
        />
        <UKButton
          text={"Personalisation"}
          onClick={() => navigate(`${modulePath}/personalization`)}
        />
        <UKButton
          text={"Login Sessions"}
          onClick={() => navigate(`${modulePath}/session`)}
        />
        <UKButton
          text={"Administrator Tools"}
          onClick={() => navigate(`${modulePath}/admin`)}
        />
        <UKButton
          text={"Developer Tools"}
          onClick={() => navigate(`${modulePath}/developer`)}
        />
        <UKSeparator direction={"column"} />
        <UKHeading
          className={styles.alignLeft}
          text={"Dev"}
          level={4}
        />
        <UKButton
          text={"Test Category"}
          onClick={() => navigate(`${modulePath}/cat/test`)}
        />
        <UKButton
          text={"Test Solo Setting"}
          onClick={() => navigate(`${modulePath}/cat/test/test-setting`)}
        />
      </UKSidebar>
      <Outlet />
    </UKSidebarContainer>
  );
};

export default SettingsLayout;
