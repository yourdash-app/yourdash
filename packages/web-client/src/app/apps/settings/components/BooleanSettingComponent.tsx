import BaseSettingComponent, { IBaseSettingComponent } from "./BaseSettingComponent";
import React from "react";
import { ToggleSwitch } from "../../../../ui";

export interface IBooleanSettingComponent extends IBaseSettingComponent {
  setValue( value: boolean ): void;
  value: boolean
}

const BooleanSettingComponent: React.FC<Omit<IBooleanSettingComponent, "children">> = ( { value, setValue, ...baseSettingComponentProps } ) => (
  <BaseSettingComponent
    {...baseSettingComponentProps}
  >
    <ToggleSwitch onValueChange={() => setValue( !value )} defaultValue={value ? "true" : "false"}/>
  </BaseSettingComponent>
);

export default BooleanSettingComponent;
