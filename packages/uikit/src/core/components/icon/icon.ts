/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKComponent from "../../component.ts";
import { UKIconDictionary } from "../../icons/dict/iconDictionary.ts";
import styles from "./icon.module.scss";
import { UKIcon } from "../../icons/icons.ts";

type COLOR = `#${ string }` | `rgb(${ string })` | `rgba(${ string })` | `var(--${ string })` | "currentColor"

export interface IconProps {
    icon: UKIcon,
    useDefaultColor?: boolean,
    color?: COLOR
}

export default class Icon extends UKComponent {
  constructor( props: IconProps ) {
    super();
    
    this.domElement = document.createElement( "div" );
    
    this.domElement.classList.add( styles.component )
    
    UKIconDictionary[ props.icon ]().then( icon => {
      if ( props.useDefaultColor ) {
        this.domElement.style.backgroundImage = `url(${ icon.default })`
        this.domElement.style.backgroundPosition = "center"
        this.domElement.style.backgroundRepeat = "no-repeat"
        this.domElement.style.backgroundSize = "cover"
      } else {
        this.domElement.style.webkitMaskImage = `url(${ icon.default })`
        this.domElement.style.webkitMaskPosition = "center"
        this.domElement.style.webkitMaskRepeat = "no-repeat"
        this.domElement.style.webkitMaskSize = "cover"
        this.domElement.style.backgroundColor = props.color || "currentColor"
        this.domElement.style.maskImage = `url(${ icon.default })`
        this.domElement.style.maskPosition = "center"
        this.domElement.style.maskRepeat = "no-repeat"
        this.domElement.style.maskSize = "cover"
      }
    } )
    
    return this
  }
}
