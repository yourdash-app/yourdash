/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import LevelContext, { useLevel } from "./level.tsx";
import { FC } from "react";

const IncrementLevel: FC<{ children: React.ReactNode | React.ReactNode[] }> = (props) => {
  return <LevelContext.Provider value={useLevel() + 1}>{props.children}</LevelContext.Provider>;
};

export default IncrementLevel;
