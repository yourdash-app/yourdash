import BaseSettingComponent, { IBaseSettingComponent } from "./BaseSettingComponent";
import * as React from "react";
import { ToggleSwitch } from "web-client/src/ui";

export interface IBooleanSettingComponent extends IBaseSettingComponent {
  setValue( value: boolean ): void;
  
  value: boolean;
}

const BooleanSettingComponent: React.FC<Omit<IBooleanSettingComponent, "children">> = ( {
  value,
  setValue,
  ...baseSettingComponentProps
} ) => (
  <BaseSettingComponent
    { ...baseSettingComponentProps }
  >
    <ToggleSwitch setValue={ ( val ) => setValue( val ) } value={ value } />
  </BaseSettingComponent>
);

export default BooleanSettingComponent;
