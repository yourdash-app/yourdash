/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKSlotComponent } from "@yourdash/uikit/src/core/component";
import CoreView from "../core/coreView";
import PushNotificationMenu from "./PushNotificationMenu";
import { UK } from "@yourdash/uikit/src/core/index";

export default class PushNotificationMenuView extends UKSlotComponent<{ coreView: CoreView }> {
  containerComponent: UK.Col
  pushNotificationState: "silent" | "notified" | "none" = "none"
  pushNotificationMenuButton: UK.IconButton
  pushNotificationMenu: PushNotificationMenu

  constructor( props: PushNotificationMenuView["props"] ) {
    super( props );

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    this.containerComponent = this.createComponent( UK.Col )
    this.pushNotificationMenuButton = this.containerComponent.createComponent(
      UK.IconButton,
      {
        icon: "BellSlash",
        onClick() {
          self.setPushNotificationState( "notified" )
        }
      }
    )
    this.pushNotificationMenu = this.createComponent( PushNotificationMenu )
    this.setPushNotificationState( "none" )

    return this
  }

  setPushNotificationMenuVisible( visible: boolean ) {
    this.pushNotificationMenu.setVisible( visible )
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
      this.setPushNotificationMenuVisible( true )
      this.pushNotificationMenuButton.setIcon( "BellFill" )
      this.pushNotificationMenuButton.setOnClick( () => {
        self.setPushNotificationState( "none" )
      } )
      break
    default:
      this.setPushNotificationMenuVisible( false )
      this.pushNotificationMenuButton.setIcon( "Bell" )
      this.pushNotificationMenuButton.setOnClick( () => {
        self.setPushNotificationState( "notified" )
      } )
      break
    }
  }
}
