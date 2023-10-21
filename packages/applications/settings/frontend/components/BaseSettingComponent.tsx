/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import * as React from "react";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";
import { Icon, Card } from "web-client/src/ui";

export interface IBaseSettingComponent {
  children: React.ReactNode,
  title: string,
  description: string,
  icon: YourDashIcon,
  onClick?: () => void
}

const BaseSettingComponent: React.FC<IBaseSettingComponent> = ( {
  children,
  title,
  description,
  icon,
  onClick
} ) => (
  <Card onClick={onClick} className={"flex gap-2 items-center w-full h-max"}>
    <Icon className={"aspect-square h-10"} icon={icon}/>
    <div className={"mr-auto"}>
      <h2 className={"font-semibold text-container-fg text-3xl -mb-1"}>{title}</h2>
      <span className={"font-light text-container-tertiary-fg text-sm"}>{description}</span>
    </div>
    {
      children
    }
  </Card>
);

export default BaseSettingComponent;
