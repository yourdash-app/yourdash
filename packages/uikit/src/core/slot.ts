/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { ValidUKComponent } from "./component";
import State from "./state";

export default class UKComponentSlot<ValidComponentType extends ValidUKComponent = ValidUKComponent> extends State<ValidUKComponent> {
  domElement: HTMLElement
  __internal__component: ValidUKComponent | undefined

  constructor( domElement: HTMLElement ) {
    super();

    this.domElement = domElement
    this.__internal__component = undefined;
  }

  createComponent<T extends ValidComponentType>( component: new ( props: T[ "props" ] ) => T, props: T[ "props" ] ) {
    this.__internal__component = new component( props );
    this.domElement.appendChild( this.__internal__component.domElement );

    return this.__internal__component;
  }

  clear() {
    this.domElement.innerHTML = "";
    this.__internal__component = undefined;

    return this
  }
}
