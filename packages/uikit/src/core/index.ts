/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

/** UIKit - a vanilla Typescript UI library (https://github.com/yourdash-app/yourdash/tree/main/packages/uikit) */

import { UKComponent } from "./component.ts";
import "./default.scss";
import UKContext from "./context.ts";
import domUtils from "./domUtils.ts";
import UKComponentSlot from "./slot.ts";

// Modify the typescript global window object to contain the __uikit__ object
declare global {
  interface Window {
    __uikit__: {
      componentTree: UKComponent[],
      root: UIKitCore
    };
  }
}

// Define the __uikit__ object in the window object
window.__uikit__ = {
  componentTree: [],
  root: undefined! // eslint-disable-line @typescript-eslint/no-non-null-assertion
};

class UIKitCore {
  contexts: UKContext[] = [];
  dom = domUtils

  areAnimationsEnabled = false

  constructor() {
    if ( window.__uikit__.root ) {
      throw new Error( "UIKit is already initialized! You should only have one instance of UIKit in your app and never use UIKit as a component." );
    }

    window.__uikit__.root = this;
    // @ts-ignore
    window.__uikit__[ "componentTree" ].push( this );

    // Support the prefers-reduced-motion media query
    if ( window.matchMedia( "(prefers-reduced-motion: reduce)" ).matches ) {
      this.disableAnimations();
    } else {
      this.enableAnimations();
    }

    return this;
  }

  enableAnimations() {
    this.contexts.forEach( context => {
      context.containerElement.classList.remove( "__uikit__no-animations" );
    } )

    this.areAnimationsEnabled = true
  }

  disableAnimations() {
    this.contexts.forEach( context => {
      context.containerElement.classList.add( "__uikit__no-animations" );
    } )

    this.areAnimationsEnabled = false
  }

  distructAllContexts() {
    this.contexts.forEach( context => {
      context.containerElement.remove();
    } );

    console.warn( "UIKIT: Distructed all contexts!" );
  }

  createContext( containerElement: HTMLDivElement | HTMLBodyElement ) {
    const context = new UKContext( containerElement );
    context.containerElement.classList.add( "__uikit__" );

    if ( this.areAnimationsEnabled ) {
      context.containerElement.classList.remove( "__uikit__no-animations" );
    } else {
      context.containerElement.classList.add( "__uikit__no-animations" );
    }

    this.contexts.push( context );

    return context
  }

  createComponent<T extends UKComponent>( component: new ( props: T[ "props" ] ) => T, props: T[ "props" ], slots?: T["__tslots__"] ) {
    const comp = new component( props );

    if ( !!slots ) {
      const slotsAsArray = Object.keys( slots ) as string[];

      slotsAsArray.forEach( slot => {
        comp.slots[ slot ].set( slots[ slot ] );
      } )
    }

    return comp
  }

  renderComponent( component: UKComponent, containerElement: HTMLElement ) {
    containerElement.appendChild( component.domElement );
  }

  createSlot<ValidComponentType extends UKComponent>( htmlElement?: HTMLElement ) {
    return new UKComponentSlot<ValidComponentType>( htmlElement || document.createElement( "div" ) );
  }
}

const UIKit = new UIKitCore();

export default UIKit;

export * as UK from "./components/index.ts";
export { UKComponent } from "./component.ts";
