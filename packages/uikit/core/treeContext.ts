/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { ComponentType } from "./component/componentType.js";
import { AnyComponentOrHTMLElement } from "./component/type.js";

export function propagateTreeContext(node: AnyComponentOrHTMLElement) {
  if (!node?.__internals) return { level: 0, unableToFindTreeContext: "welp :(" };

  if (node.__internals.componentType === ComponentType.HTMLElement) {
    if (node.__internals.treeContext) return node.__internals.treeContext;

    if (node.__internals.parentComponent) return propagateTreeContext(node.__internals.parentComponent);

    return { level: 0, unableToFindTreeContext: "welp :(" };
  } else {
    if (node.__internals.treeContext) return node.__internals.treeContext;

    if (node.__internals.parentComponent) return propagateTreeContext(node.__internals.parentComponent);

    return { level: 0, unableToFindTreeContext: "welp :(" };
  }
}
