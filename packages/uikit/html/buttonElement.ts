/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKHTMLElement from "../core/htmlElement";

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
