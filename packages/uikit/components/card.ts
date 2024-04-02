/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { ContainerComponent } from "../core/component/containerComponent.js";
import DivElement from "../html/divElement";
import styles from "./card.module.scss";
import { loadThemeLevel } from "./theme.js";

export default class Card extends ContainerComponent<["actions"]> {
  constructor() {
    super(["actions"]);

    this.htmlElement = new DivElement();

    return this;
  }

  public render() {
    super.render();

    loadThemeLevel(this.htmlElement.rawHtmlElement, this.__internals.treeContext.level);

    this.htmlElement.setAttribute("uk-level", this.__internals.treeContext.level.toString());
    this.htmlElement.addClass(styles.component);

    return this;
  }
}
