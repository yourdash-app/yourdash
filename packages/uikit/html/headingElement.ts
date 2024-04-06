/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKHTMLElement from "../core/htmlElement.js";

export default class HeadingElement extends UKHTMLElement<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6 = 1;

  constructor() {
    super(document.createElement("h1"));

    this.setLevel(1);

    return this;
  }

  setLevel(level: HeadingElement["level"]) {
    this.level = level;

    const previousElement = this.rawHtmlElement;
    this.rawHtmlElement = document.createElement(`h${this.level}`);

    previousElement.getAttributeNames().forEach((name) => {
      this.rawHtmlElement.setAttribute(name, previousElement.getAttribute(name) as string);
    });

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
