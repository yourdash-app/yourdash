/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export enum UIKitFrameworkType {
  AcceleratedGPU = 1,
  HTML,
  Indifferent,
}

export default class UIKitFramework {
  containingElement: HTMLDivElement;
  frameworkType: UIKitFrameworkType;

  constructor(frameworkType: UIKitFrameworkType, containingElement: HTMLDivElement) {
    this.containingElement = containingElement;
    this.frameworkType = frameworkType;

    return this;
  }
}
