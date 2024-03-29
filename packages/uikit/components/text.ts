/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { SoloComponent } from "../core/component";
import Div from "../html/div.js";

export default class Text extends SoloComponent {
  htmlElement: Div;
  textValue: string = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, nobis?";

  constructor() {
    super({ debugId: "text-test-component" });

    this.htmlElement = new Div();

    return this;
  }

  public setText(text: string) {
    this.textValue = text;
    this.htmlElement.setInnerText(this.textValue);

    return this;
  }

  public render() {
    super.render();

    this.htmlElement.setInnerText(this.textValue);
    this.htmlElement.setStyle("fontWeight", this.__internals.treeContext?.theme?.default.font.weight ?? "normal");
    this.htmlElement.setStyle("fontSize", this.__internals.treeContext?.theme?.default.font.size ?? "1rem");
    this.htmlElement.setStyle("fontFamily", this.__internals.treeContext?.theme?.default.font.family ?? "Inter");

    return this;
  }
}
