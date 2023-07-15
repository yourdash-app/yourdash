import React from "react";
import SettingCategoryComponent from "../../components/SettingCategoryComponent";
import BasePageLayout from "../../components/BasePageLayout";

const Index: React.FC = () => (
  <BasePageLayout
    title={"Personalization"}
  >
    <SettingCategoryComponent
      href={"/app/a/settings/personalization/panel"}
      description={"Customize your panel"}
      title={"Panel"}
      icon={"paintbrush-16"}
    />
    <SettingCategoryComponent
      href={"/app/a/settings/personalization/dashboard"}
      description={"Customize your dashboard"}
      title={"Dashboard"}
      icon={"paintbrush-16"}
    />
    <SettingCategoryComponent
      href={"/app/a/settings/personalization/profile"}
      description={"Personalize your profile"}
      title={"Profile"}
      icon={"login"}
    />
    <SettingCategoryComponent
      href={"/app/a/settings/personalization/theme"}
      description={"Customize the look of YourDash"}
      title={"Theme"}
      icon={"accessibility-16"}
    />
  </BasePageLayout>
);

export default Index;
