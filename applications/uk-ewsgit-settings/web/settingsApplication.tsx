/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "packages/uikit/src/core/iconDictionary.ts";
import * as React from "react";
import SettingCategoryComponent from "./components/SettingCategoryComponent";
import BasePageLayout from "./components/BasePageLayout";
import { modulePath } from "./meta.yourdash";

const SettingsApplication: React.FC = () => {
  return (
    <BasePageLayout
      noBack
      title={"YourDash Settings"}
    >
      <SettingCategoryComponent
        href={`${modulePath}/profile`}
        description={"Manage your user profile"}
        title={"Profile"}
        icon={UKIcon.Person}
      />
      <SettingCategoryComponent
        href={`${modulePath}/personalization`}
        description={`Customize your experience`}
        title={`Personalization`}
        icon={UKIcon.Paintbrush}
      />
      <SettingCategoryComponent
        href={`${modulePath}/session`}
        description={`Manage your login sessions`}
        title={`Login sessions`}
        icon={UKIcon.Login}
      />
      <SettingCategoryComponent
        href={`${modulePath}/accessibility`}
        description={`Toggle QOL features`}
        title={`Accessibility`}
        icon={UKIcon.Accessibility}
      />
      <SettingCategoryComponent
        href={`${modulePath}/admin`}
        description={`Hiya, Admin 👋`}
        title={`Admin tools`}
        icon={UKIcon.Tools}
      />
      <SettingCategoryComponent
        href={`${modulePath}/developer`}
        description={`For development purposes only`}
        title={`Developer tools`}
        icon={UKIcon.Tools}
      />
    </BasePageLayout>
  );
};

export default SettingsApplication;
