/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { ContainerComponent } from "../../core/component/containerComponent.js";
import DivElement from "../../html/divElement.js";
import styles from "./separator.module.scss";

export default class Separator extends ContainerComponent<["actions"]> {
  constructor() {
    super(["actions"]);

    this.htmlElement = new DivElement();
    this.htmlElement.addClass(styles.component);
    this.setDirection("row");

    return this;
  }

  setDirection(direction: "row" | "column") {
    this.htmlElement.removeClasses([styles.row, styles.column]);
    this.htmlElement.addClass(styles[direction]);

    return this;
  }
}
