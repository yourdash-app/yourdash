/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { YourDashIcon } from "@yourdash/uikit/depChiplet/components/icon/iconDictionary";
import SideBar, { SIDEBAR_ITEM_TYPE, SIDEBAR_STATE } from "@yourdash/uikit/depChiplet/components/sideBar/SideBar";
import React from "react";

const ChipletUIDemoPage: React.FC = () => {
  return (
    <div className={"flex"}>
      <SideBar
        title="Chiplet UI"
        items={[
          {
            type: SIDEBAR_ITEM_TYPE.Button,
            label: "Button",
            icon: YourDashIcon.FileBadge,
            onClick: () => {
              return 0;
            },
          },
        ]}
        defaultState={SIDEBAR_STATE.NormalMinimised}
      />
      <SideBar
        title="Chiplet UI"
        items={[
          {
            type: SIDEBAR_ITEM_TYPE.Button,
            label: "Button",
            icon: YourDashIcon.FileBadge,
            onClick: () => {
              return 0;
            },
          },
        ]}
        defaultState={SIDEBAR_STATE.FloatingMinimised}
      />
      <SideBar
        title="Chiplet UI"
        items={[
          {
            type: SIDEBAR_ITEM_TYPE.Button,
            label: "Button",
            icon: YourDashIcon.FileBadge,
            onClick: () => {
              return 0;
            },
          },
        ]}
        defaultState={SIDEBAR_STATE.FloatingToggleMinimised}
      />
    </div>
  );
};

export default ChipletUIDemoPage;
