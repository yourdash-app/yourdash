/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary.js";
import { SoloComponent } from "../../core/component/soloComponent.js";
import ButtonElement from "../../html/buttonElement.js";
import Icon from "../icon/icon.js";
import styles from "./iconButton.module.scss";

export default class IconButton extends SoloComponent {
  htmlElement: ButtonElement;
  declare props: { icon?: UKIcon; onClick?: () => void };
  icon!: Icon;

  constructor(props: IconButton["props"] = {}) {
    super(props);

    this.htmlElement = new ButtonElement();

    return this;
  }

  setIcon(icon: UKIcon) {
    this.icon.setIcon(icon);

    return this;
  }

  onClick(cb: () => void) {
    this.htmlElement.onClick(cb);

    return this;
  }

  click() {
    this.htmlElement.click();
  }

  init() {
    super.init();

    const props = this.props;

    this.htmlElement.addClass(styles.component);
    this.icon = this.htmlElement.addChild(Icon);
    this.icon.setSize("1.25rem");

    if (props.icon) this.setIcon(props.icon);
    if (props.onClick) this.onClick(props.onClick);
  }
}
