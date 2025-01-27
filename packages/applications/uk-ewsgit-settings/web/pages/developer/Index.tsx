/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import * as React from "react";
import BasePageLayout from "../../components/BasePageLayout";
import ChipletUIDemoPage from "./sections/ChipletUI";
import SettingsStoreSection from "./sections/SettingsStoreSection";

const Index: React.FC = () => (
  <BasePageLayout title={"Developer tools"}>
    <SettingsStoreSection />
    <ChipletUIDemoPage />
  </BasePageLayout>
);

export default Index;
