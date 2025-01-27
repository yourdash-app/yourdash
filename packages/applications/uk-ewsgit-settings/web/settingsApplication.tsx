/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import * as React from "react";
import SettingCategoryComponent from "./components/SettingCategoryComponent";
import BasePageLayout from "./components/BasePageLayout";
import { UKIcons } from "@yourdash/uikit/src/core/iconDictionary.js";

const SettingsApplication: React.FC = () => {
  return (
    <BasePageLayout
      noBack
      title={"YourDash Settings"}
    >
      <SettingCategoryComponent
        href={`/app/a/uk-ewsgit-settings/profile`}
        description={"Manage your user profile"}
        title={"Profile"}
        icon={UKIcons.Person}
      />
      <SettingCategoryComponent
        href={`/app/a/uk-ewsgit-settings/personalization`}
        description={`Customize your experience`}
        title={`Personalization`}
        icon={UKIcons.Paintbrush}
      />
      <SettingCategoryComponent
        href={`/app/a/uk-ewsgit-settings/session`}
        description={`Manage your login sessions`}
        title={`Login sessions`}
        icon={UKIcons.Login}
      />
      <SettingCategoryComponent
        href={`/app/a/uk-ewsgit-settings/accessibility`}
        description={`Toggle QOL features`}
        title={`Accessibility`}
        icon={UKIcons.Accessibility}
      />
      <SettingCategoryComponent
        href={`/app/a/uk-ewsgit-settings/admin`}
        description={`Hiya, Admin 👋`}
        title={`Admin tools`}
        icon={UKIcons.Tools}
      />
      <SettingCategoryComponent
        href={`/app/a/uk-ewsgit-settings/developer`}
        description={`For development purposes only`}
        title={`Developer tools`}
        icon={UKIcons.Tools}
      />
    </BasePageLayout>
  );
};

export default SettingsApplication;
