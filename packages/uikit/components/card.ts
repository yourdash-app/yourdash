/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { ContainerComponent } from "../core/component/containerComponent.js";
import { incrementLevel } from "../core/component/incrementLevel.js";
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

    // FIXME: this should not return! an issue with contextTree propagation is lurkling somewhere...
    if (!this.__internals.treeContext.theme) return this;

    console.log("BEFORE: ", this.__internals.treeContext.level);
    incrementLevel(this);
    console.log("AFTER: ", this.__internals.treeContext.level);
    loadThemeLevel(this.__internals.treeContext.theme, this.htmlElement.rawHtmlElement, this.__internals.treeContext.level);

    this.htmlElement.setAttribute("uk-level", this.__internals.treeContext.level.toString());
    this.htmlElement.addClass(styles.component);

    return this;
  }
}
