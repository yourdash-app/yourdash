/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKSlotComponent } from "../../component.ts";
import styles from "./text.module.scss";

export interface TextProps {
  content: string,
  fontFamily?: CSSStyleDeclaration["fontFamily"],
  fontSize?: CSSStyleDeclaration["fontSize"],
  color?: CSSStyleDeclaration["color"],
  textAlign?: CSSStyleDeclaration["textAlign"],
  fontWeight?: CSSStyleDeclaration["fontWeight"]
}

export default class Text extends UKSlotComponent<TextProps> {
  constructor( props: TextProps ) {
    super( props );

    this.domElement = document.createElement( "span" )
    this.domElement.classList.add( styles.component )

    this.setContent( props.content )

    if ( props.fontFamily !== undefined )
      this.setFontFamily( props.fontFamily );

    if ( props.fontSize !== undefined )
      this.setFontSize( props.fontSize );

    if ( props.color !== undefined )
      this.setColor( props.color );

    if ( props.textAlign !== undefined )
      this.setTextAlign( props.textAlign );

    if ( props.fontWeight !== undefined )
      this.setFontWeight( props.fontWeight );

    return this
  }

  setFontFamily( fontFamily: CSSStyleDeclaration["fontFamily"] ) {
    this.domElement.style.fontFamily = fontFamily

    return this
  }

  setFontSize( fontSize: CSSStyleDeclaration["fontSize"] ) {
    this.domElement.style.fontSize = fontSize

    return this
  }

  setColor( color: CSSStyleDeclaration["color"] ) {
    this.domElement.style.color = color

    return this
  }

  setTextAlign( textAlign: CSSStyleDeclaration["textAlign"] ) {
    this.domElement.style.textAlign = textAlign

    return this
  }

  setFontWeight( fontWeight: CSSStyleDeclaration["fontWeight"] ) {
    this.domElement.style.fontWeight = fontWeight

    return this
  }

  setContent( content: string ) {
    this.domElement.textContent = content

    return this
  }
}
