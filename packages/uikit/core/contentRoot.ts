/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid";
import Component, { ComponentType } from "@yourdash/uikit/core/component";

export default class ContentRoot {
  __internals: {
    debugId: string;
    children: Component<ComponentType>[];
    element?: HTMLElement;
  };

  constructor(props: { htmlElement: HTMLElement; debugId?: string }) {
    this.__internals = {
      debugId: generateUUID(),
      children: [],
    };

    if (props.debugId) this.__internals.debugId = props.debugId;
    this.setHTMLElement(props.htmlElement);

    return this;
  }

  setHTMLElement(element: HTMLElement) {
    this.__internals.element = element;

    return this;
  }

  getChildren() {
    return this.__internals.children;
  }

  addChild(child: Component<ComponentType>) {
    this.__internals.children.push(child);

    return this;
  }

  removeChild(child: Component<ComponentType>) {
    const index = this.__internals.children.indexOf(child);
    if (index > -1) {
      this.__internals.children.splice(index, 1);
    }

    return this;
  }

  fullRender() {
    this.getChildren().forEach((child) => {
      if (child.__internals.componentType === ComponentType.Container) {
        child?.fullRender();
        return;
      }

      child.render();
    });
  }
}
