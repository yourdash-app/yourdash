/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { SoloComponent } from "../../core/component/soloComponent.js";
import DivElement from "../../html/divElement.js";
import InputElement from "../../html/inputElement.js";
import Icon from "../icon/icon.js";
import styles from "./textInput.module.scss";

export default class TextInput extends SoloComponent {
  htmlElement: DivElement;
  inputElement!: InputElement;
  icon!: Icon;

  constructor() {
    super({});

    this.htmlElement = new DivElement();

    return this;
  }

  onChange(cb: (value: string) => void) {
    this.inputElement.rawHtmlElement.addEventListener("change", (e) => {
      cb((e.target as HTMLInputElement).value);
    });
  }

  offChange(cb: (value: string) => void) {
    this.inputElement.rawHtmlElement.removeEventListener("change", (e) => {
      cb((e.target as HTMLInputElement).value);
    });
  }

  setValue(value: string) {
    this.inputElement.rawHtmlElement.value = value;
  }

  getValue() {
    return this.inputElement.rawHtmlElement.value;
  }

  setPlaceholder(text: string) {
    this.inputElement.rawHtmlElement.placeholder = text;

    return this;
  }

  init() {
    super.init();

    this.htmlElement.addClass(styles.component);
    this.icon = this.htmlElement.addChild(Icon);
    this.icon.htmlElement.addClass(styles.icon);
    this.inputElement = this.htmlElement.addChild(InputElement);
    this.inputElement.rawHtmlElement.type = "text";
    this.inputElement.addClass(styles.input);

    this.htmlElement.addEventListener("click", () => {
      this.inputElement.rawHtmlElement.focus();
    });
  }
}
