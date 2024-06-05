/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import csi from "@yourdash/csi/csi";
import Heading from "@yourdash/uikit/components/heading/heading";
import Spinner from "@yourdash/uikit/components/spinner/spinner";
import SidebarToggleButton from "@yourdash/uikit/views/sidebar/SidebarToggleButton";
import useResource from "@yourdash/web/src/lib/useResource";
import React from "react";
import { useParams } from "react-router";
import EndpointSettingsCategory from "../../../shared/types/endpoints/setting/category";
import SETTING_TYPE from "../../../shared/types/settingType";
import BaseSetting from "../../components/setting/baseSetting";
import BooleanSetting from "../../components/setting/BooleanSetting";

const CategoryNamePage: React.FC = () => {
  const { categoryName } = useParams();

  const categoryData = useResource(
    () => csi.getJson<EndpointSettingsCategory>(`/app::settings/cat/${categoryName}`),
    [categoryName],
  );

  return (
    <div>
      <SidebarToggleButton />
      <Heading text={`Category Name: ${categoryName}`} />
      {!categoryData ? (
        <Spinner />
      ) : (
        categoryData.settings.map((setting) => {
          switch (setting.type) {
            case SETTING_TYPE.BOOLEAN:
              return <BooleanSetting setting={setting} />;
          }

          return (
            <>
              <div>Setting: {JSON.stringify(setting)}</div>
            </>
          );
        })
      )}
    </div>
  );
};

export default CategoryNamePage;
