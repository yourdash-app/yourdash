/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { ValidUKComponent } from "./component";
import State from "./state";

export default class UKComponentSlot<ValidComponentType extends ValidUKComponent = ValidUKComponent> extends State<ValidUKComponent> {
  protected domElement: HTMLElement
  private component: ValidUKComponent | undefined

  constructor( domElement: HTMLElement ) {
    super();

    this.domElement = domElement
    this.component = undefined;
  }

  createComponent<T extends ValidComponentType>( component: new ( props: T[ "props" ] ) => T, props: T[ "props" ] ) {
    this.component = new component( props );
    this.domElement.appendChild( this.component.domElement );

    return this.component;
  }

  setComponent( component: ValidComponentType ) {
    this.component = component;
    this.domElement.innerHTML = "";
    this.domElement.appendChild( component.domElement );

    return this.component;
  }

  getComponent() {
    return this.component
  }

  clear() {
    this.domElement.innerHTML = "";
    this.component = undefined;

    return this
  }
}
