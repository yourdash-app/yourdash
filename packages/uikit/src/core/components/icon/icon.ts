/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKComponent } from "../../component.ts";
import styles from "./icon.module.scss";
import { UKIcon } from "../../icons/icons.ts";

type COLOR = `#${ string }` | `rgb(${ string })` | `rgba(${ string })` | `var(--${ string })` | "currentColor"

export default class Icon extends UKComponent<{
    icon: typeof UKIcon[keyof typeof UKIcon],
    useDefaultColor?: boolean,
    color?: COLOR
}> {
  constructor( props: Icon["props"] ) {
    super( props );

    this.domElement = document.createElement( "div" );

    this.domElement.classList.add( styles.component )

    if ( props.useDefaultColor ) {
      this.domElement.style.backgroundPosition = "center"
      this.domElement.style.backgroundRepeat = "no-repeat"
      this.domElement.style.backgroundSize = "cover"
      this.setUseDefaultColor( true )
    } else {
      this.domElement.style.maskPosition = "center"
      this.domElement.style.maskRepeat = "no-repeat"
      this.domElement.style.maskSize = "cover"
      this.setUseDefaultColor( false )
    }

    this.setIcon( props.icon )

    return this
  }

  setUseDefaultColor( useDefaultColor: boolean ) {
    this.props.useDefaultColor = useDefaultColor

    if ( useDefaultColor ) {
      this.domElement.style.backgroundColor = this.props.color || "currentColor"
    } else {
      this.domElement.style.backgroundColor = "currentColor"
    }
  }

  setIcon( icon: typeof UKIcon[keyof typeof UKIcon] ) {
    this.props.icon = icon

    if ( this.props.useDefaultColor ) {
      this.domElement.style.maskImage = "unset"
      this.domElement.style.backgroundImage = `url(${ this.props.icon })`
    } else {
      this.domElement.style.backgroundImage = "unset"
      this.domElement.style.maskImage = `url(${ this.props.icon })`
    }
  }
}
