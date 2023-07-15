import React from "react";
import BasePageLayout from "../../../components/BasePageLayout";
import BooleanSettingComponent from "../../../components/BooleanSettingComponent";

const index: React.FC = () => (
  <BasePageLayout title={"Dashboard personalization"}>
    <BooleanSettingComponent
      title={"Use browser layout"}
      icon={"browser-16"}
      description={"Use the \"browser\" layout instead of the \"dashboard\" layout"}
      value={false}
      setValue={() => 0}
    />
  </BasePageLayout>
);

export default index;
