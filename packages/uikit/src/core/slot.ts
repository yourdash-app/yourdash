/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import State from "./state";
import UKComponent, { UKComponentSlots, UKComponentState } from "./component";

export default class UKComponentSlot extends State<UKComponent<UKComponentState, UKComponentSlots>> {
  domElement: HTMLElement

  constructor( containingDomElement: HTMLElement ) {
    super();

    this.domElement = containingDomElement
  }

  createComponent<T extends UKComponent>( component: new ( props: T["props"] ) => T, props: T["props"] ) {
    const comp = new component( props )

    comp.parentDomElement = this.domElement
    comp.parentDomElement.appendChild( comp.domElement )

    return comp
  }

  addComponent( component: UKComponent ) {
    component.parentDomElement = this.domElement
    component.parentDomElement.appendChild( component.domElement )

    return component
  }
}
