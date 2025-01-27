/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { FC, useContext } from "react";
import { UKIcons } from "../../core/iconDictionary.ts";
import UKSidebarContext from "./UKSidebarContext.tsx";
import UKIconButton from "../../components/iconButton/UKIconButton.tsx";

const UKSidebarToggleButton: FC = () => {
  const sidebarContext = useContext(UKSidebarContext);

  return (
    <UKIconButton
      accessibleLabel={sidebarContext.isOpen ? "Collapse UKSidebar" : "Expand UKSidebar"}
      icon={sidebarContext.isOpen ? UKIcons.SidebarCollapse : UKIcons.SidebarExpand}
      onClick={() => {
        sidebarContext.toggleSidebar();
      }}
    />
  );
};

export default UKSidebarToggleButton;
