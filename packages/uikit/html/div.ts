/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UIKitHTMLElement from "../core/htmlElement";

export default class Div extends UIKitHTMLElement {
  constructor() {
    super(document.createElement("div"));

    return this;
  }

  addChild(childElement: UIKitHTMLElement) {
    this.htmlElement.appendChild(childElement.htmlElement);
    return this;
  }

  setInnerText(text: string) {
    this.htmlElement.innerText = text;
    return this;
  }

  dangerouslySetInnerHTML(html: string) {
    this.htmlElement.innerHTML = html;
    return this;
  }
}
