/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Icon from "@yourdash/chiplet/components/icon/Icon";
import { UKIcon, UKIconType } from "packages/uikit/src/core/iconDictionary.ts";
import React from "react";
import BaseSettingComponent from "./BaseSettingComponent";
import { useNavigate } from "react-router-dom";

export interface IBaseSettingComponent {
  title: string;
  description: string;
  icon: UKIconType;
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
      <Icon
        className={"aspect-square h-8"}
        icon={!external ? UKIcons.ChevronRight : UKIcons.Link}
      />
    </BaseSettingComponent>
  );
};

export default SettingCategory;
