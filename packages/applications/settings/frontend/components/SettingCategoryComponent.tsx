/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";
import { Icon } from "web-client/src/ui";
import BaseSettingComponent from "./BaseSettingComponent";
import { useNavigate } from "react-router-dom";

export interface IBaseSettingComponent {
  title: string,
  description: string,
  icon: YourDashIcon,
  href: string,
  external?: boolean;
}

const SettingCategory: React.FC<IBaseSettingComponent> = ( {
  title,
  description,
  icon,
  href,
  external
} ) => {
  const navigate = useNavigate();
  
  return (
    <BaseSettingComponent
      onClick={() => {
        if ( external ) {
          window.location.href = href;
        } else {
          navigate( href );
        }
      }}
      icon={icon}
      title={title}
      description={description}
    >
      <Icon className={"aspect-square h-8"} icon={!external ? YourDashIcon.ChevronRight : YourDashIcon.Link}/>
    </BaseSettingComponent>
  );
};

export default SettingCategory;
