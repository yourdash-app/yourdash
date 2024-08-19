/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { FC, useState } from "react";
import SidebarContext from "./SidebarContext";
import styles from "./SidebarContainer.module.scss";

const SidebarContainer: FC<{ children: React.ReactNode | React.ReactNode[]; showSidebarByDefault?: boolean }> = ({
  children,
  showSidebarByDefault,
}) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(showSidebarByDefault || true);

  return (
    <SidebarContext.Provider
      value={{
        closeSidebar: () => {
          setShowSidebar(false);
        },
        toggleSidebar: () => {
          setShowSidebar(!showSidebar);
        },
        openSidebar: () => {
          setShowSidebar(true);
        },
        isOpen: showSidebar,
      }}
    >
      <div className={styles.component}>{children}</div>
    </SidebarContext.Provider>
  );
};

export default SidebarContainer;
