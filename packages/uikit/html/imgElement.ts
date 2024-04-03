/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKHTMLElement from "../core/htmlElement";

export default class ImgElement extends UKHTMLElement {
  declare rawHtmlElement: HTMLImageElement;

  constructor() {
    super(document.createElement("img"));

    return this;
  }

  setSrc(src: string) {
    this.rawHtmlElement.src = src;

    return this;
  }

  getSrc(): string {
    return this.rawHtmlElement.src;
  }

  setSrcSet(srcset: string) {
    this.rawHtmlElement.srcset = srcset;

    return this;
  }

  dangerouslySetInnerHTML(html: string) {
    this.rawHtmlElement.innerHTML = html;
    return this;
  }

  render() {
    super.render();

    return this;
  }
}
