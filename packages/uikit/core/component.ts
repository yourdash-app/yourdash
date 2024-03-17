/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid";

export enum ComponentType {
  Container,
  Solo,
}

export default class Component<Type extends ComponentType> {
  __internals: {
    componentType: ComponentType;
    debugId: string;
    parentComponent?: ContainerComponent;
    children: Type extends ContainerComponent ? AnyComponent[] : null;
    renderCount: number;
  };

  constructor(
    componentType: Type extends ComponentType.Container ? ComponentType.Container : ComponentType.Solo,
    props?: { debugId?: string },
  ) {
    this.__internals = {
      debugId: generateUUID(),
      // When a component is created, it's creator should define it's parent
      parentComponent: undefined,
      // @ts-ignore
      children: componentType === ComponentType.Container ? [] : null,
      componentType: componentType,
      renderCount: 0,
    };

    if (props) {
      if (props.debugId) this.__internals.debugId = props.debugId;
    }

    return this;
  }

  render() {
    this.__internals.renderCount++;
    console.debug("UIKIT:RENDER", `rendering component: <${this.__internals.debugId}>`);

    return this;
  }
}

export type AnyComponent = Component<ComponentType>;
export type ContainerComponent = Component<ComponentType.Container>;
export type SoloComponent = Component<ComponentType.Solo>;
