/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { SoloComponent } from "../../core/component/soloComponent.js";
import ButtonElement from "../../html/buttonElement.js";
import Icon from "../icon/icon.js";
import styles from "./iconButton.module.scss";

export default class IconButton extends SoloComponent {
  htmlElement: ButtonElement;
  icon: Icon;

  constructor(icon?: IconButton["icon"]["icon"], onClick?: () => void) {
    super();

    this.htmlElement = new ButtonElement();
    this.htmlElement.addClass(styles.component);
    this.icon = new Icon();
    this.htmlElement.addChild(this.icon);

    this.icon.setSize("1.25rem");

    if (icon) this.setIcon(icon);
    if (onClick) this.onClick(onClick);

    return this;
  }

  setIcon(icon: IconButton["icon"]["icon"]) {
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
}
