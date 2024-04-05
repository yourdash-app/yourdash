/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { SoloComponent } from "../../core/component/soloComponent.js";
import InputElement from "../../html/inputElement.js";

export default class TextInput extends SoloComponent {
  htmlElement: InputElement;

  constructor() {
    super();

    this.htmlElement = new InputElement();
    this.htmlElement.rawHtmlElement.type = "text";

    return this;
  }
}
