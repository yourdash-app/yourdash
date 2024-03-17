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
    this.__internals.underlyingHTMLElement.appendChild(childElement.__internals.underlyingHTMLElement);
    return this;
  }

  setInnerText(text: string) {
    this.__internals.underlyingHTMLElement.innerText = text;
    return this;
  }

  dangerouslySetInnerHTML(html: string) {
    this.__internals.underlyingHTMLElement.innerHTML = html;
    return this;
  }
}
