/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { SoloComponent } from "../core/component";

export default class Text extends SoloComponent {
  textValue: string = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, nobis?";

  constructor() {
    super({ debugId: "text-test-component" });

    this.htmlElement = document.createElement("div");

    return this;
  }

  public setText(text: string) {
    this.textValue = text;
    this.htmlElement.innerText = this.textValue;

    return this;
  }

  public render() {
    super.render();

    this.htmlElement.innerText = this.textValue;
    this.htmlElement.style.fontWeight = this.__internals.treeContext?.theme?.default.font.weight ?? "normal";
    this.htmlElement.style.fontSize = this.__internals.treeContext?.theme?.default.font.size ?? "1rem";
    this.htmlElement.style.fontFamily = this.__internals.treeContext?.theme?.default.font.family ?? "Inter";

    return this;
  }
}
