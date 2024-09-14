/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import Flex from "../../components/flex/flex.tsx";
import IncrementLevel from "../../core/incrementLevel.tsx";
import { useLevel, useLevelClass } from "../../core/level.tsx";
import styles from "./Sidebar.module.scss";
import SidebarContext from "./SidebarContext.tsx";
import { FC, useContext } from "react";

const Sidebar: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
  const sidebarContext = useContext(SidebarContext);
  const level = useLevel();

  return (
    <IncrementLevel>
      <Flex
        direction={"column"}
        className={clippy(styles.component, sidebarContext.isOpen && styles.open, useLevelClass(level + 1))}
      >
        {children}
      </Flex>
    </IncrementLevel>
  );
};

export default Sidebar;
