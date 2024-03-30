/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { SoloComponent } from "../core/component";
import DivElement from "../html/divElement";
import styles from "./text.module.scss";

export default class Text extends SoloComponent {
  htmlElement: DivElement;
  textValue: string = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, nobis?";

  constructor() {
    super({ debugId: "text-test-component" });

    this.htmlElement = new DivElement();

    return this;
  }

  public setText(text: string) {
    this.textValue = text;
    this.htmlElement.setInnerText(this.textValue);

    return this;
  }

  public render() {
    super.render();

    this.htmlElement.setInnerText(this.textValue);

    const treeContext = this.__internals.treeContext;
    const level = this.__internals.treeContext.level ?? treeContext.level;

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
