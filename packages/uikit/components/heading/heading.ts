/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { SoloComponent } from "../../core/component/soloComponent.js";
import HeadingElement from "../../html/headingElement.js";
import styles from "./heading.module.scss";

export default class Heading extends SoloComponent {
  htmlElement: HeadingElement;
  textValue: string = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, nobis?";
  level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
  declare props: { text?: string; level?: Heading["level"] };

  constructor(props: Heading["props"] = {}) {
    super(props);

    this.htmlElement = new HeadingElement();

    return this;
  }

  setLevel(level: Heading["level"]) {
    this.htmlElement.setLevel(level);
    this.setText(this.textValue);

    return this;
  }

  public setText(text: string) {
    this.textValue = text;
    this.htmlElement.setInnerText(this.textValue);

    return this;
  }

  init() {
    super.init();

    const props = this.props;

    this.htmlElement.addClass(styles.component);

    if (props.text) this.setText(props.text);
    if (props.level) this.setLevel(props.level);
  }
}
