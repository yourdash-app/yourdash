/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "packages/uikit/src/core/iconDictionary.ts";
import * as React from "react";
import SettingCategoryComponent from "../../components/SettingCategoryComponent";
import BasePageLayout from "../../components/BasePageLayout";
import { modulePath } from "../../meta.yourdash";

const Index: React.FC = () => (
  <BasePageLayout title={"Personalization"}>
    <SettingCategoryComponent
      href={`${modulePath}/personalization/panel`}
      description={"Customize your panel"}
      title={"Panel"}
      icon={UKIcons.Paintbrush}
    />
    <SettingCategoryComponent
      href={`${modulePath}/personalization/theme`}
      description={"Customize the look of YourDash"}
      title={"Theme"}
      icon={UKIcons.Accessibility}
    />
  </BasePageLayout>
);

export default Index;
