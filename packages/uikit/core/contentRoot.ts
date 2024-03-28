/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid";
import { ComponentType, DefaultComponentTreeContext, AnyComponent, ContainerComponent, ComponentTreeContext } from "@yourdash/uikit/core/component";
import defaultTheme from "../components/theme.js";
import UIKitHTMLElement from "./htmlElement";
import { initializeComponent } from "./index.js";

export interface ContentRootProps {
  htmlElement: HTMLElement;
  debugId?: string;
}

export default class ContentRoot {
  __internals: {
    debugId: string;
    children: AnyComponent[];
    element?: HTMLElement;
    treeContext: object & DefaultComponentTreeContext;
  };

  constructor(props: ContentRootProps) {
    this.__internals = {
      debugId: generateUUID(),
      children: [],
      treeContext: {
        theme: defaultTheme,
        level: 0,
      },
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
  addChild(child: AnyComponent | UIKitHTMLElement) {
    this.__internals.element?.appendChild(child.htmlElement);
    this.__internals.children.push(child);

    return this;
  }

  removeChild(child: AnyComponent) {
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

    function recursiveFullRender(recurseChild: ContainerComponent, treeContext: ComponentTreeContext) {
      if (!recurseChild.__internals.isInitialized) {
        initializeComponent(recurseChild, treeContext);
      }

      recurseChild.__internals.children?.map((child) => {
        if (child.__internals.componentType === ComponentType.Container) {
          const containerChild = child as ContainerComponent;
          containerChild.render();
          child.htmlElement?.appendChild(containerChild.htmlElement);
          recursiveFullRender(containerChild, child.__internals.treeContext);
        } else {
          child.render();
          child.htmlElement?.appendChild(child.htmlElement);
        }

        recursiveFullRender(child as ContainerComponent, child.__internals.treeContext);

        return;
      });
    }

    this.getChildren().forEach((child) => {
      if (!child.__internals.isInitialized) {
        initializeComponent(child, this.__internals.treeContext);
      }

      child.render();
      this.__internals.element?.appendChild(child.htmlElement);

      if (child.__internals.componentType === ComponentType.Container) {
        recursiveFullRender(child as ContainerComponent, this.__internals.treeContext);
      }
    });

    return this;
  }
}
