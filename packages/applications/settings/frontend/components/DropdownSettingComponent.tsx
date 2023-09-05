import BaseSettingComponent, { IBaseSettingComponent } from "./BaseSettingComponent";
import * as React from "react";
import { DropdownButton } from "web-client/src/ui";

export interface IBooleanSettingComponent extends IBaseSettingComponent {
  setValue( value: string ): void;
  value: string;
  options: {
    name: string;
    value: string;
  }[];
}

const BooleanSettingComponent: React.FC<Omit<IBooleanSettingComponent, "children">> = ( {
  value,
  setValue,
  options,
  ...baseSettingComponentProps
} ) => (
  <BaseSettingComponent
    { ...baseSettingComponentProps }
  >
    <DropdownButton
      items={options.map( option => {
        return {
          name: option.name,
          onClick: () => { setValue( option.value ) }
        }
      } )}
    >
      {value}
    </DropdownButton>
  </BaseSettingComponent>
);

export default BooleanSettingComponent;
