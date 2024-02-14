/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/web-client/src/helpers/uuid";
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

  add<TComponent extends UIKitRawComponent>(component: TComponent) {
    component.__internal__.debug = { uuid: generateUUID() };
    component.__internal__.ukContext = this;

    component.init();

    this.components.push(component);

    return this;
  }
}
