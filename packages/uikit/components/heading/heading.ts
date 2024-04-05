/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { SoloComponent } from "../../core/component/soloComponent.js";
import DivElement from "../../html/divElement.js";
import styles from "./text.module.scss";

export default class Heading extends SoloComponent {
  htmlElement: DivElement;
  textValue: string = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, nobis?";
  level: 1 | 2 | 3 | 4 | 5 | 6 = 1;

  constructor() {
    super();

    this.htmlElement = new HeadingElement();
    this.htmlElement.setInnerText(this.textValue);
    this.htmlElement.addClass(styles.component);

    return this;
  }

  public setText(text: string) {
    this.textValue = text;
    this.htmlElement.setInnerText(this.textValue);

    return this;
  }
}
