/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKComponent } from "../../component.ts";
import domUtils from "../../domUtils.ts";
import styles from "./button.module.scss";

export default class Button extends UKComponent<{
  label: string,
  onClick: () => void,
  size?: "small" | "medium" | "large",
  transparent?: boolean,
  disabled?: boolean,
  type?: "primary" | "secondary" | "tertiary",
}> {
  constructor( props: Button["props"] ) {
    super( props );

    this.domElement = document.createElement( "button" )
    this.setLabel( props.label )
    this.domElement.classList.add( styles.component )

    if ( this.props.size )
      this.setSize( this.props[ "size" ] )

    if ( this.props.transparent )
      this.setTransparent( true )

    if ( this.props.disabled )
      this.setDisabled( true )

    if ( this.props.type === undefined ) {
      this.setType( "secondary" )
    } else {
      this.setType( this.props[ "type" ] )
    }

    this.domElement.addEventListener( "click", this.click.bind( this ) )
  }

  setDisabled( disabled: Button["props"]["disabled"] ): this {
    if ( disabled ) {
      this.domElement.setAttribute( "disabled", "true" )
    } else {
      this.domElement.removeAttribute( "disabled" )
    }

    return this
  }

  setTransparent( transparent: Button["props"]["transparent"] ): this {
    if ( transparent ) {
      this.domElement.classList.add( styles.transparent )
    } else {
      this.domElement.classList.remove( styles.transparent )
    }

    return this
  }

  setSize( size: Required<Button["props"]["size"]> ): this {
    this.props.size = size

    const SIZE_CONFLICTS = [ styles.sizeLarge, styles.sizeSmall ]

    switch ( size ) {
    case "small":
      domUtils.addClass( this.domElement, styles.sizeSmall, { confilcts: SIZE_CONFLICTS } )
      break;
    case "large":
      domUtils.addClass( this.domElement, styles.sizeLarge, { confilcts: SIZE_CONFLICTS } )
      break;
    default:
      break;
    }

    return this
  }

  setLabel( label: string ): this {
    this.domElement.innerText = label
    this.domElement.ariaLabel = label

    return this
  }

  setType( type: Required<Button["props"]["type"]> ): this {
    this.props.type = type

    const TYPE_CONFLICTS = [ styles.typePrimary, styles.typeSecondary, styles.typeTertiary ]

    switch ( type ) {
    case "primary":
      domUtils.addClass( this.domElement, styles.typePrimary, { confilcts: TYPE_CONFLICTS } )
      break;
    case "secondary":
      domUtils.addClass( this.domElement, styles.typeSecondary, { confilcts: TYPE_CONFLICTS } )
      break;
    case "tertiary":
      domUtils.addClass( this.domElement, styles.typeTertiary, { confilcts: TYPE_CONFLICTS } )
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
