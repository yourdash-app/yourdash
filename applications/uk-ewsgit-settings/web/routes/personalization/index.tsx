/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary";
import * as React from "react";
import SettingCategoryComponent from "../../components/SettingCategoryComponent";
import BasePageLayout from "../../components/BasePageLayout";

const Index: React.FC = () => (
  <BasePageLayout title={"Personalization"}>
    <SettingCategoryComponent
      href={"/app/a/uk-ewsgit-settings/personalization/panel"}
      description={"Customize your panel"}
      title={"Panel"}
      icon={UKIcon.Paintbrush}
    />
    <SettingCategoryComponent
      href={"/app/a/uk-ewsgit-settings/personalization/theme"}
      description={"Customize the look of YourDash"}
      title={"Theme"}
      icon={UKIcon.Accessibility}
    />
  </BasePageLayout>
);

export default Index;
