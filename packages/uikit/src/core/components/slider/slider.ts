/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKComponent } from "../../component.ts";
import styles from "./slider.module.scss";

export default class Slider extends UKComponent<{
  onChange( value: number ): void,
  min?: number,
  max?: number,
  stepSize?: number,
  accessibleName?: string
}> {
  protected domElement: HTMLInputElement

  constructor( props: Slider["props"] ) {
    super( props );

    this.domElement = document.createElement( "input" )
    this.domElement.type = "range"

    this.domElement.onchange = () => {
      const value = this.domElement.value
      this.props.onChange( Number( value ) )
    }

    if ( props.min ) {
      this.domElement.min = props["min"]?.toString()
    }

    if ( props.max ) {
      this.domElement.max = props["max"]?.toString()
    }

    if ( props.stepSize ) {
      this.domElement.step = props["stepSize"]?.toString()
    }

    this.domElement.classList.add( styles.component )

    if ( props.accessibleName ) {
      this.domElement.name = props.accessibleName
    }

    return this
  }
}
