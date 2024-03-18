/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid";
import Component, { ComponentType, ContainerComponent } from "@yourdash/uikit/core/component";
import UIKitHTMLElement from "./htmlElement";

export interface ContentRootProps {
  htmlElement: HTMLElement;
  debugId?: string;
}

export default class ContentRoot {
  __internals: {
    debugId: string;
    children: Component<ComponentType>[];
    element?: HTMLElement;
  };

  constructor(props: ContentRootProps) {
    this.__internals = {
      debugId: generateUUID(),
      children: [],
    };

    if (props.debugId) this.__internals.debugId = props.debugId;
    this.setHTMLElement(props.htmlElement);
    this.__internals.element?.setAttribute("uikit-content-root", "true");

    return this;
  }

  setHTMLElement(element: HTMLElement) {
    this.__internals.element = element;

    return this;
  }

  getChildren() {
    return this.__internals.children;
  }

  // add a child component to the content root
  addChild(child: Component<ComponentType> | UIKitHTMLElement) {
    // noinspection SuspiciousTypeOfGuard
    if (!(child instanceof Component)) {
      // noinspection SuspiciousTypeOfGuard
      if (!(child instanceof UIKitHTMLElement)) {
        throw new Error("child must be an instance of a UIKit Component");
      }

      this.__internals.element?.appendChild(child.__internals.underlyingHTMLElement);
      return this;
    }

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

  render() {
    function recursiveFullRender(child: Component<ComponentType>) {
      if (child.__internals.componentType === ComponentType.Solo) {
        child.render();
        return;
      }

      const childContainerComponent: ContainerComponent = child as ContainerComponent;
      childContainerComponent.render();

      recursiveFullRender(childContainerComponent);

      return;
    }

    this.getChildren().forEach((child) => {
      child.render();
      recursiveFullRender(child);
    });

    return this;
  }
}
