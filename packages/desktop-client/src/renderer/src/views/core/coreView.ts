/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKSlotComponent } from "@yourdash/uikit/src/core/component";
import { UK } from "@yourdash/uikit/src/core/index";
import PushNotificationMenuView from "../pushNotificationMenu/pushNotificationMenuView";

export default class CoreView extends UKSlotComponent<undefined> {
  pushNotificationMenu: PushNotificationMenuView

  constructor() {
    super( undefined );

    this.domElement.style.height = "100vh"
    this.domElement.style.width = "100vw"
    this.domElement.style.overflow = "auto"
    this.domElement.style.display = "flex"
    this.domElement.style.flexDirection = "column"

    const headerMenu = this.createComponent( UK.Box, { noRounding: true, dimensions: { width: "100%" }, flex: "row", alignItems: "center", justifyContent: "space-between" } )

    headerMenu.createComponent( UK.IconButton, { icon: "Apps", onClick() { /* Empty */ } } )
    headerMenu.createComponent( UK.Header, { text: "Hello World!", level: 3 } )

    headerMenu.domElement.style.position = "relative"

    this.pushNotificationMenu = this.createComponent( PushNotificationMenuView )
    headerMenu.add( this.pushNotificationMenu )

    const content = this.createComponent( UK.Empty )
    content.domElement.style.height = "100%"
    content.domElement.style.width = "100%"
    this.add( content )

    if ( process.env.NODE_ENV === "development" ) {
      content.createComponent( UK.IFrame, { src: "http://localhost:5173/#/login" } )
    } else {
      content.createComponent( UK.IFrame, { src: "https://ydsh.pages.dev/#/login" } )
    }
  }
}
