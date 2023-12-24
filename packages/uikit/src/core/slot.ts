/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKComponent, UKComponentSlotsProcessed } from "./component";
import UIKit from "./index.ts";
import State from "./state";

export default class UKComponentSlot<ValidComponentType extends UKComponent> extends State<ValidComponentType | undefined> {
  __internal__value: ValidComponentType | undefined
  containerDomElement: HTMLElement

  constructor( containerDomElement: HTMLElement ) {
    super();

    this.containerDomElement = containerDomElement
    this.__internal__value = undefined;
    this.onChange( () => {
      if ( this.__internal__value ) {
        UIKit.renderComponent( this.__internal__value, this.containerDomElement );
      }
    } )
  }

  renderComponent<T extends ValidComponentType>( component: new ( props: T[ "props" ] ) => T, props: T[ "props" ], slots?: UKComponentSlotsProcessed<T["slots"]> ) {
    this.__internal__value = UIKit.createComponent( component, props, slots );
    UIKit.renderComponent( this.__internal__value, this.containerDomElement );
  }

  createComponent<T extends ValidComponentType>( component: new ( props: T[ "props" ] ) => T, props: T[ "props" ], slots?: UKComponentSlotsProcessed<T["slots"]> ) {
    this.__internal__value = UIKit.createComponent( component, props, slots );
    UIKit.renderComponent( this.__internal__value, this.containerDomElement );

    return this.__internal__value;
  }

  clear() {
    this.containerDomElement.innerHTML = "";
    this.__internal__value = undefined;

    return this
  }
}
