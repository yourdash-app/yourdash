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
  domElement: HTMLDivElement
  sliderDomElement: HTMLInputElement
  thumbDomElement: HTMLDivElement
  trackDomElement: HTMLDivElement
  fillProgressDomElement: HTMLDivElement

  constructor( props: Slider["props"] ) {
    super( props );

    this.domElement = document.createElement( "div" )
    this.domElement.classList.add( styles.component )

    this.sliderDomElement = document.createElement( "input" )
    this.sliderDomElement.type = "range"
    this.domElement.appendChild( this.sliderDomElement )

    this.thumbDomElement = document.createElement( "div" )
    this.thumbDomElement.classList.add( styles.thumb )
    this.domElement.appendChild( this.thumbDomElement )

    this.trackDomElement = document.createElement( "div" )
    this.trackDomElement.classList.add( styles.track )
    this.domElement.appendChild( this.trackDomElement )

    this.fillProgressDomElement = document.createElement( "div" )
    this.fillProgressDomElement.classList.add( styles.fillProgress )
    this.trackDomElement.appendChild( this.fillProgressDomElement )

    this.sliderDomElement.oninput = () => {
      const value = this.sliderDomElement.valueAsNumber
      this.props.onChange( value )

      const percentageFilled = this.getPercentageFilledFromValue( value )
      this.domElement.style.setProperty( "--percentage-filled", `${ percentageFilled }%` )
    }

    if ( props.min ) {
      this.setMin( props["min"] )
    }

    if ( props.max )
      this.setMax( props["max"] )

    if ( props.stepSize )
      this.setStepSize( props["stepSize"] )

    this.sliderDomElement.classList.add( styles.innerSlider )

    if ( props.accessibleName )
      this.sliderDomElement.name = props["accessibleName"]

    return this
  }

  setStepSize( stepSize: number ) {
    this.sliderDomElement.step = stepSize.toString()

    return this
  }

  setMax( max: number ) {
    this.sliderDomElement.max = max.toString()

    return this
  }

  setMin( min: number ) {
    this.sliderDomElement.min = min.toString()

    return this
  }

  getPercentageFilledFromValue( value: number ) {
    return ( value - Number( this.sliderDomElement.min || 0 ) ) / ( Number( this.sliderDomElement.max || 100 ) - Number(  this.sliderDomElement.min || 0 ) ) * 100
  }
}
