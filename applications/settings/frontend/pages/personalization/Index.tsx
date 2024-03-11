/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { YourDashIcon } from "@yourdash/uikit/depChiplet/components/icon/iconDictionary";
import * as React from "react";
import SettingCategoryComponent from "../../components/SettingCategoryComponent";
import BasePageLayout from "../../components/BasePageLayout";

const Index: React.FC = () => (
  <BasePageLayout title={"Personalization"}>
    <SettingCategoryComponent
      href={"/app/a/settings/personalization/panel"}
      description={"Customize your panel"}
      title={"Panel"}
      icon={YourDashIcon.Paintbrush}
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
