/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary";
import * as React from "react";
import BasePageLayout from "../../../components/BasePageLayout";
import BooleanSettingComponent from "../../../components/BooleanSettingComponent";
import csi from "@yourdash/csi/csi";

const Index: React.FC = () => {
  const [useBrowserLayout, setUseBrowserLayout] = React.useState<boolean>(csi.userDB.get("dash:useBrowserLayout") || false);

  return (
    <BasePageLayout title={"Dashboard personalization"}>
      <BooleanSettingComponent
        title={"Use browser layout"}
        icon={UKIcon.Browser}
        description={'Use the "browser" layout instead of the "dashboard" layout'}
        value={useBrowserLayout}
        setValue={(val) => {
          csi.userDB.set("dash:useBrowserLayout", val);
          setUseBrowserLayout(val);
        }}
      />
    </BasePageLayout>
  );
};

export default Index;
