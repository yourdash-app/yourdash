/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKSlotComponent } from "@yourdash/uikit/src/core/component";
import { UK } from "@yourdash/uikit/src/core/index";

export default class CoreView extends UKSlotComponent {
  constructor() {
    super( undefined );

    this.domElement.style.height = "100vh"
    this.domElement.style.width = "100vw"
    this.domElement.style.overflow = "auto"
    this.domElement.style.display = "flex"
    this.domElement.style.flexDirection = "column"

    const content = this.createComponent( UK.Empty )
    content.domElement.style.height = "100%"
    content.domElement.style.width = "100%"
    this.add( content )

    if ( process.env.NODE_ENV === "development" ) {
      content.createComponent( UK.IFrame, { src: "http://localhost:5173/#/linker-desktop-client-startup" } )
    } else {
      content.createComponent( UK.IFrame, { src: "https://ydsh.pages.dev/#/linker-desktop-client-startup" } )
    }
  }
}
