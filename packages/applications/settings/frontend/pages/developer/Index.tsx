/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import * as React from "react";
import BasePageLayout from "../../components/BasePageLayout";
import SettingsPersonalServerAcceleratorSection from "./sections/SettingsPersonalServerAcceleratorSection";
import SettingsStoreSection from "./sections/SettingsStoreSection";

const Index: React.FC = () => (
  <BasePageLayout
    title={"Developer tools"}
  >
    <SettingsPersonalServerAcceleratorSection/>
    <SettingsStoreSection/>
  </BasePageLayout>
);

export default Index;
