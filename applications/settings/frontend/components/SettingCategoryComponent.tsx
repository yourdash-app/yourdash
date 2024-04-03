/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Icon from "@yourdash/chiplet/components/icon/Icon";
import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary";
import React from "react";
import BaseSettingComponent from "./BaseSettingComponent";
import { useNavigate } from "react-router-dom";

export interface IBaseSettingComponent {
  title: string;
  description: string;
  icon: UKIcon;
  href: string;
  external?: boolean;
}

const SettingCategory: React.FC<IBaseSettingComponent> = ({ title, description, icon, href, external }) => {
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
      <Icon className={"aspect-square h-8"} icon={!external ? UKIcon.ChevronRight : UKIcon.Link} />
    </BaseSettingComponent>
  );
};

export default SettingCategory;
