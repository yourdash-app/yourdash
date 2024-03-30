/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { SoloComponent } from "../core/component.js";
import ButtonElement from "../html/buttonElement.js";
import styles from "./button.module.scss";

export default class Button extends SoloComponent {
  htmlElement: ButtonElement;

  constructor() {
    super();

    this.htmlElement = new ButtonElement();

    return this;
  }

  onClick(cb: () => void) {
    this.htmlElement.onClick(cb);

    return this;
  }

  setText(text: string) {
    this.htmlElement.setInnerText(text);

    return this;
  }

  render() {
    super.render();

    const treeContext = this.__internals.treeContext;
    const level = treeContext.level;

    this.htmlElement.addClass(styles.component);

    switch (level) {
      case 0:
        this.htmlElement.addClass(styles.level0);
        break;
      case 1:
        this.htmlElement.addClass(styles.level1);
        break;
      case 2:
        this.htmlElement.addClass(styles.level2);
        break;
      default:
        this.htmlElement.addClass(styles.levelDefault);
    }

    return this;
  }
}
