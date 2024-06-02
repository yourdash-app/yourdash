/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { FC, useContext } from "react";
import { UKIcon } from "../../components/icon/iconDictionary";
import SidebarContext from "./SidebarContext";
import IconButton from "../../components/iconButton/iconButton";

const SidebarToggleButton: FC = () => {
  const sidebarContext = useContext(SidebarContext);

  return (
    <IconButton
      accessibleLabel={sidebarContext.isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
      icon={sidebarContext.isOpen ? UKIcon.SidebarCollapse : UKIcon.SidebarExpand}
      onClick={() => {
        sidebarContext.toggleSidebar();
      }}
    />
  );
};

export default SidebarToggleButton;
