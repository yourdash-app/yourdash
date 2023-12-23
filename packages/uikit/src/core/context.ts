/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKComponent } from "./component.ts";
import domUtils from "./domUtils.ts";
import UIKit from "./index.ts";

export default class UKContext {
  containerElement: HTMLDivElement | HTMLBodyElement;
  children: UKComponent[] = []

  constructor( containerElement: UKContext["containerElement"] ) {
    this.containerElement = containerElement;
  }

  /*   createComponent<T extends UKComponent>( component: new ( props: T[ "props" ] ) => T, props: T[ "props" ] ) {
    return UIKit.createComponent( component, props );
  }

  createAndRenderComponent<T extends UKComponent>( component: new ( props: T[ "props" ] ) => T, props: T[ "props" ] ) {
    const comp = this.createComponent( component, props );

    this.renderComponent( comp )

    return comp
  }

  renderComponent<T extends UKComponent>( component: T ) {
    this.children.push( component );
    // @ts-ignore
    // noinspection JSConstantReassignment
    component.parentDomElement = this.containerElement;
    this.containerElement.appendChild( component.domElement )

    return this
  }

  appendComponent( component: UKComponent ) {
    this.children.push( component );
    this.containerElement.appendChild( component.domElement );

    return this
  }

  unrenderComponent( component: UKComponent ) {
    domUtils.removeElement( component.domElement )
  } */

  // create a component
  createComponent<T extends UKComponent>( component: new ( props: T[ "props" ] ) => T, props: T[ "props" ] ) {
    return UIKit.createComponent( component, props )
  }

  // render a pre-existing component
  renderComponent<T extends UKComponent>( component: T ) {
    UIKit.renderComponent( component, this.containerElement )
    this.children.push( component )

    return this
  }

  // unrender a component
  unrenderComponent( component: UKComponent ) {
    domUtils.removeElement( component.domElement )

    return this
  }

  // create and render a component
  createAndRenderComponent<T extends UKComponent>( component : new ( props: T[ "props" ] ) => T, props: T[ "props" ] ) {
    const comp = this.createComponent( component, props )
    this.renderComponent( comp )

    return this
  }
}
