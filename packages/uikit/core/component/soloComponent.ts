/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid.js";
import DivElement from "../../html/divElement.js";
import UKHTMLElement from "../htmlElement.js";
import { propagateTreeContext } from "../treeContext.js";
import { ComponentProps } from "./componentProps.js";
import { ComponentType } from "./componentType.js";
import { BaseComponentInternals } from "./internals.js";

export interface SoloComponentInternals extends BaseComponentInternals {}

export class SoloComponent {
  __internals: SoloComponentInternals;
  htmlElement: UKHTMLElement;
  props: ComponentProps;

  constructor(props: SoloComponent["props"] = {}, debugProps?: { debugId?: string }) {
    this.__internals = {
      debugId: generateUUID(),
      // When a component is created, it's creator should define its parent
      parentComponent: undefined,
      componentType: ComponentType.Solo,
      isInitialized: false,
      treeContext: { level: 0 },
    };

    this.props = props;

    if (debugProps) {
      if (debugProps.debugId) {
        this.__internals.debugId = debugProps.debugId;
      }
    }

    // by default, we use a div element as the component's html element
    this.htmlElement = new DivElement();

    return this;
  }

  $(cb: (component: this) => void) {
    cb(this);
    return this;
  }

  init() {
    // @ts-ignore
    this.__internals.treeContext = propagateTreeContext(this.__internals.parentComponent);
  }
}
