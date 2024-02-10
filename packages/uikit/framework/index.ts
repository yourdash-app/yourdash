/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UIKitRawComponent } from "./component";

export enum UIKitFrameworkType {
  AcceleratedGPU = 1,
  HTML,
  Indifferent,
}

export default class UIKitFramework {
  containingElement: HTMLDivElement;
  frameworkType: UIKitFrameworkType;
  components: UIKitRawComponent[] = [];

  constructor(frameworkType: UIKitFrameworkType, containingElement: HTMLDivElement) {
    this.containingElement = containingElement;
    this.frameworkType = frameworkType;

    return this;
  }

  add(component: UIKitRawComponent) {
    this.components.push(component);

    return this;
  }
}
