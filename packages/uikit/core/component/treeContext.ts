/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UIKitTheme } from "../../components/theme.js";

export interface DefaultComponentTreeContext {
  theme?: UIKitTheme;
  level: 0 | 1 | 2 | "def";
}

export type ComponentTreeContext = object & DefaultComponentTreeContext;
