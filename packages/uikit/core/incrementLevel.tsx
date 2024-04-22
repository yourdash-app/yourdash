/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component, ParentProps } from "solid-js";
import LevelContext, { useLevel } from "./level";

const IncrementLevel: Component<ParentProps> = (props) => {
  return <LevelContext.Provider value={useLevel() + 1}>{props.children}</LevelContext.Provider>;
};

export default IncrementLevel;
