import * as UIKit from "../../../../uikit/src/core/index.ts";

class ApplicationCore {
  electron: ( typeof window )["electron"];

  constructor() {
    this.electron = window.electron;
  }

  init(): this {
    this.electron.ipcRenderer.postMessage( "core-log-renderer-startup", "ok" );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // noinspection JSPotentiallyInvalidConstructorUsage
    const uk = new UIKit.default( document.getElementById( "core-application" )! );

    uk.add( UIKit.Button, { label: "Hello", onClick() { console.log( "a" ); } } );
    uk.add( UIKit.Button, { label: "Hello", onClick() { console.log( "a" ); } } );
    uk.add( UIKit.Button, { label: "Hello", onClick() { console.log( "a" ); } } );
    uk.add( UIKit.Button, { label: "Hello", onClick() { console.log( "a" ); } } );
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
