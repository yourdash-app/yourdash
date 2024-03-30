/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { ContainerComponent, incrementLevel } from "../core/component";
import DivElement from "../html/divElement";
import styles from "./card.module.scss";

export default class Card extends ContainerComponent<["actions"]> {
  constructor() {
    super(["actions"]);

    this.htmlElement = new DivElement();

    return this;
  }

  public render() {
    super.render();

    const treeContext = this.__internals.treeContext;
    const level = treeContext.level;

    incrementLevel(this);

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
