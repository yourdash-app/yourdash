/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "packages/uikit/src/core/iconDictionary.ts";
import * as React from "react";
import BasePageLayout from "../../../components/BasePageLayout";
import BooleanSettingComponent from "../../../components/BooleanSettingComponent";
import coreCSI from "@yourdash/csi/coreCSI";

const Index: React.FC = () => {
  const [useBrowserLayout, setUseBrowserLayout] = React.useState<boolean>(coreCSI.userDB.get("dash:useBrowserLayout") || false);

  return (
    <BasePageLayout title={"Dashboard personalization"}>
      <BooleanSettingComponent
        title={"Use browser layout"}
        icon={UKIcons.Browser}
        description={'Use the "browser" layout instead of the "dashboard" layout'}
        value={useBrowserLayout}
        setValue={(val) => {
          coreCSI.userDB.set("dash:useBrowserLayout", val);
          setUseBrowserLayout(val);
        }}
      />
    </BasePageLayout>
  );
};

export default Index;
