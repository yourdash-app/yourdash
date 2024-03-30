/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid";
import { UIKitTheme } from "../components/theme.js";
import CommentElement from "../html/commentElement.js";
import DivElement from "../html/divElement";
import UIKitHTMLElement from "./htmlElement.js";
import { appendComponentToElement, initializeComponent } from "./index.js";

export enum ComponentType {
  Container,
  Solo,
  HTMLElement,
  Slot,
}

export interface DefaultComponentTreeContext {
  theme?: UIKitTheme;
  level: 0 | 1 | 2 | "default";
}

export type ComponentTreeContext = object & DefaultComponentTreeContext;

export interface SoloComponentInternals {
  componentType: ComponentType;
  debugId: string;
  parentComponent?: ContainerComponent | UIKitHTMLElement;
  renderCount: number;
  treeContext: ComponentTreeContext;
  isInitialized: boolean;
}

export class SoloComponent {
  __internals: SoloComponentInternals;
  htmlElement: UIKitHTMLElement;

  constructor(props?: { debugId?: string }) {
    this.__internals = {
      debugId: generateUUID(),
      // When a component is created, it's creator should define its parent
      parentComponent: undefined,
      componentType: ComponentType.Solo,
      renderCount: 0,
      isInitialized: false,
      treeContext: { level: 0 },
    };

    if (props) {
      if (props.debugId) this.__internals.debugId = props.debugId;
    }

    // by default, we use a div element as the component's html element
    this.htmlElement = new DivElement();

    return this;
  }

  render() {
    if (!this.__internals.isInitialized) {
      initializeComponent(this);
    }

    this.__internals.renderCount++;
    console.debug("UIKIT:RENDER", `rendering component: <${this.__internals.debugId}>`, this);

    return this;
  }
}

export interface ContainerComponentInternals<ComponentSlots extends string[] = []> extends SoloComponentInternals {
  children: AnyComponent[];
  slots: { [slotName in keyof ComponentSlots]: AnyComponentOrHTMLElement | undefined };
}

export class ContainerComponent<ComponentSlots extends string[] = []> {
  __internals: ContainerComponentInternals<ComponentSlots>;
  htmlElement: UIKitHTMLElement;

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
      slots: {} as { [slotName in keyof ComponentSlots]: AnyComponentOrHTMLElement | undefined },
    };

    if (props) {
      if (props.debugId) this.__internals.debugId = props.debugId;
    }

    // by default, we use a div element as the component's html element
    this.htmlElement = new DivElement();

    return this;
  }

  addChild(child: AnyComponentOrHTMLElement) {
    if (child.__internals.componentType === ComponentType.HTMLElement) {
      const childComponent = child as UIKitHTMLElement;
      this.htmlElement.addChild(childComponent);

      return;
    }

    const childComponent = child as AnyComponent;

    this.__internals.children?.push(childComponent);
    child.__internals.parentComponent = this as unknown as ContainerComponent;

    this.htmlElement?.addChild(childComponent.htmlElement);
    child.render();
  }

  render() {
    if (!this.__internals.isInitialized) {
      initializeComponent(this);
    }

    this.__internals.renderCount++;
    console.debug("UIKIT:RENDER", `rendering component: <${this.__internals.debugId}>`, this);

    this.__internals.children.map((child) => {
      appendComponentToElement(this.htmlElement.rawHtmlElement, child);

      child.render();
    });

    return this;
  }
}

export class ComponentSlot extends ContainerComponent {
  constructor(props?: { debugId?: string }) {
    super([], props);

    this.__internals.componentType = ComponentType.Slot;

    this.htmlElement = new CommentElement();
  }

  render() {
    return super.render();
  }
}

export type AnyComponent = SoloComponent | ContainerComponent;
export type AnyComponentOrHTMLElement = AnyComponent | UIKitHTMLElement;
export type AnyComponentInternals = SoloComponentInternals | ContainerComponentInternals;
