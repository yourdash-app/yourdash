/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { FC, useState } from "react";
import UKSidebarContext from "./UKSidebarContext.tsx";
import styles from "./sidebarContainer.module.scss";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";

const UKSidebarContainer: FC<{ children: React.ReactNode | React.ReactNode[]; showSidebarByDefault?: boolean; className?: string }> = ({
  children,
  showSidebarByDefault,
  className,
}) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(showSidebarByDefault || true);

  return (
    <UKSidebarContext.Provider
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
      <div className={clippy(styles.component, className)}>{children}</div>
    </UKSidebarContext.Provider>
  );
};

export default UKSidebarContainer;
