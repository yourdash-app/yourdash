/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { SoloComponent } from "../../core/component/soloComponent.js";
import DivElement from "../../html/divElement.js";
import styles from "./separator.module.scss";

export default class Separator extends SoloComponent {
  htmlElement: DivElement;
  declare props: { direction?: "row" | "column" };

  constructor(props: Separator["props"] = {}) {
    super(props);

    this.htmlElement = new DivElement();

    return this;
  }

  setDirection(direction: "row" | "column") {
    this.htmlElement.removeClasses([styles.row, styles.column]);
    this.htmlElement.addClass(styles[direction]);

    return this;
  }

  init() {
    super.init();

    const props = this.props;

    this.htmlElement.addClass(styles.component);
    this.setDirection("row");

    if (props.direction) this.setDirection(props.direction);
  }
}
