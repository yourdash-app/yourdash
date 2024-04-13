/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component, ParentProps } from "solid-js";
import LevelContext from "./level.js";
import styles from "./../theme/defaultTheme.module.scss";

const UIKitRoot: Component<ParentProps> = ({ children }) => {
  return (
    <div class={`${styles.theme} ${styles.level0}`}>
      <LevelContext.Provider value={0}>{children}</LevelContext.Provider>
    </div>
  );
};

export default UIKitRoot;
