/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { ContainerComponent } from "../../core/component/containerComponent.js";
import DivElement from "../../html/divElement.js";
import styles from "./box.module.scss";
import { loadThemeLevel } from "../../core/theme.js";

export default class Box extends ContainerComponent<["actions"]> {
  htmlElement: DivElement;

  constructor() {
    super(["actions"]);

    this.htmlElement = new DivElement();

    return this;
  }

  init() {
    super.init();

    if (this.__internals.treeContext.level <= 3) {
      // @ts-ignore
      this.__internals.treeContextChildOverrides.level = this.__internals.treeContext.level + 1;
    }

    loadThemeLevel(this.htmlElement.rawHtmlElement, this.__internals.treeContext.level);

    this.htmlElement.setAttribute("uk-level", this.__internals.treeContext.level.toString());
    this.htmlElement.addClass(styles.component);
  }
}
