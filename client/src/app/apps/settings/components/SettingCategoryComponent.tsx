import React from "react";
import {ChipletIcon} from "../../../../ui/components/icon/iconDictionary";
import {Icon} from "../../../../ui";
import BaseSettingComponent from "./BaseSettingComponent";
import {useNavigate} from "react-router-dom";

export interface IBaseSettingComponent {
  title: string,
  description: string,
  icon: ChipletIcon,
  href: string,
  external?: boolean;
}

const SettingCategory: React.FC<IBaseSettingComponent> = ({
  title,
  description,
  icon,
  href,
  external
}) => {
  const navigate = useNavigate();

  return (
    <BaseSettingComponent
      onClick={() => {
        if (external) {
          window.location.href = href;
        } else {
          navigate(href);
        }
      }}
      icon={icon}
      title={title}
      description={description}
    >
      <Icon className={"aspect-square h-8"} name={!external ? "chevron-right-16" : "link-16"}/>
    </BaseSettingComponent>
  );
};

export default SettingCategory;
