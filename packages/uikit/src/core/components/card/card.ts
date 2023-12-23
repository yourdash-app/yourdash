/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKComponent } from "../../component.ts";
import styles from "./card.module.scss";
import transitionStyles from "../../transitions.module.scss";

export default class Card extends UKComponent<{
  title?: string,
  onClick?: () => void,
  level?: 0 | 1 | 2,
  actionsFillWidth?: boolean,
  contentNoPadding?: boolean,
  noBorder?: boolean,
  noAnimation?: boolean,
  slots: {
    actions: UKComponent,
    content: UKComponent,
    headerExtras: UKComponent,
  }
}> {
  private readonly titleDomElement: HTMLSpanElement;
  private readonly headerDomElement: HTMLDivElement;

  constructor( props: Card["props"] ) {
    super( props );

    this.domElement = document.createElement( "div" );

    if ( props.level !== undefined ) {
      this.setLevel( props[ "level" ] );
    } else {
      this.setLevel( 0 );
    }

    if ( props.actionsFillWidth !== undefined ) {
      this.setActionsFillWidth( props[ "actionsFillWidth" ] );
    }

    this.props.slots.actions.domElement.classList.add( styles.actionsSlot );
    this.props.slots.content.domElement.classList.add( styles.contentSlot );
    this.props.slots.headerExtras.domElement.classList.add( styles.headerExtrasSlot );

    this.headerDomElement = document.createElement( "div" );
    this.headerDomElement.classList.add( styles.header );
    this.domElement.appendChild( this.headerDomElement );

    this.titleDomElement = document.createElement( "div" );
    this.titleDomElement.innerText = this.props.title || "";
    this.titleDomElement.classList.add( styles.title );

    this.headerDomElement.appendChild( this.titleDomElement );
    this.headerDomElement.appendChild( this.props.slots.headerExtras.domElement );

    this.domElement.appendChild( this.props.slots.content.domElement );

    this.domElement.appendChild( this.props.slots.actions.domElement );

    this.domElement.classList.add( styles.component );
    this.domElement.addEventListener( "click", this.click.bind( this ) );

    if ( !props.noAnimation ) {
      this.props.slots.content.domElement.classList.add( transitionStyles.UKTransition_appear );
      this.props.slots.headerExtras.domElement.classList.add( transitionStyles.UKTransition_appear );
      this.props.slots.actions.domElement.classList.add( transitionStyles.UKTransition_appear );
    }

    return this;
  }

  setTitle( label: string ) {
    this.titleDomElement.innerText = label;
    return this;
  }

  click() {
    this.props.onClick?.();
    return this;
  }

  setLevel( level: Required<Card["props"]["level"]> ) {
    this.domElement.classList.remove( styles.cardLevel0 );
    this.domElement.classList.remove( styles.cardLevel1 );
    this.domElement.classList.remove( styles.cardLevel2 );

    switch ( level ) {
    case 0:
      this.domElement.classList.add( styles.cardLevel0 );
      break;
    case 1:
      this.domElement.classList.add( styles.cardLevel1 );
      break;
    case 2:
      this.domElement.classList.add( styles.cardLevel2 );
      break;
    default:
      console.warn( `Invalid UKCard level, ${ level }` );
    }

    return this;
  }

  setActionsFillWidth( fillWidth: boolean ) {
    if ( fillWidth ) {
      this.props.slots.actions.domElement.classList.add( styles.actionsFillWidth );
    } else {
      this.props.slots.actions.domElement.classList.remove( styles.actionsFillWidth );
    }
  }
}
