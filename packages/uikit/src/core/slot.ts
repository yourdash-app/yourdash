/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKComponent } from "./component";
import State from "./state";

export default class UKComponentSlot<ValidComponentType extends UKComponent> extends State<ValidComponentType | undefined> {
  placeholderDomElement: HTMLElement
  __internal__value: ValidComponentType | undefined
  domElement: HTMLElement

  constructor( placeholderDomElement: HTMLElement,  ) {
    super();

    this.placeholderDomElement = placeholderDomElement
    this.domElement = this.placeholderDomElement
    this.__internal__value = undefined;
  }

  createComponent<T extends ValidComponentType>( component: new ( props: T[ "props" ] ) => T, props: T[ "props" ] ) {
    this.__internal__value = new component( props );
    this.placeholderDomElement.appendChild( this.__internal__value.domElement );

    return this.__internal__value;
  }

  clear() {
    this.placeholderDomElement.innerHTML = "";
    this.__internal__value = undefined;

    return this
  }
}
