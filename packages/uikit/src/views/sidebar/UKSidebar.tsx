/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import UKFlex from "../../components/flex/UKFlex.tsx";
import IncrementLevel from "../../core/incrementLevel.tsx";
import { useLevel, useLevelClass } from "../../core/level.tsx";
import styles from "./sidebar.module.scss";
import UKSidebarContext from "./UKSidebarContext.tsx";
import { FC, useContext } from "react";

const UKSidebar: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
  const sidebarContext = useContext(UKSidebarContext);
  const level = useLevel();

  return (
    <IncrementLevel>
      <UKFlex
        direction={"column"}
        className={clippy(styles.component, sidebarContext.isOpen && styles.open, useLevelClass(level + 1))}
      >
        {children}
      </UKFlex>
    </IncrementLevel>
  );
};

export default UKSidebar;
