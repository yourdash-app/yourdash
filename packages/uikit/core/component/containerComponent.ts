/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid.js";
import DivElement from "../../html/divElement.js";
import UKHTMLElement from "../htmlElement.js";
import { ComponentType } from "./componentType.js";
import { BaseComponentInternals } from "./internals.js";
import { AnyComponent, AnyComponentOrHTMLElement } from "./type.js";

export interface ContainerComponentInternals<ComponentSlots extends string[] = []> extends BaseComponentInternals {
  children: AnyComponentOrHTMLElement[];
  slots: { [slotName in keyof ComponentSlots]: AnyComponentOrHTMLElement | undefined };
}

export class ContainerComponent<ComponentSlots extends string[] = []> {
  __internals: ContainerComponentInternals<ComponentSlots>;
  htmlElement: UKHTMLElement;

  constructor(slots?: ComponentSlots, props?: { debugId?: string }) {
    this.__internals = {
      debugId: generateUUID(),
      // When a component is created, it's creator should define its parent
      parentComponent: undefined,
      children: [],
      componentType: ComponentType.Container,
      isInitialized: false,
      treeContext: undefined,
      // @ts-ignore
      treeContextChildOverrides: {},
      slots: {} as { [slotName in keyof ComponentSlots]: AnyComponentOrHTMLElement | undefined },
    };

    if (props) {
      if (props.debugId) this.__internals.debugId = props.debugId;
    }

    // by default, we use a div element as the component's html element
    this.htmlElement = new DivElement();

    return this;
  }

  $(cb: (component: this) => void) {
    cb(this);
    return this;
  }

  addChild(child: AnyComponentOrHTMLElement) {
    this.__internals.children?.push(child);
    child.__internals.parentComponent = this;

    if (child.__internals.componentType === ComponentType.HTMLElement) {
      const childComponent = child as UKHTMLElement;
      this.htmlElement.rawHtmlElement.appendChild(childComponent.rawHtmlElement);

      return this;
    }

    const childComponent = child as AnyComponent;
    this.htmlElement.rawHtmlElement.appendChild(childComponent.htmlElement.rawHtmlElement);
    childComponent.init();

    return this;
  }

  init() {
    this.__internals.children = [];

    function findNearestTreeContext(parent: AnyComponentOrHTMLElement) {
      if (parent instanceof UKHTMLElement) {
        if (parent.__internals.parentComponent) return findNearestTreeContext(parent.__internals.parentComponent);

        return { level: 0, unableToFindTreeContext: "welp :(" };
      } else {
        if (!parent) return { level: 0, unableToFindTreeContext: "welp :(" };

        if (parent.__internals.treeContext) {
          console.log("TREE CONTEXT", parent.__internals.treeContext);
          return parent.__internals.treeContext;
        }

        if (parent.__internals.parentComponent) return findNearestTreeContext(parent.__internals.parentComponent);

        return { level: 0, unableToFindTreeContext: "welp :(" };
      }
    }

    // @ts-ignore
    this.__internals.treeContext = findNearestTreeContext(this);
  }
}
