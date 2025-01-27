/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { createContext, useContext } from "react";
import styles from "../theme/defaultTheme.module.scss";

const LevelContext = createContext(0);
export default LevelContext;

export const useLevel = () => useContext(LevelContext);

export const useLevelClass = (level: number): string => {
  switch (level) {
    case 0:
      return styles.level0;
    case 1:
      return styles.level1;
    case 2:
      return styles.level2;
    case 3:
      return styles.level3;
    default:
      return styles.level0;
  }
};
