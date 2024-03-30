/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid";
import { DefaultComponentTreeContext, AnyComponent, AnyComponentOrHTMLElement } from "@yourdash/uikit/core/component";
import defaultTheme, { UIKitTheme } from "../components/theme.js";
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
        level: 0,
      },
    };

    if (props.debugId) this.__internals.debugId = props.debugId;
    this.setHTMLElement(props.htmlElement);
    this.__internals.element?.setAttribute("uikit-content-root", "true");
    this.loadTheme(defaultTheme);

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
      this.__internals.element.style.setProperty(`${varName}gap`, themeAccessor.gap);

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

      // button font
      this.__internals.element.style.setProperty(`${varName}button-font-family`, themeAccessor.button.font.family);
      this.__internals.element.style.setProperty(`${varName}button-font-size`, themeAccessor.button.font.size);
      this.__internals.element.style.setProperty(`${varName}button-font-weight`, themeAccessor.button.font.weight);

      // button padding
      this.__internals.element.style.setProperty(`${varName}button-padding-vertical`, themeAccessor.button.padding.vertical);
      this.__internals.element.style.setProperty(`${varName}button-padding-horizontal`, themeAccessor.button.padding.horizontal);

      // button hover
      this.__internals.element.style.setProperty(`${varName}button-hover-fg`, themeAccessor.button.hover.fg);
      this.__internals.element.style.setProperty(`${varName}button-hover-bg`, themeAccessor.button.hover.bg);
      this.__internals.element.style.setProperty(`${varName}button-hover-border`, themeAccessor.button.hover.border);
      this.__internals.element.style.setProperty(`${varName}button-hover-shadow`, themeAccessor.button.hover.shadow);
      this.__internals.element.style.setProperty(`${varName}button-hover-radius`, themeAccessor.button.hover.radius);

      // button active
      this.__internals.element.style.setProperty(`${varName}button-active-fg`, themeAccessor.button.active.fg);
      this.__internals.element.style.setProperty(`${varName}button-active-bg`, themeAccessor.button.active.bg);
      this.__internals.element.style.setProperty(`${varName}button-active-border`, themeAccessor.button.active.border);
      this.__internals.element.style.setProperty(`${varName}button-active-shadow`, themeAccessor.button.active.shadow);
      this.__internals.element.style.setProperty(`${varName}button-active-radius`, themeAccessor.button.active.radius);
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
    appendComponentToElement(this.__internals.element as HTMLElement, child);
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

    this.getChildren().map((child) => {
      appendComponentToElement(this.__internals.element as HTMLElement, child);

      child.render();
    });

    return this;
  }
}
