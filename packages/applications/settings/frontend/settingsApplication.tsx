/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import * as React from "react";
import { Card } from "web-client/src/ui";
import csi from "web-client/src/helpers/csi";
import Panel from "web-client/src/app/panel/Panel";
import SettingsSectionPanelPosition from "./sections/SettingsSectionPanelPosition";
import SettingCategoryComponent from "./components/SettingCategoryComponent";
import BasePageLayout from "./components/BasePageLayout";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

const SettingsApplication: React.FC = () => {
  return <BasePageLayout
    noBack
    title={"YourDash Settings"}
  >
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
};

export default SettingsApplication;
