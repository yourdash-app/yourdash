/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary";
import * as React from "react";
import SettingCategoryComponent from "./components/SettingCategoryComponent";
import BasePageLayout from "./components/BasePageLayout";

const SettingsApplication: React.FC = () => {
  return (
    <BasePageLayout
      noBack
      title={"YourDash Settings"}
    >
      <SettingCategoryComponent
        href={"/app/a/uk-ewsgit-settings/profile"}
        description={"Manage your user profile"}
        title={"Profile"}
        icon={UKIcon.Person}
      />
      <SettingCategoryComponent
        href={"/app/a/uk-ewsgit-settings/personalization"}
        description={"Customize your experience"}
        title={"Personalization"}
        icon={UKIcon.Paintbrush}
      />
      <SettingCategoryComponent
        href={"/app/a/uk-ewsgit-settings/session"}
        description={"Manage your login sessions"}
        title={"Login sessions"}
        icon={UKIcon.Login}
      />
      <SettingCategoryComponent
        href={"/app/a/uk-ewsgit-settings/accessibility"}
        description={"Toggle QOL features"}
        title={"Accessibility"}
        icon={UKIcon.Accessibility}
      />
      <SettingCategoryComponent
        href={"/app/a/uk-ewsgit-settings/admin"}
        description={"Hiya, Admin 👋"}
        title={"Admin tools"}
        icon={UKIcon.Tools}
      />
      <SettingCategoryComponent
        href={"/app/a/uk-ewsgit-settings/developer"}
        description={"For development purposes only"}
        title={"Developer tools"}
        icon={UKIcon.Tools}
      />
    </BasePageLayout>
  );
};

export default SettingsApplication;
