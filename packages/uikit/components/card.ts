/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Component, { ComponentType } from "../core/component";
import defaultTheme from "./theme.js";

export default class Card extends Component<ComponentType.Container> {
  level: 0 | 1 | 2;

  constructor() {
    super(ComponentType.Container, { debugId: "text-test-component" });

    this.htmlElement = document.createElement("div");
    this.level = 0;

    return this;
  }

  setLevel(level: Card["level"]) {
    this.level = level;

    return this;
  }

  public render() {
    super.render();

    const treeContext = this.__internals.treeContext;
    const level = this.level ?? treeContext.level;

    this.htmlElement.style.boxSizing = "border-box";
    this.htmlElement.style.fontWeight = treeContext?.theme?.level[level].font.weight ?? defaultTheme.level[level].font.weight;
    this.htmlElement.style.fontSize = treeContext?.theme?.level[level].font.size ?? defaultTheme.level[level].font.size;
    this.htmlElement.style.fontFamily = treeContext?.theme?.level[level].font.family ?? defaultTheme.level[level].font.family;
    this.htmlElement.style.background = treeContext?.theme?.level[level].bg ?? defaultTheme.level[level].bg;
    this.htmlElement.style.border = treeContext?.theme?.level[level].border ?? defaultTheme.level[level].border;
    this.htmlElement.style.boxShadow = treeContext?.theme?.level[level].shadow ?? defaultTheme.level[level].shadow;
    this.htmlElement.style.padding = treeContext?.theme?.level[level].padding ?? defaultTheme.level[level].padding;
    this.htmlElement.style.borderRadius = treeContext?.theme?.level[level].radius ?? defaultTheme.level[level].radius;

    return this;
  }
}
