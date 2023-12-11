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
      this.domElement.style.backgroundImage = `url(${ props.icon })`
      this.domElement.style.backgroundPosition = "center"
      this.domElement.style.backgroundRepeat = "no-repeat"
      this.domElement.style.backgroundSize = "cover"
    } else {
      this.domElement.style.backgroundColor = props.color || "currentColor"
      this.domElement.style.maskImage = `url(${ props.icon })`
      this.domElement.style.maskPosition = "center"
      this.domElement.style.maskRepeat = "no-repeat"
      this.domElement.style.maskSize = "cover"
    }

    return this
  }
}
