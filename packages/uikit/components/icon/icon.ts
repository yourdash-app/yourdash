/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary.js";
import { SoloComponent } from "../../core/component/soloComponent.js";
import DivElement from "../../html/divElement.js";
import styles from "./icon.module.scss";

export default class Icon extends SoloComponent {
  htmlElement: DivElement;
  declare props: { icon?: UKIcon };

  constructor(props: Icon["props"] = {}) {
    super(props);

    this.htmlElement = new DivElement();

    return this;
  }

  setIcon(icon: UKIcon) {
    this.htmlElement.setStyleVariable("--icon", `url(${icon})`);

    return this;
  }

  setPreserveColor(preserve: boolean) {
    if (preserve) {
      this.htmlElement.addClass(styles.preserveColor);
    } else {
      this.htmlElement.removeClass(styles.preserveColor);
    }

    return this;
  }

  setColor(color: string) {
    this.htmlElement.setStyleVariable("--color", color);
    return this;
  }

  clearColor() {
    this.htmlElement.clearStyleVariable("--color");

    return this;
  }

  setSize(size: string) {
    this.htmlElement.setStyleVariable("--size", size);

    return this;
  }

  init() {
    super.init();

    const props = this.props;

    this.htmlElement.addClass(styles.component);

    if (props.icon) this.setIcon(props.icon);
  }
}
