/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKComponent, ValidUKComponent } from "./component.ts";
import domUtils from "./domUtils.ts";
import UIKit from "./index.ts";

export default class UKContext {
  containerElement: HTMLDivElement | HTMLBodyElement;
  children: ValidUKComponent[] = []

  constructor( containerElement: UKContext["containerElement"] ) {
    this.containerElement = containerElement;
  }

  createComponent<T extends ValidUKComponent>( component: new ( props: T[ "props" ] ) => T, props: T[ "props" ] ) {
    return UIKit.renderComponent( component, props );
  }

  createAndRenderComponent<T extends ValidUKComponent>( component: new ( props: T[ "props" ] ) => T, props: T[ "props" ] ) {
    const comp = this.createComponent( component, props );
    this.children.push( comp );
    this.containerElement.appendChild( comp.domElement );

    return comp
  }

  renderComponent<T extends ValidUKComponent>( component: new ( props: T[ "props" ] ) => T, props: T[ "props" ] ) {
    const comp = this.createComponent( component, props );
    this.children.push( comp );
    this.containerElement.appendChild( comp.domElement )

    return this
  }

  appendComponent( component: UKComponent ) {
    this.children.push( component );
    this.containerElement.appendChild( component.domElement );

    return this
  }

  unrenderComponent( component: UKComponent ) {
    domUtils.removeElement( component.domElement )
  }
}
