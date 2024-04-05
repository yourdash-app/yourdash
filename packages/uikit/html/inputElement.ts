/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKHTMLElement from "../core/htmlElement.js";

export default class InputElement extends UKHTMLElement<HTMLInputElement> {
  constructor() {
    super(document.createElement("input"));

    return this;
  }

  getValue(): string {
    return this.rawHtmlElement.value;
  }

  setValue(value: string) {
    this.rawHtmlElement.value = value;
    return this;
  }

  setPlaceholder(placeholder: string) {
    this.rawHtmlElement.placeholder = placeholder;
    return this;
  }

  setDisabled(disabled: boolean) {
    this.rawHtmlElement.disabled = disabled;
    return this;
  }

  setReadOnly(readOnly: boolean) {
    this.rawHtmlElement.readOnly = readOnly;
    return this;
  }

  setMaxLength(maxLength: number) {
    this.rawHtmlElement.maxLength = maxLength;
    return this;
  }

  setRequired(required: boolean) {
    this.rawHtmlElement.required = required;
    return this;
  }

  setAutofocus(autofocus: boolean) {
    this.rawHtmlElement.autofocus = autofocus;
    return this;
  }

  setAutocomplete(autocomplete: string) {
    // @ts-ignore
    this.rawHtmlElement.autocomplete = autocomplete;
    return this;
  }
}
