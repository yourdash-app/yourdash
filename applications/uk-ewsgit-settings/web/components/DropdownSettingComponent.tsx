/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import DropdownButton from "@yourdash/chiplet/components/dropdownButton/DropdownButton";
import BaseSettingComponent, { IBaseSettingComponent } from "./BaseSettingComponent";
import * as React from "react";

export interface IBooleanSettingComponent extends IBaseSettingComponent {
  setValue(value: string): void;
  value: string;
  options: {
    label: string;
    value: string;
  }[];
}

const BooleanSettingComponent: React.FC<Omit<IBooleanSettingComponent, "children">> = ({
  value,
  setValue,
  options,
  ...baseSettingComponentProps
}) => (
  <BaseSettingComponent {...baseSettingComponentProps}>
    <DropdownButton
      items={options.map((option) => {
        return {
          label: option.label,
          onClick: () => {
            setValue(option.value);
          },
        };
      })}
    >
      {value}
    </DropdownButton>
  </BaseSettingComponent>
);

export default BooleanSettingComponent;
