/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Component, { ComponentType } from "../core/component";

export default class Text extends Component<ComponentType.Solo> {
  constructor() {
    super(ComponentType.Solo, { debugId: "text-test-component" });

    return this;
  }

  public render() {
    super.render();

    return this;
  }
}
