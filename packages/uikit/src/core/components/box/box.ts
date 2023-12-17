/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKSlotComponent } from "../../component.ts";
import styles from "./box.module.scss";

export default class Box extends UKSlotComponent<{
  noBorder?: boolean | { top?: boolean, right?: boolean, bottom?: boolean, left?: boolean };
  noRounding?: boolean;
  dimensions?: {
    width?: CSSStyleDeclaration["width"],
    height?: CSSStyleDeclaration["height"]
  },
  flex?: "row" | "column" | false,
  alignItems?: CSSStyleDeclaration["alignItems"],
  justifyContent?: CSSStyleDeclaration["justifyContent"]
}> {
  constructor( props: Box["props"] ) {
    super( props );

    this.domElement = document.createElement( "div" )
    this.domElement.classList.add( styles.component )

    if ( props.noBorder !== undefined )
      this.setNoBorder( props.noBorder );

    if ( props.noRounding !== undefined )
      this.setNoRounding( props.noRounding );

    if ( props.dimensions !== undefined )
      this.setDimensions( props.dimensions );

    if ( props.flex !== undefined )
      this.setFlex( props.flex );

    if ( props.alignItems !== undefined )
      this.setAlignItems( props.alignItems );

    if ( props.justifyContent !== undefined )
      this.setJustifyContent( props.justifyContent );
  }

  setJustifyContent( justifyContent: Box["props"]["justifyContent"] ) {
    if ( justifyContent ) {
      this.domElement.style.justifyContent = justifyContent
    }
  }

  setAlignItems( alignItems: Box["props"]["alignItems"] ) {
    if ( alignItems ) {
      this.domElement.style.alignItems = alignItems
    }
  }

  setFlex( flex: Box["props"]["flex"] ) {
    switch ( flex ) {
    case "row":
      this.domElement.classList.add( styles.flexRow )
      break
    case "column":
      this.domElement.classList.add( styles.flexColumn )
      break
    default:
      this.domElement.classList.remove( styles.flexRow )
      this.domElement.classList.remove( styles.flexColumn )
    }
  }

  setNoBorder( noBorder: Box["props"]["noBorder"] ) {
    if ( noBorder ) {
      if ( typeof noBorder === "boolean" ) {
        this.domElement.classList.add( styles.noBorder )
        return this
      }

      if ( noBorder.top )
        this.domElement.classList.add( styles.noTopBorder )

      if ( noBorder.right )
        this.domElement.classList.add( styles.noRightBorder )

      if ( noBorder.bottom )
        this.domElement.classList.add( styles.noBottomBorder )

      if ( noBorder.left )
        this.domElement.classList.add( styles.noLeftBorder )
    } else {
      this.domElement.classList.remove( styles.noBorder )
    }

    return this
  }

  setNoRounding( noRounding: Box["props"]["noRounding"] ) {
    if ( noRounding ) {
      this.domElement.classList.add( styles.noRounding );
    } else {
      this.domElement.classList.remove( styles.noRounding );
    }

    return this
  }

  setDimensions( dimensions: Box["props"]["dimensions"] ) {
    if ( dimensions?.width !== undefined ) {
      this.domElement.style.width = dimensions.width;
    }

    if ( dimensions?.height !== undefined ) {
      this.domElement.style.height = dimensions.height;
    }

    return this;
  }
}
