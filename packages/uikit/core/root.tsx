/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.js";
import isMobileDevice from "@yourdash/shared/web/helpers/isPhone.js";
import ContextMenuRoot from "../components/contextMenu/contextMenuRoot.js";
import LevelContext from "./level.js";
import styles from "./../theme/defaultTheme.module.scss";
import React, { FC, useEffect, useState } from "react";

const UIKitRoot: FC<{ children: React.ReactNode | React.ReactNode[] }> = (props) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  return (
    <div className={clippy(styles.theme, styles.level0, isMobile && styles.mobile)}>
      <ContextMenuRoot>
        <LevelContext.Provider value={0}>{props.children}</LevelContext.Provider>
      </ContextMenuRoot>
    </div>
  );
};

export default UIKitRoot;
