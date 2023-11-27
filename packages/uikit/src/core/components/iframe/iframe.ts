/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKComponent } from "../../component.ts";

export interface IFrameProps {
  src: string
}

export default class IFrame extends UKComponent<IFrameProps> {
  constructor( props: IFrameProps ) {
    super( props )

    this.domElement = document.createElement( "webview" )
    this.domElement.setAttribute( "frameborder", "0" )
    this.domElement.setAttribute( "allowfullscreen", "" )
    this.domElement.setAttribute( "allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" )
    this.domElement.setAttribute( "src", props.src )
    this.domElement.style.height = "100%"
    this.domElement.style.width = "100%"
    this.domElement.style.overflow = "auto"
    this.domElement.style.display = "flex"

    return
  }
}
