/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { IconButton, YourDashIcon } from "@yourdash/web-client/src/ui/index";

export interface IIndicator {
  icon: YourDashIcon;
  color?: string;
  displayName: string;
  value: number;
}

const Indicator: React.FC<IIndicator> = ({ icon, color, displayName, value }) => {
  return (
    <div className={"flex flex-col gap-1 items-center justify-center"}>
      <IconButton icon={icon} color={color} />
      <span>{value}</span>
    </div>
  );
};

export default Indicator;
