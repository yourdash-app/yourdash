/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { useState } from "react";
import BasePageLayout from "../../../components/BasePageLayout";
import csi from "@yourdash/web-client/src/helpers/csi";
import { YourDashIcon } from "@yourdash/web-client/src/ui/index";
import Panel from "@yourdash/web-client/src/app/panel/Panel";
import DropdownSettingComponent from "../../../components/DropdownSettingComponent";

const Index: React.FC = () => {
  const [panelSize, setPanelSize] = useState<"small" | "medium" | "large">(csi.userDB.get("core:panel:size"));
  const [panelSide, setPanelSide] = useState<"top" | "right" | "bottom" | "left">(csi.userDB.get("core:panel:side"));

  return (
    <BasePageLayout title={"Panel"}>
      <DropdownSettingComponent
        title={"Panel Size"}
        icon={YourDashIcon.Gear}
        description={"Set the size of the panel and it's widgets"}
        options={[
          {
            value: "small",
            name: "Small",
          },
          {
            value: "medium",
            name: "Medium (Default)",
          },
          {
            value: "large",
            name: "Large",
          },
        ]}
        value={panelSize || "medium"}
        setValue={(val) => {
          setPanelSize(val as "small" | "medium" | "large");
          csi.userDB.set("core:panel:size", val);
          // @ts-ignore
          window.__yourdashCorePanelReload();
        }}
      />
      <DropdownSettingComponent
        title={"Panel Side"}
        icon={YourDashIcon.Gear}
        description={"Set the side that the panel is on the screen"}
        options={[
          {
            value: "top",
            name: "Top",
          },
          {
            value: "right",
            name: "Right",
          },
          {
            value: "bottom",
            name: "Bottom",
          },
          {
            value: "left",
            name: "Left (Default)",
          },
        ]}
        value={panelSide || "left"}
        setValue={(val) => {
          setPanelSide(val as "top" | "right" | "bottom" | "left");
          csi.userDB.set("core:panel:side", val);
          // @ts-ignore
          window.__yourdashCorePanelReload();
        }}
      />
    </BasePageLayout>
  );
};

export default Index;
