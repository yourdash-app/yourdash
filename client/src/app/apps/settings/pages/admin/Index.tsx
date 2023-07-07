import React from "react";
import SettingCategoryComponent from "../../components/SettingCategoryComponent";
import BasePageLayout from "../../components/BasePageLayout";

const Index: React.FC = () => (
  <BasePageLayout
    title={"Admin tools"}
  >
    <SettingCategoryComponent
      href={"https://google.com"}
      description={"Sample text"}
      title={"Sample text"}
      icon={"paintbrush-16"}
      external
    />
    <SettingCategoryComponent
      href={"/app/a/settings/session"}
      description={"Sample text"}
      title={"Sample text"}
      icon={"login"}
      external
    />
    <SettingCategoryComponent
      href={"/app/a/settings/accessibility"}
      description={"Sample text"}
      title={"Sample text"}
      icon={"accessibility-16"}
    />
    <SettingCategoryComponent
      href={"/app/a/settings/admin"}
      description={"Sample text"}
      title={"Sample text"}
      icon={"tools-16"}
    />
  </BasePageLayout>
);

export default Index;
