/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

/** UIKit - a vanilla Typescript UI library (https://github.com/yourdash-app/yourdash/tree/main/packages/uikit) */

import { ValidUKComponent } from "./component.ts";
import defaultStyles from "./default.module.scss";

// Modify the typescript global window object to contain the __uikit__ object
declare global {
    interface Window { __uikit__: { componentTree: ValidUKComponent[], root: UIKit } }
}

// Define the __uikit__ object in the window object
window.__uikit__ = {
  componentTree: [],
  root: undefined! // eslint-disable-line @typescript-eslint/no-non-null-assertion
}

export default class UIKit {
  domElement: HTMLDivElement;
  children: ValidUKComponent[] = []

  constructor( container: HTMLDivElement ) {
    window.__uikit__.root = this
    // @ts-ignore
    window.__uikit__["componentTree"].push( this )
    this.domElement = container
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

    // Support the prefers-reduced-motion media query
    if ( window.matchMedia( "(prefers-reduced-motion: reduce)" ).matches ) {
      this.disableAnimations();
    } else {
      this.enableAnimations();
    }

    return this
  }

  enableAnimations() {
    this.domElement.classList.remove( defaultStyles.noAnimations );
  }

  disableAnimations() {
    this.domElement.classList.add( defaultStyles.noAnimations );
  }

  createComponent<T extends ValidUKComponent>( component: new ( props: T["props"] ) => T, props: T["props"] = undefined ) {
    const comp = new component( props )
    comp.parentDomElement = this.domElement
    comp.parentDomElement.appendChild( comp.domElement )

    this.children.push( comp )
    return comp
  }

  addComponent( component: ValidUKComponent ) {
    this.children.push( component )
    this.domElement.appendChild( component.domElement )
  }
}

export * from "./components/index.ts"
