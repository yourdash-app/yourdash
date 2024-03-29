/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid";
import { ComponentType, DefaultComponentTreeContext, AnyComponent, AnyComponentOrHTMLElement } from "@yourdash/uikit/core/component";
import defaultTheme, { UIKitTheme } from "../components/theme.js";
import UIKitHTMLElement from "./htmlElement";
import { appendComponentToElement } from "./index.js";

export interface ContentRootProps {
  htmlElement: HTMLElement;
  debugId?: string;
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
        level: 0,
      },
    };

    if (props.debugId) this.__internals.debugId = props.debugId;
    this.setHTMLElement(props.htmlElement);
    this.__internals.element?.setAttribute("uikit-content-root", "true");
    this.loadTheme(defaultTheme);

    return this;
  }

  loadTheme(theme: UIKitTheme) {
    this.__internals.treeContext.theme = theme;
    if (!this.__internals.element) return;

    const loadLevel = (levelName: "default" | 0 | 1 | 2) => {
      if (!this.__internals.element) return;

      const varName = `--ukt-${levelName}-`;
      let themeAccessor = theme.level[levelName as keyof typeof theme.level];
      if (levelName === "default") {
        themeAccessor = theme.default;
      }

      // various
      this.__internals.element.style.setProperty(`${varName}fg`, themeAccessor.fg);
      this.__internals.element.style.setProperty(`${varName}bg`, themeAccessor.bg);
      this.__internals.element.style.setProperty(`${varName}border`, themeAccessor.border);
      this.__internals.element.style.setProperty(`${varName}shadow`, themeAccessor.shadow);
      this.__internals.element.style.setProperty(`${varName}accent`, themeAccessor.accent);
      this.__internals.element.style.setProperty(`${varName}radius`, themeAccessor.radius);
      this.__internals.element.style.setProperty(`${varName}padding`, themeAccessor.padding);

      // font
      this.__internals.element.style.setProperty(`${varName}font-family`, themeAccessor.font.family);
      this.__internals.element.style.setProperty(`${varName}font-size`, themeAccessor.font.size);
      this.__internals.element.style.setProperty(`${varName}font-weight`, themeAccessor.font.weight);

      // header various
      this.__internals.element.style.setProperty(`${varName}header-fg`, themeAccessor.header.fg);

      // header font
      this.__internals.element.style.setProperty(`${varName}header-font-family`, themeAccessor.header.font.family);
      this.__internals.element.style.setProperty(`${varName}header-font-size`, themeAccessor.header.font.size);
      this.__internals.element.style.setProperty(`${varName}header-font-weight`, themeAccessor.header.font.weight);

      // header padding
      this.__internals.element.style.setProperty(`${varName}header-padding-vertical`, themeAccessor.header.padding.vertical);
      this.__internals.element.style.setProperty(`${varName}header-padding-horizontal`, themeAccessor.header.padding.horizontal);

      // button various
      this.__internals.element.style.setProperty(`${varName}button-fg`, themeAccessor.button.fg);
      this.__internals.element.style.setProperty(`${varName}button-bg`, themeAccessor.button.bg);
      this.__internals.element.style.setProperty(`${varName}button-border`, themeAccessor.button.border);
      this.__internals.element.style.setProperty(`${varName}button-radius`, themeAccessor.button.radius);
      this.__internals.element.style.setProperty(`${varName}button-shadow`, themeAccessor.button.shadow);
      this.__internals.element.style.setProperty(`${varName}button-accent`, themeAccessor.button.accent);

      // button font
      this.__internals.element.style.setProperty(`${varName}button-font-family`, themeAccessor.button.font.family);
      this.__internals.element.style.setProperty(`${varName}button-font-size`, themeAccessor.button.font.size);
      this.__internals.element.style.setProperty(`${varName}button-font-weight`, themeAccessor.button.font.weight);

      // button padding
      this.__internals.element.style.setProperty(`${varName}button-padding-vertical`, themeAccessor.button.padding.vertical);
      this.__internals.element.style.setProperty(`${varName}button-padding-horizontal`, themeAccessor.button.padding.horizontal);
    };

    loadLevel("default");
    loadLevel(0);
    loadLevel(1);
    loadLevel(2);

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
      this.__internals.element?.appendChild(childComponent.rawHtmlElement);
      return;
    }

    const childComponent = child as AnyComponent;
    this.__internals.element?.appendChild(childComponent.htmlElement.rawHtmlElement);
    this.__internals.children.push(childComponent);

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
