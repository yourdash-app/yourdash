/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import * as UIKit from "@yourdash/uikit/src/core/index";
import { Card } from "@yourdash/uikit/src/core/index";

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
    const self = this; // eslint-disable-line @typescript-eslint/no-this-alias
    this.electron.ipcRenderer.postMessage( "core-log-renderer-startup", "ok" );

    const colContainer = this.uiKitRoot.createComponent( UIKit.Col );

    ["primary", "secondary", "tertiary"].forEach( ( buttonType, ind ) => {
      const row = colContainer.createComponent( Card, { actionsFillWidth: true } );

      row.setTitle( `Test Card ${ind}` )

      row.slots.headerExtras.createComponent( UIKit.Button, { label: "header extra button", onClick() { return 0 } } );

      row.slots.actions.createComponent( UIKit.Button, { label: "actions button", type: "primary", onClick() { return 0 } } );
      row.slots.actions.createComponent( UIKit.Button, { label: "actions button", onClick() { return 0 } } );

      ["small", "medium", "large"].forEach( buttonSize => {
        row.slots.content.createComponent( UIKit.Button, {
          label: "Random Button",
          onClick() {
            console.log( "Hello World" );
          },
          type: buttonType as "primary" | "secondary" | "tertiary",
          size: buttonSize as "small" | "medium" | "large",
        } );

        row.slots.content.createComponent( UIKit.IconButton, {
          icon: "Beaker",
          onClick() { return 0 },
          type: buttonType as "primary" | "secondary" | "tertiary",
          size: buttonSize as "small" | "medium" | "large",
        } )
      } )
    } )

    const box1 = colContainer.createComponent( UIKit.Box )

    box1.domElement.style.height = "5rem"
    box1.setNoBorder( true )

    const box2 = colContainer.createComponent( UIKit.Box )

    box2.domElement.style.height = "5rem"
    box2.setNoBorder( false )
    box2.setNoRounding( true )

    const zoomRow = this.uiKitRoot.createComponent( UIKit.Row )

    zoomRow.createComponent( UIKit.Button, {
      label: "Zoom 100%",
      type: "primary",
      size: "large",
      onClick() {
        self.electron.ipcRenderer.send( "core:control:zoom", 1 )
      }
    } )

    zoomRow.createComponent( UIKit.Button, {
      label: "Zoom 150%",
      onClick() {
        self.electron.ipcRenderer.send( "core:control:zoom", 1.5 )
      }
    } )

    zoomRow.createComponent( UIKit.Button, {
      label: "Zoom 200%",
      size: "small",
      onClick() {
        self.electron.ipcRenderer.send( "core:control:zoom", 2 )
      }
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
