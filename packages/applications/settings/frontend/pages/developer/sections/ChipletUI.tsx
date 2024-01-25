/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { SIDEBAR_ITEM_TYPE, SIDEBAR_STATE } from "web-client/src/ui/components/sideBar/SideBar";
import { SideBar, YourDashIcon } from "web-client/src/ui/index";

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
            onClick: () => { return 0 },
          }
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
            onClick: () => { return 0 },
          }
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
            onClick: () => { return 0 },
          }
        ]}
        defaultState={SIDEBAR_STATE.FloatingToggleMinimised}
      />
    </div>
  )
}

export default ChipletUIDemoPage
