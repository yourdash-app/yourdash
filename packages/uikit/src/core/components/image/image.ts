/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKComponent } from "../../component.ts";

export default class Image extends UKComponent<{
  src: string;
  alt?: string;
}> {
  domElement: HTMLImageElement

  constructor( props: Image["props"] ) {
    super( props );

    this.domElement = document.createElement( "img" )
    this.domElement.src = props.src;
    this.domElement.alt = props.alt || ""

    return this
  }
}
