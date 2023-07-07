import React from "react";
import {ChipletIcon} from "../../../../ui/components/icon/iconDictionary";
import {Icon, Card} from "../../../../ui";

export interface IBaseSettingComponent {
  children: React.ReactNode,
  title: string,
  description: string,
  icon: ChipletIcon,
  onClick?: () => void
}

const BaseSettingComponent: React.FC<IBaseSettingComponent> = ({
  children,
  title,
  description,
  icon,
  onClick
}) => (
  <Card onClick={onClick} className={"flex gap-2 items-center w-full"}>
    <Icon className={"aspect-square h-10"} name={icon}/>
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
