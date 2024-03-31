/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid";
import defaultTheme, { loadThemeLevel, UIKitTheme } from "../components/theme.js";
import { ComponentType } from "./component/componentType.js";
import { ContainerComponent } from "./component/containerComponent.js";
import { DefaultComponentTreeContext } from "./component/treeContext.js";
import { AnyComponent, AnyComponentOrHTMLElement } from "./component/type.js";
import UIKitHTMLElement from "./htmlElement.js";
import { appendComponentToElement } from "./index.js";

export interface ContentRootProps {
  htmlElement: HTMLElement;
  debugId?: string;
  fillSpace?: boolean;
}

export default class ContentRoot {
  __internals: {
    debugId: string;
    children: AnyComponentOrHTMLElement[];
    element?: HTMLElement;
    treeContext: object & DefaultComponentTreeContext;
  };

  constructor(props: ContentRootProps) {
    this.__internals = {
      debugId: generateUUID(),
      children: [],
      treeContext: {
        theme: defaultTheme,
        level: "def",
      },
    };

    if (props.debugId) this.__internals.debugId = props.debugId;
    this.setHTMLElement(props.htmlElement);
    this.__internals.element?.setAttribute("uikit-content-root", "true");
    this.loadTheme(defaultTheme);

    console.log(this.__internals.treeContext);

    if (props.fillSpace) {
      if (!this.__internals.element) return this;

      this.__internals.element.style.width = "100%";
      this.__internals.element.style.height = "100%";
    }

    return this;
  }

  loadTheme(theme: UIKitTheme) {
    this.__internals.treeContext.theme = theme;
    if (!this.__internals.element) return;

    loadThemeLevel(theme, this.__internals.element, "def");

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
  addChild(child: AnyComponentOrHTMLElement) {
    if (child.__internals.componentType === ComponentType.HTMLElement) {
      const childComponent = child as UIKitHTMLElement;
      child.__internals.parentComponent = this as unknown as ContainerComponent;
      child.__internals.treeContext = this.__internals.treeContext;
      this.__internals.element?.appendChild(childComponent.rawHtmlElement);

      return this;
    }

    const childComponent = child as AnyComponent;

    child.__internals.parentComponent = this as unknown as ContainerComponent;
    child.__internals.treeContext = this.__internals.treeContext;
    this.__internals.children?.push(childComponent);

    this.__internals.element?.appendChild(childComponent.htmlElement.rawHtmlElement);
    child.render();

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

    this.getChildren().map((child) => {
      appendComponentToElement(this.__internals.element as HTMLElement, child);

      child.render();
    });

    return this;
  }
}
