/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default class UKElement {
  private HTML_ELEMENT: HTMLElement;
  outerHTML: string;
  innerHTML: string;
  tagName: string;
  attributes: { [ name: string ]: string };
  inlineStyle: CSSStyleDeclaration;
  class: string;
  
  constructor() {
    this.HTML_ELEMENT = document.createElement( "div" );
    this.innerHTML = this.HTML_ELEMENT.innerHTML;
    this.outerHTML = this.HTML_ELEMENT.outerHTML;
    this.tagName = this.HTML_ELEMENT.tagName;
    this.HTML_ELEMENT.style.font
    this.attributes = this.HTML_ELEMENT.attributes;
    this.inlineStyle = this.HTML_ELEMENT.style;
    this.class = "";
  }
}
