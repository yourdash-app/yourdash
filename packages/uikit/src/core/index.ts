/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

/** UIKit - a vanilla Typescript UI library (https://github.com/yourdash-app/yourdash/tree/main/packages/uikit) */

import UKComponent from "./component.ts";
import defaultStyles from "./default.module.scss"

// @ts-ignore
window.__uikit__ = {
  componentTree: [],
}

export default class UIKit {
  domElement: HTMLDivElement = document.createElement( "div" )
  children: UKComponent[] = []

  constructor( container: HTMLElement ) {
    // @ts-ignore
    window.__uikit__["componentTree"].push( this )
    container.appendChild( this.domElement )
    this.domElement.classList.add( defaultStyles.uikit )

    // define the accent color
    this.domElement.style.setProperty( "--accent-bg", "#469ff5" )

    // define the accent color text color either black or white depending on the accent color's contrast
    this.domElement.style.setProperty(
      "--accent-fg",
      window.getComputedStyle( document.body ).getPropertyValue( "--accent-color" ) === "#469ff5"
        ? "0, 0, 0"
        : "255, 255, 255"
    )

    return this
  }

  add<T extends UKComponent>( component: new ( props: T["props"] ) => T, props: T["props"] ) {
    const comp = new component( props )

    comp.parentDomElement = this.domElement
    comp.parentDomElement.appendChild( comp.domElement )

    this.children.push( comp )
    return comp
  }
}

export * from "./components/index.ts"
