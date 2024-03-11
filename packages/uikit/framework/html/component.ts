/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import {
  UIKitRawComponent,
  UIKitRawComponentGenericPropsDefaultValue,
  UIKitRawComponentGenericPropsType,
  UIKitRawComponentInternals,
} from "../component";
import { UIKitFrameworkType } from "../index";
import UIKitDataStore from "../store";
import { UIKitHTMLElementEvents } from "./elementEvents";

interface UIKitHTMLComponentInternals extends UIKitRawComponentInternals {
  children: UIKitHTMLComponent[];
}

export default class UIKitHTMLComponent<
  PropType extends UIKitRawComponentGenericPropsType = UIKitRawComponentGenericPropsDefaultValue,
> extends UIKitRawComponent<PropType, UIKitHTMLComponentInternals> {
  events: UIKitDataStore<UIKitHTMLElementEvents>;

  constructor(props: PropType) {
    super(props, UIKitFrameworkType.HTML);

    this.__internal__.children = [];
    this.events = new UIKitDataStore<UIKitHTMLElementEvents>({});

    return this;
  }

  clearChildren() {
    this.__internal__.htmlElement.innerHTML = "";
  }

  addChild(component: UIKitHTMLComponent) {
    this.__internal__.htmlElement.appendChild(component.__internal__.htmlElement);
    return this;
  }

  removeChild(component: UIKitHTMLComponent) {
    this.__internal__.htmlElement.removeChild(component.__internal__.htmlElement);
    return this;
  }

  getHTMLElement() {
    return this.__internal__.htmlElement;
  }

  init() {
    return this;
  }
}
