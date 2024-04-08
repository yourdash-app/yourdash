/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKHTMLElement from "../htmlElement.js";
import { ComponentType } from "./componentType.js";
import { ContainerComponent } from "./containerComponent.js";
import { ComponentTreeContext } from "./treeContext.js";

export interface BaseComponentInternals {
  componentType: ComponentType;
  debugId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parentComponent?: ContainerComponent<any> | UKHTMLElement;
  treeContext?: ComponentTreeContext;
  treeContextChildOverrides?: ComponentTreeContext;
  isInitialized: boolean;
}
