/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import State from "./state";
import UKComponent, { UKComponentProps, UKComponentSlots, UKComponentState } from "./component";

export default class UKComponentSlot extends State<UKComponent<UKComponentProps, UKComponentState, UKComponentSlots>> {
  domElement: HTMLElement

  constructor(containingDomElement: HTMLElement) {
    super();

    this.domElement = containingDomElement
  }

  createComponent(component: typeof UKComponent<UKComponentProps, UKComponentState, UKComponentSlots>, props: UKComponentProps) {
    const comp = new component(props)

    comp.parentDomElement = this.domElement
    comp.parentDomElement.appendChild(comp.domElement)

    return comp
  }

  addComponent(component: UKComponent<UKComponentProps, UKComponentState, UKComponentSlots>) {
    component.parentDomElement = this.domElement
    component.parentDomElement.appendChild(component.domElement)

    return component
  }
}