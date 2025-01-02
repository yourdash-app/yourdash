/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "packages/uikit/src/core/iconDictionary.ts";
import React, { useState } from "react";
import BasePageLayout from "../../../components/BasePageLayout";
import coreCSI from "@yourdash/csi/coreCSI";
import DropdownSettingComponent from "../../../components/DropdownSettingComponent";

const Index: React.FC = () => {
  const [panelSize, setPanelSize] = useState<"small" | "medium" | "large">(coreCSI.userDB.get("core:panel:size") || "medium");
  const [panelSide, setPanelSide] = useState<"top" | "right" | "bottom" | "left">(coreCSI.userDB.get("core:panel:side") || "left");

  return (
    <BasePageLayout title={"Panel"}>
      <DropdownSettingComponent
        title={"Panel Size"}
        icon={UKIcons.Gear}
        description={"Set the size of the panel and it's widgets"}
        options={[
          {
            value: "small",
            label: "Small",
          },
          {
            value: "medium",
            label: "Medium (Default)",
          },
          {
            value: "large",
            label: "Large",
          },
        ]}
        value={panelSize || "medium"}
        setValue={(val) => {
          setPanelSize(val as "small" | "medium" | "large");
          coreCSI.userDB.set("core:panel:size", val);
          // @ts-ignore
          window.__yourdashCorePanelReload();
        }}
      />
      <DropdownSettingComponent
        title={"Panel Side"}
        icon={UKIcons.Gear}
        description={"Set the side that the panel is on the screen"}
        options={[
          {
            value: "top",
            label: "Top",
          },
          {
            value: "right",
            label: "Right",
          },
          {
            value: "bottom",
            label: "Bottom",
          },
          {
            value: "left",
            label: "Left (Default)",
          },
        ]}
        value={panelSide || "left"}
        setValue={(val) => {
          setPanelSide(val as "top" | "right" | "bottom" | "left");
          coreCSI.userDB.set("core:panel:side", val);
          // @ts-ignore
          window.__yourdashCorePanelReload();
        }}
      />
    </BasePageLayout>
  );
};

export default Index;
