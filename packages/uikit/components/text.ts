/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Component, { ComponentType } from "../core/component";

export default class Text extends Component<ComponentType.Solo> {
  textValue: string = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, nobis?";

  constructor() {
    super(ComponentType.Solo, { debugId: "text-test-component" });

    return this;
  }

  public setText(text: string) {
    this.textValue = text;
    this.htmlElement.innerText = this.textValue;

    return this;
  }

  public render() {
    super.render();
    this.htmlElement.innerText = this.textValue;

    return this;
  }
}
