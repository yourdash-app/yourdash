/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Icon from "@yourdash/uikit/depChiplet/components/icon/Icon";
import { YourDashIcon } from "@yourdash/uikit/depChiplet/components/icon/iconDictionary";
import React from "react";
import BaseSettingComponent from "./BaseSettingComponent";
import { useNavigate } from "react-router-dom";

export interface IBaseSettingComponent {
  title: string;
  description: string;
  icon: YourDashIcon;
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
      <Icon className={"aspect-square h-8"} icon={!external ? YourDashIcon.ChevronRight : YourDashIcon.Link} />
    </BaseSettingComponent>
  );
};

export default SettingCategory;
