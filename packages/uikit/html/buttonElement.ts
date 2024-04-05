/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKHTMLElement from "../core/htmlElement.js";

export default class ButtonElement extends UKHTMLElement {
  constructor() {
    super(document.createElement("button"));

    return this;
  }

  onClick(cb: () => void) {
    this.rawHtmlElement.onclick = cb;

    return this;
  }

  click() {
    this.rawHtmlElement.click();

    return this;
  }
}
