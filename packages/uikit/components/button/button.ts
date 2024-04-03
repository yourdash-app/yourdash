/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { SoloComponent } from "../../core/component/soloComponent.js";
import ButtonElement from "../../html/buttonElement.js";
import SpanElement from "../../html/spanElement.js";
import styles from "./button.module.scss";

export default class Button extends SoloComponent {
  htmlElement: ButtonElement;
  labelElement: SpanElement;

  constructor() {
    super();

    this.htmlElement = new ButtonElement();
    this.htmlElement.addClass(styles.component);
    this.labelElement = new SpanElement();
    this.htmlElement.addChild(this.labelElement);

    return this;
  }

  onClick(cb: () => void) {
    this.htmlElement.onClick(cb);

    return this;
  }

  click() {
    this.htmlElement.click();
  }

  setText(text: string) {
    this.labelElement.setInnerText(text);

    return this;
  }
}
