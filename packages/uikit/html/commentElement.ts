/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKHTMLElement from "../core/htmlElement";

export default class CommentElement extends UKHTMLElement {
  constructor() {
    super(document.createElement("comment"));

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
