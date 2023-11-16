/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKComponent, { UKComponentProps } from "../../component.ts";
import styles from "./button.module.scss";

export interface ButtonProps extends UKComponentProps {
  label: string,
  onClick: () => void,
  size?: "small" | "medium" | "large",
  transparent?: boolean,
  disabled?: boolean,
  type?: "primary" | "secondary" | "tertiary",
}

export default class Button extends UKComponent<ButtonProps> {
  constructor( props: ButtonProps ) {
    super( props );

    this.domElement = document.createElement( "button" )
    this.setLabel( props.label )
    this.domElement.classList.add( styles.component )

    if ( this.props.size )
      this.setSize( this.props.size )

    if ( this.props.transparent )
      this.setTransparent( true )

    if ( this.props.disabled )
      this.setDisabled( true )

    if ( !this.props.type )
      this.setType( "secondary" )

    this.domElement.addEventListener( "click", this.click.bind( this ) )
  }

  setDisabled( disabled: boolean ): this {
    if ( disabled ) {
      this.domElement.setAttribute( "disabled", "true" )
    } else {
      this.domElement.removeAttribute( "disabled" )
    }

    return this
  }

  setTransparent( transparent: boolean ): this {
    if ( transparent ) {
      this.domElement.classList.add( styles.transparent )
    } else {
      this.domElement.classList.remove( styles.transparent )
    }

    return this
  }

  setSize( size: Required<ButtonProps["size"]> ): this {
    this.props.size = size

    this.domElement.classList.remove( styles.sizeSmall )
    this.domElement.classList.remove( styles.sizeLarge )

    switch ( size ) {
    case "small":
      this.domElement.classList.add( styles.sizeSmall )
      break;
    case "large":
      this.domElement.classList.add( styles.sizeLarge )
      break;
    default:
      this.domElement.classList.add( styles.sizeMedium )
      break;
    }

    return this
  }

  setLabel( label: string ): this {
    this.domElement.innerText = label
    this.domElement.ariaLabel = label

    return this
  }

  setType( type: Required<ButtonProps["type"]> ): this {
    this.props.type = type

    this.domElement.classList.remove( styles.typePrimary )
    this.domElement.classList.remove( styles.typeSecondary )
    this.domElement.classList.remove( styles.typeTertiary )

    switch ( type ) {
    case "primary":
      this.domElement.classList.add( styles.typePrimary )
      break;
    case "secondary":
      this.domElement.classList.add( styles.typeSecondary )
      break;
    case "tertiary":
      this.domElement.classList.add( styles.typeTertiary )
      break;
    default:
      break;
    }

    return this
  }

  click(): this {
    this.props.onClick()

    return this
  }
}
