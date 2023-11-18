/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKComponent, { UKComponentSlots } from "../../component.ts";
import * as UIKit from "../../index.ts";
import UKComponentSlot from "../../slot.ts";
import styles from "./card.module.scss";

export interface CardProps {
  label?: string,
  onClick?: () => void,
  level?: 0 | 1 | 2 | 3
}

export interface CardSlots extends UKComponentSlots {
  actions: UKComponentSlot,
  content: UKComponentSlot,
  headerExtras: UKComponentSlot,
  contentHeader: UKComponentSlot,
  contentFooter: UKComponentSlot
}

export default class Card extends UKComponent<CardProps, never, CardSlots> {
  private readonly labelDomElement: HTMLSpanElement
  private readonly headerDomElement: HTMLDivElement
  private readonly contentContainerDomElement: HTMLElement

  constructor( props: CardProps ) {
    super( props );

    this.domElement = document.createElement( "div" );

    if ( props.level ) {
      this.setLevel( props.level )
    } else {
      this.setLevel( 0 )
    }

    this.slots = {
      actions: new UKComponentSlot( document.createElement( "div" ) ),
      content: new UKComponentSlot( document.createElement( "div" ) ),
      headerExtras: new UKComponentSlot( document.createElement( "div" ) ),
      contentHeader: new UKComponentSlot( document.createElement( "div" ) ),
      contentFooter: new UKComponentSlot( document.createElement( "div" ) ),
    }

    this.slots.actions.domElement.classList.add( styles.actionsSlot );
    this.slots.content.domElement.classList.add( styles.contentSlot );
    this.slots.headerExtras.domElement.classList.add( styles.headerExtrasSlot );
    this.slots.contentHeader.domElement.classList.add( styles.contentHeaderSlot );
    this.slots.contentFooter.domElement.classList.add( styles.contentFooterSlot );

    this.headerDomElement = document.createElement( "div" );
    this.headerDomElement.classList.add( styles.header );
    this.domElement.appendChild( this.headerDomElement );

    this.labelDomElement = document.createElement( "div" )
    this.labelDomElement.innerText = this.props.label || "";
    this.labelDomElement.classList.add( styles.label );

    this.headerDomElement.appendChild( this.labelDomElement );
    this.headerDomElement.appendChild( this.slots.headerExtras.domElement );

    this.contentContainerDomElement = document.createElement( "div" )
    this.contentContainerDomElement.classList.add( styles.contentContainer )
    this.domElement.appendChild( this.contentContainerDomElement )

    this.contentContainerDomElement.appendChild( this.slots.contentHeader.domElement );

    this.contentContainerDomElement.appendChild( this.slots.content.domElement )

    this.contentContainerDomElement.appendChild( this.slots.contentFooter.domElement );

    this.domElement.appendChild( this.slots.actions.domElement );

    this.domElement.classList.add( styles.component );
    this.domElement.addEventListener( "click", this.click.bind( this ) );

    // TODO: REMOVE THIS AT A LATER DATE

    this.setLabel( "Test Card" )

    this.slots.headerExtras.createComponent( UIKit.Button, { label: "header extra button", onClick() { return 0 } } )

    return this
  }

  setLabel( label: string ) {
    this.labelDomElement.innerText = label;
    return this;
  }

  click() {
    this.props.onClick?.();
    return this;
  }

  setLevel( level: Required<Card["props"]["level"]> ) {
    this.domElement.classList.remove( styles.cardLevel0 )
    this.domElement.classList.remove( styles.cardLevel1 )
    this.domElement.classList.remove( styles.cardLevel2 )

    switch ( level ) {
    case 0:
      this.domElement.classList.add( styles.cardLevel0 )
      break
    case 1:
      this.domElement.classList.add( styles.cardLevel1 )
      break
    case 2:
      this.domElement.classList.add( styles.cardLevel2 )
      break
    default:
      console.warn( `Invalid UKCard level, ${level}` )
    }

    return this
  }
}
