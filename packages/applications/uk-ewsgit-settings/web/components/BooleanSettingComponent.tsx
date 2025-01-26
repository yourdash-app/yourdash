/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import ToggleSwitch from "@yourdash/chiplet/components/toggleSwitch/ToggleSwitch";
import BaseSettingComponent, { IBaseSettingComponent } from "./BaseSettingComponent";
import * as React from "react";

export interface IBooleanSettingComponent extends IBaseSettingComponent {
  setValue(value: boolean): void;

  value: boolean;
}

const BooleanSettingComponent: React.FC<Omit<IBooleanSettingComponent, "children">> = ({
  value,
  setValue,
  ...baseSettingComponentProps
}) => (
  <BaseSettingComponent {...baseSettingComponentProps}>
    <ToggleSwitch
      setValue={(val) => setValue(val)}
      value={value}
    />
  </BaseSettingComponent>
);

export default BooleanSettingComponent;
