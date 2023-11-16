import * as UIKit from "@yourdash/uikit/src/core/index";
import { Card } from "@yourdash/uikit/src/core/index";

class ApplicationCore {
  electron: ( typeof window )["electron"];
  uiKitRoot: UIKit.default;

  constructor() {
    this.electron = window.electron;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.uiKitRoot = new UIKit.default( document.getElementById( "core-application" )! );

    // Load the inter font
    document.fonts.add( new FontFace( "Inter", "url(\"../assets/Inter/Inter-VariableFont_slnt,wght.ttf\")" ) )
  }

  init(): this {
    this.electron.ipcRenderer.postMessage( "core-log-renderer-startup", "ok" );

    ["primary", "secondary", "tertiary"].forEach( buttonType => {
      const row = this.uiKitRoot.add( Card, {} );
      ["small", "medium", "large"].forEach( buttonSize => {
        row.slots.content.createComponent( UIKit.Button, {
          label: "Button",
          onClick() {
            console.log( "Hello World" );
          },
          type: buttonType as "primary" | "secondary" | "tertiary",
          size: buttonSize as "small" | "medium" | "large",
        } );
      } )
    } )

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
