/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid";
import { UIKitRawComponent } from "./component";
import styles from "./index.module.scss";

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
    this.containingElement.innerHTML = "";
    this.containingElement.setAttribute("uikit-root", "true");
    this.containingElement.classList.add(styles.framework);

    return this;
  }

  add<TComponent extends UIKitRawComponent>(component: TComponent) {
    component.__internal__.debug = { uuid: generateUUID() };
    component.__internal__.ukContext = this;

    component.init();

    this.components.push(component);
    this.containingElement.appendChild(component.__internal__.htmlElement);

    return this;
  }
}
