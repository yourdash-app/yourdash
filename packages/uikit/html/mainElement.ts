/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UIKitHTMLElement from "../core/htmlElement";

export default class MainElement extends UIKitHTMLElement {
  constructor() {
    super(document.createElement("main"));

    return this;
  }

  addChild(childElement: UIKitHTMLElement) {
    this.rawHtmlElement.appendChild(childElement.rawHtmlElement);
    return this;
  }

  setInnerText(text: string) {
    this.rawHtmlElement.innerText = text;
    return this;
  }

  dangerouslySetInnerHTML(html: string) {
    this.rawHtmlElement.innerHTML = html;
    return this;
  }
}
