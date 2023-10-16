/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKComponent, { UKComponentProps } from "../../component.ts";

export interface ImageProps extends UKComponentProps {
  src: string;
  alt?: string;
}

export default class Image extends UKComponent<ImageProps> {
  domElement: HTMLImageElement
  
  constructor( props: ImageProps ) {
    super( props );
    
    this.domElement = document.createElement( "img" )
    this.domElement.src = props.src;
    this.domElement.alt = props.alt || ""
  }
}
