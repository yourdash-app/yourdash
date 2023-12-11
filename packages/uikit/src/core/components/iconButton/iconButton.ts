/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKComponent } from "../../component.ts";
import { UKIcon } from "../../icons/icons.ts";
import State from "../../state.ts";
import styles from "./iconButton.module.scss";

export default class IconButton extends UKComponent<{
  icon: keyof typeof UKIcon,
  onClick: () => void,
  size?: "small" | "medium" | "large",
  transparent?: boolean,
  disabled?: boolean,
  useDefaultColor?: boolean,
  label?: string // shown on hover,
  type?: "primary" | "secondary" | "tertiary"
}> {
  domElement: HTMLButtonElement;
  iconDomElement: HTMLDivElement;
  label: State<string>

  constructor( props: IconButton["props"] ) {
    super( props );

    this.label = new State<string>( props.label )

    this.domElement = document.createElement( "button" );
    this.domElement.classList.add( styles.component );

    this.iconDomElement = document.createElement( "div" );
    this.iconDomElement.classList.add( styles.icon );

    this.domElement.appendChild( this.iconDomElement );

    this.label.addListener( label => this.domElement.innerText = label );

    if ( this.props.size ) {
      this.setSize( props.size );
    }

    if ( this.props.transparent ) {
      this.setTransparent( true );
    }

    if ( this.props.disabled ) {
      this.setDisabled( true );
    }

    if ( props.useDefaultColor !== undefined ) {
      this.setUseDefaultColor( props.useDefaultColor );
    } else {
      this.setUseDefaultColor( false );
    }

    if ( this.props.type === undefined ) {
      this.setType( "secondary" );
    } else {
      this.setType( this.props.type );
    }

    this.setIcon( this.props.icon );

    this.domElement.addEventListener( "click", this.click.bind( this ) );
  }

  setDisabled( disabled: boolean ): this {
    if ( disabled ) {
      this.domElement.setAttribute( "disabled", "true" );
    } else {
      this.domElement.removeAttribute( "disabled" );
    }

    return this;
  }

  setTransparent( transparent: boolean ): this {
    if ( transparent ) {
      this.domElement.classList.add( styles.transparent );
    } else {
      this.domElement.classList.remove( styles.transparent );
    }

    return this;
  }

  setSize( size: Required<IconButton["props"]["size"]> ): this {
    this.props.size = size;

    this.domElement.classList.remove( styles.sizeSmall );
    this.domElement.classList.remove( styles.sizeLarge );

    switch ( size ) {
    case "small":
      this.domElement.classList.add( styles.sizeSmall );
      break;
    case "large":
      this.domElement.classList.add( styles.sizeLarge );
      break;
    default:
      break;
    }

    return this;
  }

  setType( type: Required<IconButton["props"]["type"]> ): this {
    this.props.type = type;

    this.domElement.classList.remove( styles.typePrimary );
    this.domElement.classList.remove( styles.typeSecondary );
    this.domElement.classList.remove( styles.typeTertiary );

    switch ( type ) {
    case "primary":
      this.domElement.classList.add( styles.typePrimary );
      break;
    case "secondary":
      this.domElement.classList.add( styles.typeSecondary );
      break;
    case "tertiary":
      this.domElement.classList.add( styles.typeTertiary );
      break;
    default:
      break;
    }

    return this;
  }

  setIcon( icon: keyof typeof UKIcon ): this {
    this.props.icon = icon;

    this.iconDomElement.innerText = this.props.icon;

    if ( this.props.useDefaultColor ) {
      this.iconDomElement.style.backgroundImage = `url(${ UKIcon[ icon ] })`;
      this.iconDomElement.style.backgroundPosition = "center";
      this.iconDomElement.style.backgroundRepeat = "no-repeat";
      this.iconDomElement.style.backgroundSize = "cover";
    } else {
      this.iconDomElement.style.webkitMaskImage = `url(${ UKIcon[ icon ] })`;
      this.iconDomElement.style.webkitMaskPosition = "center";
      this.iconDomElement.style.webkitMaskRepeat = "no-repeat";
      this.iconDomElement.style.webkitMaskSize = "cover";
      this.iconDomElement.style.backgroundColor = "currentColor";
      this.iconDomElement.style.maskImage = `url(${ UKIcon[ icon ] })`;
      this.iconDomElement.style.maskPosition = "center";
      this.iconDomElement.style.maskRepeat = "no-repeat";
      this.iconDomElement.style.maskSize = "cover";
    }

    return this
  }

  setUseDefaultColor( useDefaultColor: boolean ): this {
    this.props.useDefaultColor = useDefaultColor;

    return this;
  }

  click(): this {
    this.props.onClick();

    return this;
  }

  setOnClick( onClick: () => void ): this {
    this.props.onClick = onClick;

    return this
  }
}
