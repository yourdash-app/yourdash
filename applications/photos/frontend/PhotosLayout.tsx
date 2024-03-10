/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { YourDashIcon } from "@yourdash/uikit/depChiplet/components/icon/iconDictionary";
import SideBar, { SIDEBAR_ITEM_TYPE, SIDEBAR_STATE } from "@yourdash/uikit/depChiplet/components/sideBar/SideBar";
import React from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";

const PhotosLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={"h-full grid w-full grid-cols-[auto,1fr]"}>
      <SideBar
        title={"Select files"}
        items={[
          {
            label: "Home",
            onClick() {
              navigate("/app/photos/");
            },
            type: SIDEBAR_ITEM_TYPE.Button,
            icon: YourDashIcon.Home,
          },
          {
            label: "Search",
            onClick() {
              navigate("/app/photos/search");
              return 0;
            },
            type: SIDEBAR_ITEM_TYPE.Button,
            icon: YourDashIcon.Search,
          },
          {
            type: SIDEBAR_ITEM_TYPE.Separator,
            id: "sep1",
          },
          {
            label: "Upload",
            onClick() {
              navigate("/app/photos/upload");
              return 0;
            },
            type: SIDEBAR_ITEM_TYPE.Button,
            icon: YourDashIcon.Upload,
          },
        ]}
        defaultState={SIDEBAR_STATE.NormalExpanded}
      />
      <Outlet />
    </div>
  );
};

export default PhotosLayout;
