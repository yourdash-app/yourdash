/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UIKit from "../core";
import { UK } from "../core";

function init() {
  const ui = UIKit.createContext( document.body as HTMLBodyElement );

  ui.createAndRenderComponent( UK.Card, {},
    {
      actions: UIKit.createComponent( UK.Button, { label: "Hello World!", onClick() { return 0 } } ),
      content: UIKit.createComponent( UK.Button, { label: "Hello World!", onClick() { return 0 } } ),
      headerExtras: UIKit.createComponent( UK.Button, { label: "Hello World!", onClick() { return 0 } } ),
    }
  )

  // createButtonsSection( ui );
  //
  // ui.renderComponent( UK.Button, { label: "Hello World!", onClick() { return 0 } } )
  //   .renderComponent( UK.Icon, {
  //     icon: UKIcon.Apps,
  //     color: "#ffffff",
  //     useDefaultColor: false
  //   } )
  //   .renderComponent( UK.Icon, {
  //     icon: UKIcon.ArrowDown
  //   } )
  //   .renderComponent( UK.Icon, {
  //     icon: UKIcon.Browser
  //   } )
  //   .renderComponent( UK.Icon, {
  //     icon: UKIcon.Broadcast
  //   } )
  //   .renderComponent( UK.Icon, {
  //     icon: UKIcon.Custom( "/vite.svg" )
  //   } )
  //   .renderComponent( UK.Slider, {
  //     onChange() { return 0 },
  //   } )
  //   .renderComponent( UK.Slider, {
  //     onChange() { return 0 },
  //     stepSize: 5
  //   } )
  //   .renderComponent( UK.Slider, {
  //     onChange() { return 0 },
  //     min: 0,
  //     max: 50,
  //     stepSize: 10
  //   } )
  //   .renderComponent( UK.Slider, {
  //     onChange() { return 0 },
  //     min: -50,
  //     stepSize: 5
  //   } )
  //   .renderComponent( UK.Slider, {
  //     onChange() { return 0 },
  //     max: 50,
  //     stepSize: 2
  //   } )
  //   .renderComponent( UK.Image, {
  //     src: "/vite.svg",
  //     alt: "logo",
  //   } )
  //   .renderComponent( UK.Dialog, {
  //     headlineIcon: UKIcon.Apps,
  //     headline: "Hello World!",
  //     description: "This is a sample dialog description.",
  //     closable: true,
  //   } )
}

init();
