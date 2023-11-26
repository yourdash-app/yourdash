/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UK } from "@yourdash/uikit/src/core/index";
import transitions from "@yourdash/uikit/src/core/transitions.module.scss";
import styles from "./pushNotificationMenu.module.scss";

export default class PushNotificationMenu extends UK.Box {
  constructor() {
    super( { flex: "column", alignItems: "center", justifyContent: "center" }  );

    this.domElement.classList.add( styles.menu )
    this.domElement.classList.add( transitions.UKTransition_appear )
    this.setVisible( false )
  }

  setVisible( visible: boolean ) {
    if ( visible ) {
      this.domElement.style.display = "flex"
      this.domElement.style.visibility = "visible"
    } else {
      this.domElement.style.display = "none"
      this.domElement.style.visibility = "hidden"
    }
  }
}
