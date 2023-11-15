import * as UIKit from "@yourdash/uikit/src/core/index";

class ApplicationCore {
  electron: ( typeof window )["electron"];
  uiKitRoot: UIKit.default;

  constructor() {
    this.electron = window.electron;
    this.uiKitRoot = new UIKit.default( document.getElementById( "core-application" )! );
  }

  init(): this {
    this.electron.ipcRenderer.postMessage( "core-log-renderer-startup", "ok" );

    this.uiKitRoot.add( UIKit.Button, { label: "Hello", onClick() { console.log( "Hello World" ); } } );

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
