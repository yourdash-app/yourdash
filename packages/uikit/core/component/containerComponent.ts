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
import { AnyComponent, AnyComponentOrHTMLElement } from "./type.js";
import { Constructor } from "type-fest/source/basic.js";

export interface ContainerComponentInternals<ComponentSlots extends string[] = []> extends BaseComponentInternals {
  children: AnyComponentOrHTMLElement[];
  slots: { [slotName in keyof ComponentSlots]: AnyComponentOrHTMLElement | undefined };
}

export interface SoloComponentInternals extends BaseComponentInternals {}

export class ContainerComponent<ComponentSlots extends string[] = []> {
  __internals: ContainerComponentInternals<ComponentSlots>;
  htmlElement: UKHTMLElement;
  props: ComponentProps;

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(props: ContainerComponent["props"] = {}, slots?: ComponentSlots, debugProps?: { debugId?: string }) {
    this.__internals = {
      debugId: generateUUID(),
      // When a component is created, it's creator should define its parent
      parentComponent: undefined,
      children: [],
      componentType: ComponentType.Container,
      isInitialized: false,
      treeContext: { level: 0 },
      // @ts-ignore
      treeContextChildOverrides: {},
      slots: {} as { [slotName in keyof ComponentSlots]: AnyComponentOrHTMLElement | undefined },
    };

    this.props = props;

    if (debugProps) {
      if (debugProps.debugId) this.__internals.debugId = debugProps.debugId;
    }

    // by default, we use a div element as the component's html element
    this.htmlElement = new DivElement();

    return this;
  }

  $(cb: (component: this) => void) {
    cb(this);
    return this;
  }

  addChild<Comp extends AnyComponentOrHTMLElement>(
    component: Constructor<Comp>,
    // @ts-ignore
    props: Comp extends AnyComponent ? Comp["props"] : object = {},
  ): Comp {
    const child = new component(props);

    this.__internals.children?.push(child);
    child.__internals.parentComponent = this;

    if (child.__internals.componentType === ComponentType.HTMLElement) {
      const childComponent = child as UKHTMLElement;
      this.htmlElement.rawHtmlElement.appendChild(childComponent.rawHtmlElement);
      childComponent.init();

      return childComponent as Comp;
    }

    const childComponent = child as AnyComponent;
    this.htmlElement.rawHtmlElement.appendChild(childComponent.htmlElement.rawHtmlElement);
    childComponent.init();

    return childComponent as Comp;
  }

  init() {
    this.__internals.children = [];

    // @ts-ignore
    this.__internals.treeContext = propagateTreeContext(this.__internals.parentComponent);
  }
}
