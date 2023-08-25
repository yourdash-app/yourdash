import UKComponent, { UKComponentProps } from "../../component.ts";
import styles from "./card.module.scss";
import State from "../../state.ts";

export interface CardProps extends UKComponentProps {
  label?: string,
  onClick?: () => void,
  slots: {
    actions: State<UKComponent>,
    content: State<UKComponent>,
    headerExtras: State<UKComponent>,
    contentHeader: State<UKComponent>,
    contentFooter: State<UKComponent>
  }
}

export default class Card extends UKComponent {
  labelDomElement: HTMLSpanElement;
  
  constructor( props: CardProps ) {
    super( props );
    
    if ( !this.slots ) {
      // @ts-ignore
      this.slots = {};
    }
    
    this.domElement = document.createElement( "div" );
    
    const headerDomElement = document.createElement( "div" );
    this.domElement.appendChild( headerDomElement );
    
    this.labelDomElement = document.createElement( "span" );
    this.labelDomElement.innerText = this.props.label || "";
    headerDomElement.appendChild( this.labelDomElement );
    
    const headerExtrasDomElement = document.createElement( "div" );
    this.slots.headerExtras = new Slot( undefined, headerExtrasDomElement );
    headerDomElement.appendChild( headerExtrasDomElement );
    
    const contentDomElement = document.createElement( "div" );
    this.slots.content = new Slot( undefined, contentDomElement );
    this.domElement.appendChild( contentDomElement );
    
    const contentHeaderDomElement = document.createElement( "div" );
    this.slots.contentHeader = new Slot( undefined, contentHeaderDomElement );
    contentDomElement.appendChild( contentHeaderDomElement );
    
    const contentFooterDomElement = document.createElement( "div" );
    this.slots.contentFooter = new Slot( undefined, contentFooterDomElement );
    contentDomElement.appendChild( contentFooterDomElement );
    
    const actionsDomElement = document.createElement( "div" );
    this.slots.actions = new Slot( undefined, actionsDomElement );
    contentDomElement.appendChild( actionsDomElement );
    
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