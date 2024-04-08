/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid.js";
import DivElement from "../../html/divElement.js";
import UKHTMLElement from "../htmlElement.js";
import { ComponentType } from "./componentType.js";
import { BaseComponentInternals } from "./internals.js";
import { AnyComponentOrHTMLElement } from "./type.js";

export interface SoloComponentInternals extends BaseComponentInternals {}

export class SoloComponent {
  __internals: SoloComponentInternals;
  htmlElement: UKHTMLElement;

  constructor(props?: { debugId?: string }) {
    this.__internals = {
      debugId: generateUUID(),
      // When a component is created, it's creator should define its parent
      parentComponent: undefined,
      componentType: ComponentType.Solo,
      isInitialized: false,
      treeContext: { level: 0 },
    };

    if (props) {
      if (props.debugId) {
        this.__internals.debugId = props.debugId;
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
    function findNearestTreeContext(parent: AnyComponentOrHTMLElement) {
      if (parent instanceof UKHTMLElement) {
        if (parent.__internals.parentComponent) return findNearestTreeContext(parent.__internals.parentComponent);

        return { level: 0, unableToFindTreeContext: "welp :(" };
      } else {
        if (parent.__internals.treeContext) return parent.__internals.treeContext;

        if (parent.__internals.parentComponent) return findNearestTreeContext(parent.__internals.parentComponent);

        return { level: 0, unableToFindTreeContext: "welp :(" };
      }
    }

    // @ts-ignore
    this.__internals.treeContext = findNearestTreeContext(this);
  }
}
