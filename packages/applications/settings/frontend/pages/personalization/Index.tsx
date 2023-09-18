/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import * as React from "react";
import SettingCategoryComponent from "../../components/SettingCategoryComponent";
import BasePageLayout from "../../components/BasePageLayout";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

const Index: React.FC = () => (
  <BasePageLayout
    title={"Personalization"}
  >
    <SettingCategoryComponent
      href={"/app/a/settings/personalization/panel"}
      description={"Customize your panel"}
      title={"Panel"}
      icon={YourDashIcon.Paintbrush}
    />
    <SettingCategoryComponent
      href={"/app/a/settings/personalization/dashboard"}
      description={"Customize your dashboard"}
      title={"Dashboard"}
      icon={YourDashIcon.Paintbrush}
    />
    <SettingCategoryComponent
      href={"/app/a/settings/personalization/profile"}
      description={"Personalize your profile"}
      title={"Profile"}
      icon={YourDashIcon.Login}
    />
    <SettingCategoryComponent
      href={"/app/a/settings/personalization/theme"}
      description={"Customize the look of YourDash"}
      title={"Theme"}
      icon={YourDashIcon.Accessibility}
    />
  </BasePageLayout>
);

export default Index;
