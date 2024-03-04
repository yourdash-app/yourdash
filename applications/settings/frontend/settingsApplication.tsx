/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { YourDashIcon } from "@yourdash/uikit/depChiplet/components/icon/iconDictionary";
import * as React from "react";
import SettingCategoryComponent from "./components/SettingCategoryComponent";
import BasePageLayout from "./components/BasePageLayout";

const SettingsApplication: React.FC = () => {
  return (
    <BasePageLayout noBack title={"YourDash Settings"}>
      <SettingCategoryComponent
        href={"/app/a/settings/profile"}
        description={"Manage your user profile"}
        title={"Profile"}
        icon={YourDashIcon.Person}
      />
      <SettingCategoryComponent
        href={"/app/a/settings/personalization"}
        description={"Customize your experience"}
        title={"Personalization"}
        icon={YourDashIcon.Paintbrush}
      />
      <SettingCategoryComponent
        href={"/app/a/settings/session"}
        description={"Manage your login sessions"}
        title={"Login sessions"}
        icon={YourDashIcon.Login}
      />
      <SettingCategoryComponent
        href={"/app/a/settings/accessibility"}
        description={"Toggle QOL features"}
        title={"Accessibility"}
        icon={YourDashIcon.Accessibility}
      />
      <SettingCategoryComponent
        href={"/app/a/settings/admin"}
        description={"Hiya, Admin 👋"}
        title={"Admin tools"}
        icon={YourDashIcon.Tools}
      />
      <SettingCategoryComponent
        href={"/app/a/settings/developer"}
        description={"For development purposes only"}
        title={"Developer tools"}
        icon={YourDashIcon.Tools}
      />
    </BasePageLayout>
  );
};

export default SettingsApplication;
