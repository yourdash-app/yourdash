/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary";
import SideBar, { SIDEBAR_ITEM_TYPE, SIDEBAR_STATE } from "@yourdash/chiplet/components/sideBar/SideBar";
import useCurrentModuleId from "@yourdash/shared/core/useCurrentModuleId";
import * as React from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import applicationMeta from "../meta.yourdash";

const PhotosLayout: React.FC = () => {
  const moduleId = useCurrentModuleId(applicationMeta);
  const navigate = useNavigate();

  return (
    <div className={"h-full grid w-full grid-cols-[auto,1fr]"}>
      <SideBar
        title={"Select files"}
        items={[
          {
            label: "Home",
            onClick() {
              navigate(`/app/a/${moduleId}/`);
            },
            type: SIDEBAR_ITEM_TYPE.Button,
            icon: UKIcon.Home,
          },
          {
            label: "Search",
            onClick() {
              navigate(`/app/a/${moduleId}/search`);
              return 0;
            },
            type: SIDEBAR_ITEM_TYPE.Button,
            icon: UKIcon.Search,
          },
          {
            type: SIDEBAR_ITEM_TYPE.Separator,
            id: "sep1",
          },
          {
            label: "Upload",
            onClick() {
              navigate(`/app/a/${moduleId}/upload`);
              return 0;
            },
            type: SIDEBAR_ITEM_TYPE.Button,
            icon: UKIcon.Upload,
          },
        ]}
        defaultState={SIDEBAR_STATE.NormalExpanded}
      />
      <div className={"flex flex-col w-full h-full overflow-y-auto bg-bg"}>
        <Outlet />
      </div>
    </div>
  );
};

export default PhotosLayout;
