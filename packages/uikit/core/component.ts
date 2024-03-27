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

export default class Component<Type extends ComponentType> {
  __internals: {
    componentType: ComponentType;
    debugId: string;
    parentComponent?: ContainerComponent;
    children: Type extends ComponentType.Container ? AnyComponent[] : undefined;
    renderCount: number;
    treeContext: DefaultComponentTreeContext & object;
    isInitialized: boolean;
  };
  htmlElement: HTMLElement;

  constructor(
    componentType: Type extends ComponentType.Container ? ComponentType.Container : ComponentType.Solo,
    props?: { debugId?: string },
  ) {
    this.__internals = {
      debugId: generateUUID(),
      // When a component is created, it's creator should define its parent
      parentComponent: undefined,
      // @ts-ignore
      children: componentType === ComponentType.Container ? [] : undefined,
      componentType: componentType,
      renderCount: 0,
      isInitialized: false,
      treeContext: {},
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

export type AnyComponent = Component<ComponentType>;
export type ContainerComponent = Component<ComponentType.Container>;
export type SoloComponent = Component<ComponentType.Solo>;
