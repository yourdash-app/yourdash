/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UIKit from "@yourdash/uikit/src/core/index";
import coreView from "./views/core/coreView";

class ApplicationCore {
  electron: ( typeof window )["electron"];
  uiKitRoot: UIKit;

  constructor() {
    this.electron = window.electron;
    this.uiKitRoot = new UIKit( document.getElementById( "core-application" ) as HTMLDivElement );

    return this
  }

  init(): this {
    this.electron.ipcRenderer.postMessage( "core-log-renderer-startup", "ok" );

    this.uiKitRoot.createComponent( coreView, {} )

    return this;
  }
}

const applicationCore = new ApplicationCore();
export default applicationCore;

window.addEventListener( "DOMContentLoaded", () => {
  setTimeout( () => {
    applicationCore.init();
  } );
} );
