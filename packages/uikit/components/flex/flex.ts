/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { ContainerComponent } from "../../core/component/containerComponent.js";
import DivElement from "../../html/divElement.js";
import styles from "./flex.module.scss";

export default class Flex extends ContainerComponent {
  htmlElement: DivElement;
  declare props: { direction?: "row" | "column" };

  constructor(props: Flex["props"] = {}) {
    super(props);

    this.htmlElement = new DivElement();

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

  init() {
    super.init();

    const props = this.props;

    this.htmlElement.setAttribute("flexbutwhy", "");
    this.htmlElement.addClass(styles.component);

    if (props.direction) this.setDirection(props.direction);
  }
}
