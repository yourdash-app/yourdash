/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKSlotComponent } from "@yourdash/uikit/src/core/component";
import * as UIKit from "@yourdash/uikit/src/core/index";
import CoreView from "../core/coreView";

export default class PushNotificationMenuView extends UKSlotComponent<{ coreView: CoreView }> {
  containerComponent: UIKit.Col
  pushNotificationState: "silent" | "notified" | "none" = "none"
  pushNotificationMenuButton: UIKit.IconButton

  constructor( props: PushNotificationMenuView["props"] ) {
    super( props );

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    this.containerComponent = this.createComponent( UIKit.Col )
    this.pushNotificationMenuButton = this.containerComponent.createComponent( UIKit.IconButton, { icon: "BellSlash", onClick() { self.setPushNotificationState( "notified" ) } } )
    this.setPushNotificationState( "none" )

    return this
  }

  setPushNotificationState( state: "silent" | "notified" | "none" ) {
    this.pushNotificationState = state

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    switch ( this.pushNotificationState ) {
    case "silent":
      this.pushNotificationMenuButton.setIcon( "BellSlash" )
      this.pushNotificationMenuButton.setOnClick( () => {
        self.setPushNotificationState( "notified" )
      } )
      break;
    case "notified":
      this.pushNotificationMenuButton.setIcon( "BellFill" )
      this.pushNotificationMenuButton.setOnClick( () => {
        self.setPushNotificationState( "none" )
      } )
      break
    default:
      this.pushNotificationMenuButton.setIcon( "Bell" )
      this.pushNotificationMenuButton.setOnClick( () => {
        self.setPushNotificationState( "silent" )
      } )
      break
    }
  }
}
