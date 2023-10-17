/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKComponent, { UKComponentProps, UKComponentState, UKComponentSlots } from "../../component.ts";
import styles from "./iconButton.module.scss";
import State from "../../state.ts";
import { UKIcon } from "../../icons/icons.ts";

export interface IconButtonProps extends UKComponentProps {
  icon: UKIcon,
  onClick: () => void,
  size?: "small" | "medium" | "large",
  transparent?: boolean,
  disabled?: boolean
}

export interface IconButtonState extends UKComponentState {
  label: State<string>,
}

export default class IconButton extends UKComponent<IconButtonProps, IconButtonState, UKComponentSlots> {
  constructor( props: IconButtonProps ) {
    super( props );

    this.state = {
      label: new State<string>( props.label )
    }

    this.domElement = document.createElement( "button" )
    this.domElement.classList.add( styles.component )

    this.state.label.addListener( label => this.domElement.innerText = label )

    if ( this.props.size ) {
      this.setSize( this.props.size )
    }

    if ( this.props.transparent ) {
      this.setTransparent( true )
    }

    if ( this.props.disabled ) {
      this.setDisabled( true )
    }

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

  setSize( size: Required<IconButtonProps["size"]> ): this {
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
      break;
    }

    return this
  }

  click(): this {
    this.props.onClick()

    return this
  }
}
