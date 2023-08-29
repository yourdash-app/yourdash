/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import UKComponent, { UKComponentState, UKComponentProps } from "../../component.ts";
import { UKIconDictionary } from "../../icons/dict/iconDictionary.ts";
import styles from "./icon.module.scss";
import { UKIcon } from "../../icons/icons.ts";

type COLOR = `#${ string }` | `rgb(${ string })` | `rgba(${ string })` | `var(--${ string })` | "currentColor"

export interface IconProps extends UKComponentProps {
    icon: UKIcon,
    useDefaultColor?: boolean,
    color?: COLOR
}

export default class Icon extends UKComponent<IconProps, UKComponentState, UKComponentProps> {
  constructor( props: IconProps ) {
    super( props );
        
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