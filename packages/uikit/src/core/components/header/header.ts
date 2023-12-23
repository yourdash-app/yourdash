/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKComponent } from "../../component.ts";
import styles from "./header.module.scss";

export default class Header extends UKComponent<{
  text: string,
  fontFamily?: CSSStyleDeclaration["fontFamily"],
  color?: CSSStyleDeclaration["color"],
  textAlign?: CSSStyleDeclaration["textAlign"]
  level?: 0 | 1 | 2 | 3 | 4 | 5
}> {
  constructor( props: Header["props"] ) {
    super( props );

    this.domElement = document.createElement( "span" )
    this.domElement.classList.add( styles.component )

    this.setContent( props.text )

    if ( props.fontFamily !== undefined )
      this.setFontFamily( props.fontFamily );

    if ( props.level !== undefined ) {
      this.setLevel( props.level );
    } else {
      this.setLevel( 2 )
    }

    if ( props.color !== undefined )
      this.setColor( props.color );

    if ( props.textAlign !== undefined )
      this.setTextAlign( props.textAlign );

    return this
  }

  setFontFamily( fontFamily: CSSStyleDeclaration["fontFamily"] ) {
    this.domElement.style.fontFamily = fontFamily

    return this
  }

  setLevel( level: Required<Header["props"]["level"]> ) {
    switch ( level ) {
    case 0:
      this.domElement.classList.add( styles.level0 )
      this.domElement.classList.remove( styles.level1 )
      this.domElement.classList.remove( styles.level2 )
      this.domElement.classList.remove( styles.level3 )
      this.domElement.classList.remove( styles.level4 )
      this.domElement.classList.remove( styles.level5 )
      break
    case 1:
      this.domElement.classList.add( styles.level1 )
      this.domElement.classList.remove( styles.level0 )
      this.domElement.classList.remove( styles.level2 )
      this.domElement.classList.remove( styles.level3 )
      this.domElement.classList.remove( styles.level4 )
      this.domElement.classList.remove( styles.level5 )
      break
    case 2:
      this.domElement.classList.add( styles.level2 )
      this.domElement.classList.remove( styles.level0 )
      this.domElement.classList.remove( styles.level1 )
      this.domElement.classList.remove( styles.level3 )
      this.domElement.classList.remove( styles.level4 )
      this.domElement.classList.remove( styles.level5 )
      break
    case 3:
      this.domElement.classList.add( styles.level3 )
      this.domElement.classList.remove( styles.level0 )
      this.domElement.classList.remove( styles.level1 )
      this.domElement.classList.remove( styles.level2 )
      this.domElement.classList.remove( styles.level4 )
      this.domElement.classList.remove( styles.level5 )
      break
    case 4:
      this.domElement.classList.add( styles.level4 )
      this.domElement.classList.remove( styles.level0 )
      this.domElement.classList.remove( styles.level1 )
      this.domElement.classList.remove( styles.level2 )
      this.domElement.classList.remove( styles.level3 )
      break
    case 5:
      this.domElement.classList.add( styles.level5 )
      this.domElement.classList.remove( styles.level0 )
      this.domElement.classList.remove( styles.level1 )
      this.domElement.classList.remove( styles.level2 )
      this.domElement.classList.remove( styles.level3 )
      this.domElement.classList.remove( styles.level4 )
      break
    default:
      console.log( "Error: Unknown header level" );
    }

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

  setContent( content: string ) {
    this.domElement.textContent = content

    return this
  }
}
