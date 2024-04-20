/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.js";
import isMobileDevice from "@yourdash/shared/web/helpers/isPhone.js";
import { Component, createSignal, onMount, ParentProps } from "solid-js";
import LevelContext from "./level.js";
import styles from "./../theme/defaultTheme.module.scss";

const UIKitRoot: Component<ParentProps> = ({ children }) => {
  const [isMobile, setIsMobile] = createSignal<boolean>(false);

  onMount(() => {
    setIsMobile(isMobileDevice());
  });

  return (
    <div class={clippy(styles.theme, styles.level0, isMobile() && styles.mobile)}>
      <LevelContext.Provider value={0}>{children}</LevelContext.Provider>
    </div>
  );
};

export default UIKitRoot;
