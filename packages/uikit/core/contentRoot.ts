/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid";
import Component, {
  ComponentType,
  ContainerComponent,
  DefaultComponentTreeContext,
} from "@yourdash/uikit/core/component";
import UIKitHTMLElement from "./htmlElement";
import { initializeComponent } from "./index.js";

export interface ContentRootProps {
  htmlElement: HTMLElement;
  debugId?: string;
}

export default class ContentRoot {
  __internals: {
    debugId: string;
    children: Component<ComponentType>[];
    element?: HTMLElement;
    treeContext: object & DefaultComponentTreeContext;
  };

  constructor(props: ContentRootProps) {
    this.__internals = {
      debugId: generateUUID(),
      children: [],
      treeContext: {},
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
    this.__internals.element?.appendChild(child.htmlElement);

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
    if (!this.__internals.element) {
      return this;
    }

    this.__internals.element.innerHTML = "";

    function recursiveFullRender(
      child: Component<ComponentType.Container>,
      treeContext: object & DefaultComponentTreeContext,
    ) {
      if (!child.__internals.isInitialized) {
        initializeComponent(child, treeContext);
      }

      child.__internals.children?.map((ch) => {
        if (ch.__internals.componentType === ComponentType.Container) {
          ch.render();
          child.htmlElement?.appendChild(ch.htmlElement);
          recursiveFullRender(ch, child.__internals.treeContext);
        } else {
          ch.render();
          child.htmlElement?.appendChild(ch.htmlElement);
        }

        recursiveFullRender(child, child.__internals.treeContext);

        return;
      });
    }

    this.getChildren().forEach((child) => {
      child.render();
      this.__internals.element?.appendChild(child.htmlElement);

      if (child.__internals.componentType === ComponentType.Container) {
        recursiveFullRender(child, child.__internals.treeContext);
      }
    });

    return this;
  }
}
