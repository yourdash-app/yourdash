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

  // create a component
  createComponent<T extends UKComponent>( component: new ( props: T[ "props" ] ) => T, props: T[ "props" ], slots?: T["__tslots__"] ) {
    return UIKit.createComponent( component, props, slots )
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
  createAndRenderComponent<T extends UKComponent>( component : new ( props: T[ "props" ] ) => T, props: T[ "props" ], slots?: T["__tslots__"] ) {
    const comp = this.createComponent( component, props, slots )
    this.renderComponent( comp )

    return this
  }
}
