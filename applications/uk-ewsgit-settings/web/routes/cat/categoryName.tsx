/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Heading from "@yourdash/uikit/components/heading/heading";
import Spinner from "@yourdash/uikit/components/spinner/spinner";
import SidebarToggleButton from "@yourdash/uikit/views/sidebar/SidebarToggleButton";
import useResource from "@yourdash/csi/useResource";
import React from "react";
import { useParams } from "react-router";
import SETTING_TYPE from "../../../shared/types/settingType";
import BooleanSetting from "../../components/setting/BooleanSetting";
import StringSetting from "../../components/setting/StringSetting";
import { acsi } from "../../meta.yourdash.ts";

const CategoryNamePage: React.FC = () => {
  const { categoryName } = useParams();

  const categoryData = useResource(() => acsi.getJson(`/cat/:categoryid`, { categoryid: categoryName || "" }), [categoryName]);

  return (
    <div>
      <SidebarToggleButton />
      <Heading text={categoryData?.id || categoryName || "Invalid category name"} />
      {!categoryData ? (
        <Spinner />
      ) : (
        Object.keys(categoryData.settings).map((settingId) => {
          console.log(settingId);
          const setting = categoryData.settings[settingId];

          switch (setting.type) {
            case SETTING_TYPE.BOOLEAN:
              return (
                <BooleanSetting
                  key={settingId}
                  setting={setting}
                />
              );
            case SETTING_TYPE.STRING:
              return (
                <StringSetting
                  key={settingId}
                  setting={setting}
                />
              );
          }

          return (
            <>
              <div key={setting.id}>Setting: {JSON.stringify(setting)}</div>
            </>
          );
        })
      )}
    </div>
  );
};

export default CategoryNamePage;
