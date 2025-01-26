/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "packages/uikit/src/core/iconDictionary.ts";
import IconButton from "@yourdash/chiplet/components/iconButton/IconButton";
import React from "react";

export interface IIndicator {
  icon: UKIcon;
  color?: string;
  displayName: string;
  value: number;
}

const Indicator: React.FC<IIndicator> = ({ icon, color, displayName, value }) => {
  return (
    <div className={"flex flex-col gap-1 items-center justify-center"}>
      <IconButton
        icon={icon}
        color={color}
      />
      <span>{value}</span>
    </div>
  );
};

export default Indicator;
