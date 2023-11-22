/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import * as UIKit from "@yourdash/uikit/src/core/index";

class ApplicationCore {
  electron: ( typeof window )["electron"];
  uiKitRoot: UIKit.default;

  constructor() {
    this.electron = window.electron;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.uiKitRoot = new UIKit.default( document.getElementById( "core-application" )! );

    return this
  }

  init(): this {
    this.electron.ipcRenderer.postMessage( "core-log-renderer-startup", "ok" );

    const headerMenu = this.uiKitRoot.createComponent( UIKit.Box, { noRounding: true, dimensions: { width: "100%" } } )

    headerMenu.createComponent( UIKit.IconButton, { icon: "Apps", onClick() { return 0 } } )
    headerMenu.createComponent( UIKit.Text, { content: "Hello World!" } )

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
