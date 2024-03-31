/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { AnyComponentOrHTMLElement } from "./type.js";

export function incrementLevel(component: AnyComponentOrHTMLElement) {
  if (!component.__internals.treeContextChildOverrides) component.__internals.treeContextChildOverrides = {};

  if (component.__internals?.treeContext?.level === "def") {
    component.__internals.treeContextChildOverrides.level = 0;
  } else if (component.__internals?.treeContext?.level === 0) {
    component.__internals.treeContextChildOverrides.level = 1;
  } else if (component.__internals?.treeContext?.level === 1) {
    component.__internals.treeContextChildOverrides.level = 2;
  } else if (component.__internals?.treeContext?.level === 2) {
    // do nothing - max level reached
    return;
  }

  return;
}
