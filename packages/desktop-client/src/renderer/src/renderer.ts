import * as UIKit from "@yourdash/uikit/src/core/index";

class ApplicationCore {
  electron: ( typeof window )["electron"];

  constructor() {
    this.electron = window.electron;
  }

  init(): this {
    this.electron.ipcRenderer.postMessage( "core-log-renderer-startup", "ok" );

    const uk = new UIKit.default( document.getElementById( "core-application" )! );

    uk.add( UIKit.Button, { label: "Hello", onClick() { console.log( "a" ); } } );

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
