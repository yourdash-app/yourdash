/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid";
import { UIKitTheme } from "../components/theme.js";

export enum ComponentType {
  Container,
  Solo,
}

export interface DefaultComponentTreeContext {
  theme?: UIKitTheme;
  level: 0 | 1 | 2;
}

export type ComponentTreeContext = object & DefaultComponentTreeContext;

export interface SoloComponentInternals {
  componentType: ComponentType;
  debugId: string;
  parentComponent?: ContainerComponent;
  renderCount: number;
  treeContext: ComponentTreeContext;
  isInitialized: boolean;
}

export class SoloComponent {
  __internals: SoloComponentInternals;
  htmlElement: HTMLElement;

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
    this.htmlElement = document.createElement("div");

    return this;
  }

  render() {
    this.__internals.renderCount++;
    console.debug("UIKIT:RENDER", `rendering component: <${this.__internals.debugId}>`, this);

    return this;
  }
}

export interface ContainerComponentInternals extends SoloComponentInternals {
  children: AnyComponent[];
}

export class ContainerComponent {
  __internals: ContainerComponentInternals;
  htmlElement: HTMLElement;

  constructor(props?: { debugId?: string }) {
    this.__internals = {
      debugId: generateUUID(),
      // When a component is created, it's creator should define its parent
      parentComponent: undefined,
      children: [],
      componentType: ComponentType.Solo,
      renderCount: 0,
      isInitialized: false,
      treeContext: { level: 0 },
    };

    if (props) {
      if (props.debugId) this.__internals.debugId = props.debugId;
    }

    // by default, we use a div element as the component's html element
    this.htmlElement = document.createElement("div");

    return this;
  }

  addChild(child: AnyComponent) {
    this.__internals.children?.push(child);
    child.__internals.parentComponent = this;

    this.htmlElement?.appendChild(child.htmlElement);
    child.render();
  }

  render() {
    this.__internals.renderCount++;
    console.debug("UIKIT:RENDER", `rendering component: <${this.__internals.debugId}>`, this);

    return this;
  }
}

export type AnyComponent = SoloComponent | ContainerComponent;
export type AnyComponentInternals = SoloComponentInternals | ContainerComponentInternals;
