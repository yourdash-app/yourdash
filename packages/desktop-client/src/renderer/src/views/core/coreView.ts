/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKSlotComponent } from "@yourdash/uikit/src/core/component";
import * as UIKit from "@yourdash/uikit/src/core/index";
import PushNotificationMenuView from "../pushNotificationMenu/pushNotificationMenuView";

export default class CoreView extends UKSlotComponent<undefined> {
  pushNotificationMenu: PushNotificationMenuView

  constructor() {
    super( undefined );

    const headerMenu = this.createComponent( UIKit.Box, { noRounding: true, dimensions: { width: "100%" }, flex: "row", alignItems: "center" } )

    headerMenu.createComponent( UIKit.IconButton, { icon: "Apps", onClick() { /* Empty */ } } )
    headerMenu.createComponent( UIKit.Header, { content: "Hello World!" } )

    this.pushNotificationMenu = this.createComponent( PushNotificationMenuView )
    headerMenu.add( this.pushNotificationMenu )
  }
}
