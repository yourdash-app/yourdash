/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default class UIKitFramework {
  containingElement: HTMLDivElement;

  constructor(containingElement: HTMLDivElement) {
    this.containingElement = containingElement;

    return this;
  }
}
