/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import isMobileDevice from "@yourdash/shared/web/helpers/isPhone.ts";
import ContextMenuRoot from "../components/contextMenu/contextMenuRoot.tsx";
import Toasts from "./toasts/toasts.tsx";
import styles from "../theme/defaultTheme.module.scss";
import React from "react";
import LevelContext from "./level.tsx";

const UIKitRoot: React.FC<{ children: React.ReactNode | React.ReactNode[] }> = (props) => {
  return (
    <div className={clippy(styles.theme, styles.level0, isMobileDevice() && styles.mobile)}>
      <ContextMenuRoot>
        <Toasts>
          <LevelContext.Provider value={0}>{props.children}</LevelContext.Provider>
        </Toasts>
      </ContextMenuRoot>
    </div>
  );
};

export default UIKitRoot;
