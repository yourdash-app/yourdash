/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { SIDEBAR_ITEM_TYPE, SIDEBAR_STATE } from "@yourdash/web-client/src/ui/components/sideBar/SideBar";
import { SideBar, YourDashIcon } from "@yourdash/web-client/src/ui/index";
import React, { useState } from "react";
import { Outlet } from "react-router";

const PhotosLayout: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>("/");

  return (
    <div className={"h-full grid w-full grid-cols-[auto,1fr]"}>
      <SideBar
        title={"Select files"}
        items={[
          {
            label: "Home",
            onClick() {
              setCurrentPath("/");
            },
            type: SIDEBAR_ITEM_TYPE.Button,
            icon: YourDashIcon.Home,
          },
          {
            type: SIDEBAR_ITEM_TYPE.Separator,
            id: "sep1",
          },
          {
            label: "Upload",
            onClick() {
              // TODO: allow uploading of files
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
