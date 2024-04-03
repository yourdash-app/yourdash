/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { SoloComponent } from "../../core/component/soloComponent.js";
import ButtonElement from "../../html/buttonElement.js";
import Icon from "../icon/icon.js";
import styles from "./iconButton.module.scss";

export default class IconButton extends SoloComponent {
  htmlElement: ButtonElement;
  icon: Icon;

  constructor() {
    super();

    this.htmlElement = new ButtonElement();
    this.htmlElement.addClass(styles.component);
    this.icon = new Icon();
    this.htmlElement.addChild(this.icon);

    this.icon.setSize("1.5rem");

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
