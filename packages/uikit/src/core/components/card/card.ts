import UKComponent, { UKComponentProps, UKComponentSlots, UKComponentState } from "../../component.ts";
import styles from "./card.module.scss";
import UKComponentSlot from "../../slot.ts";

export interface CardProps extends UKComponentProps {
  label?: string,
  onClick?: () => void
}

export type CardState = UKComponentState

export interface CardSlots extends UKComponentSlots {
  actions: UKComponentSlot,
  content: UKComponentSlot,
  headerExtras: UKComponentSlot,
  contentHeader: UKComponentSlot,
  contentFooter: UKComponentSlot
}

export default class Card extends UKComponent<CardProps, CardState, CardSlots> {
  private labelDomElement: HTMLSpanElement
  private headerDomElement: HTMLDivElement
  private headerExtrasDomElement: HTMLDivElement
  private contentDomElement: HTMLDivElement
  private contentHeaderDomElement: HTMLDivElement
  private contentFooterDomElement: HTMLDivElement
  private actionsDomElement: HTMLDivElement

  constructor( props: CardProps ) {
    super( props );

    this.domElement = document.createElement( "div" );

    this.slots = {
      actions: new UKComponentSlot( this.domElement ),
      content: new UKComponentSlot( this.domElement ),
      headerExtras: new UKComponentSlot( this.domElement ),
      contentHeader: new UKComponentSlot( this.domElement ),
      contentFooter: new UKComponentSlot( this.domElement ),
    }


    this.headerDomElement = document.createElement( "div" );
    this.domElement.appendChild( this.headerDomElement );
    this.labelDomElement = document.createElement( "span" )
    this.labelDomElement.innerText = this.props.label || "";
    this.headerDomElement.appendChild( this.labelDomElement );
    this.headerExtrasDomElement = document.createElement( "div" );
    this.headerDomElement.appendChild( this.headerExtrasDomElement );
    this.contentDomElement = document.createElement( "div" );
    this.domElement.appendChild( this.contentDomElement );
    this.contentHeaderDomElement = document.createElement( "div" );
    this.contentDomElement.appendChild( this.contentHeaderDomElement );
    this.contentFooterDomElement = document.createElement( "div" );
    this.contentDomElement.appendChild( this.contentFooterDomElement );
    this.actionsDomElement = document.createElement( "div" );
    this.contentDomElement.appendChild( this.actionsDomElement );

    this.domElement.classList.add( styles.component );
    this.domElement.addEventListener( "click", this.click.bind( this ) );
  }

  setLabel( label: string ): this {
    this.labelDomElement.innerText = label;
    return this;
  }

  click(): this {
    this.props.onClick?.();
    return this;
  }
}