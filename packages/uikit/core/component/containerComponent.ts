/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid.js";
import DivElement from "../../html/divElement.js";
import UKHTMLElement from "../htmlElement.js";
import { appendComponentToElement, initializeComponent } from "../index.js";
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
      renderCount: 0,
      isInitialized: false,
      treeContext: { level: 0 },
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

    if (child.__internals.componentType === ComponentType.HTMLElement) {
      const childComponent = child as UKHTMLElement;
      this.htmlElement?.addChild(childComponent);
    } else {
      const childComponent = child as ContainerComponent;
      this.htmlElement?.addChild(childComponent.htmlElement);
    }

    return this;
  }

  render() {
    if (!this.__internals.isInitialized) {
      initializeComponent(this);
    }

    this.__internals.renderCount++;
    console.debug("UIKIT:RENDER", this);

    this.__internals.children.map((child) => {
      appendComponentToElement(this.htmlElement.rawHtmlElement, child);

      if (child.__internals.componentType === ComponentType.HTMLElement) {
        const childComponent = child as UKHTMLElement;
        childComponent.__internals.parentComponent = this as unknown as ContainerComponent;
        childComponent.__internals.treeContext = { ...this.__internals.treeContext };

        if (this.__internals.treeContextChildOverrides) {
          Object.keys(this.__internals.treeContextChildOverrides).map((override) => {
            // @ts-ignore
            child.__internals.treeContext[override] = this.__internals.treeContextChildOverrides[override];
          });
        }

        return this;
      }

      const childComponent = child as AnyComponent;

      childComponent.__internals.parentComponent = this as unknown as ContainerComponent;
      childComponent.__internals.treeContext = { ...this.__internals.treeContext };

      if (this.__internals.treeContextChildOverrides) {
        Object.keys(this.__internals.treeContextChildOverrides).map((override) => {
          // @ts-ignore
          child.__internals.treeContext[override] = this.__internals.treeContextChildOverrides[override];
        });
      }

      child.render();
    });

    return this;
  }
}
