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
    title={"Admin tools"}
  >
    <SettingCategoryComponent
      href={"https://google.com"}
      description={"Sample text"}
      title={"Sample text"}
      icon={YourDashIcon.Paintbrush}
      external
    />
    <SettingCategoryComponent
      href={"/app/a/settings/session"}
      description={"Sample text"}
      title={"Sample text"}
      icon={YourDashIcon.Login}
      external
    />
    <SettingCategoryComponent
      href={"/app/a/settings/accessibility"}
      description={"Sample text"}
      title={"Sample text"}
      icon={YourDashIcon.Accessibility}
    />
    <SettingCategoryComponent
      href={"/app/a/settings/admin"}
      description={"Sample text"}
      title={"Sample text"}
      icon={YourDashIcon.Tools}
    />
  </BasePageLayout>
);

export default Index;
