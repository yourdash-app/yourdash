/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { ContainerComponent } from "../../core/component/containerComponent.js";
import DivElement from "../../html/divElement.js";
import styles from "./flex.module.scss";

export default class Flex extends ContainerComponent {
  constructor(direction?: "row" | "column") {
    super();

    this.htmlElement = new DivElement();
    this.htmlElement.addClass(styles.component);

    if (direction) this.setDirection(direction);

    return this;
  }

  setDirection(direction: "row" | "column") {
    this.htmlElement.removeClasses([styles.row, styles.column]);

    switch (direction) {
      case "row":
        this.htmlElement.addClass(styles.row);
        break;
      case "column":
        this.htmlElement.addClass(styles.column);
        break;
      default:
        break;
    }

    return this;
  }

  setWrap(wrap: boolean) {
    if (wrap) {
      this.htmlElement.addClass(styles.wrap);
    } else {
      this.htmlElement.removeClass(styles.wrap);
    }

    return this;
  }

  setGap(gap: boolean) {
    if (gap) {
      this.htmlElement.removeClass(styles.noGap);
    } else {
      this.htmlElement.addClass(styles.noGap);
    }

    return this;
  }
}
