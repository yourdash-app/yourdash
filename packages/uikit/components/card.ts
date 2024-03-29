/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { ContainerComponent } from "../core/component";
import Div from "../html/div.js";
import styles from "./card.module.scss";

export default class Card extends ContainerComponent<["actions"]> {
  level: "default" | 0 | 1 | 2;

  constructor() {
    super(["actions"]);

    this.htmlElement = new Div();
    this.level = 0;

    return this;
  }

  setLevel(level: Card["level"]) {
    this.level = level;

    return this;
  }

  public render() {
    super.render();

    const treeContext = this.__internals.treeContext;
    const level = this.level ?? treeContext.level;

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
