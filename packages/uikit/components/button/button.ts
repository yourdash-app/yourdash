/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { SoloComponent } from "../../core/component/soloComponent.js";
import ButtonElement from "../../html/buttonElement.js";
import SpanElement from "../../html/spanElement.js";
import styles from "./button.module.scss";

export default class Button extends SoloComponent {
  htmlElement: ButtonElement;
  declare props: { text?: string; onClick?: () => void };
  labelElement!: SpanElement;

  constructor(props: Button["props"] = {}) {
    super(props);

    this.htmlElement = new ButtonElement();

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

  init() {
    super.init();

    const props = this.props;

    this.htmlElement.addClass(styles.component);
    this.labelElement = this.htmlElement.addChild(SpanElement);

    if (props.text) this.setText(props.text);
    if (props.onClick) this.onClick(props.onClick);
  }
}
