/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export interface DefaultComponentTreeContext {
  level: 0 | 1 | 2 | 3;
}

export type ComponentTreeContext = object & DefaultComponentTreeContext;
