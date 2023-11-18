/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKComponent, { UKComponentSlots, UKComponentState } from "./component";
import State from "./state";

export default class UKComponentSlot extends State<UKComponent<UKComponentState, UKComponentSlots>> {
  domElement: HTMLElement

  constructor( domElement: HTMLElement ) {
    super();

    this.domElement = domElement
  }

  createComponent<T extends UKComponent>( component: new ( props: T["props"] ) => T, props: T["props"] ) {
    const comp = new component( props )

    comp.parentDomElement = this.domElement
    comp.parentDomElement.appendChild( comp.domElement )

    return comp
  }

  add( component: UKComponent ) {
    component.parentDomElement = this.domElement
    component.parentDomElement.appendChild( component.domElement )

    return component
  }
}
