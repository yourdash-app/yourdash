/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { SoloComponent } from "../core/component/soloComponent.js";
import DivElement from "../html/divElement";
import styles from "./text.module.scss";

export default class Text extends SoloComponent {
  htmlElement: DivElement;
  textValue: string = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, nobis?";

  constructor() {
    super();

    this.htmlElement = new DivElement();

    return this;
  }

  public setText(text: string) {
    this.textValue = text;
    this.htmlElement.setInnerText(this.textValue);

    return this;
  }

  public render() {
    this.htmlElement.setInnerText(this.textValue);

    this.htmlElement.addClass(styles.component);

    return this;
  }
}
