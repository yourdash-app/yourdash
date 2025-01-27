/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./settingsLayout.module.scss";
import UKSidebar from "@yourdash/uikit/src/views/sidebar/UKSidebar.js";
import UKSidebarContainer from "@yourdash/uikit/src/views/sidebar/UKSidebarContainer.js";
import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import UKButton from "@yourdash/uikit/src/components/button/UKButton.js";
import UKSeparator from "@yourdash/uikit/src/components/separator/UKSeparator.js";

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
          onClick={() => navigate(`/app/a/uk-ewsgit-settings/`)}
        />
        <UKButton
          text={"Personalisation"}
          onClick={() => navigate(`/app/a/uk-ewsgit-settings/personalization`)}
        />
        <UKButton
          text={"Login Sessions"}
          onClick={() => navigate(`/app/a/uk-ewsgit-settings/session`)}
        />
        <UKButton
          text={"Administrator Tools"}
          onClick={() => navigate(`/app/a/uk-ewsgit-settings/admin`)}
        />
        <UKButton
          text={"Developer Tools"}
          onClick={() => navigate(`/app/a/uk-ewsgit-settings/developer`)}
        />
        <UKSeparator direction={"column"} />
        <UKHeading
          className={styles.alignLeft}
          text={"Dev"}
          level={4}
        />
        <UKButton
          text={"Test Category"}
          onClick={() => navigate(`/app/a/uk-ewsgit-settings/cat/test`)}
        />
        <UKButton
          text={"Test Solo Setting"}
          onClick={() => navigate(`/app/a/uk-ewsgit-settings/cat/test/test-setting`)}
        />
      </UKSidebar>
      <Outlet />
    </UKSidebarContainer>
  );
};

export default SettingsLayout;
