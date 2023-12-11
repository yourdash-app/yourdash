/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UIKit from "../core";
import createButtonsSection from "./sections/buttons/buttons.ts";
import { UK } from "../core";
import { UKIcon } from "../core/icons/icons.ts";

function init() {
  const ui = new UIKit( document.body as HTMLBodyElement );

  createButtonsSection( ui );

  ui.createComponent( UK.Button, { label: "Hello World!", onClick() { return 0 } } )

  ui.createComponent( UK.Icon, {
    icon: UKIcon.Apps,
    color: "#ffffff",
    useDefaultColor: false
  } )

  ui.createComponent( UK.Icon, {
    icon: UKIcon.ArrowDown
  } )

  ui.createComponent( UK.Icon, {
    icon: UKIcon.Browser
  } )

  ui.createComponent( UK.Icon, {
    icon: UKIcon.Broadcast
  } )

  ui.createComponent( UK.Icon, {
    icon: UKIcon.Custom( "/vite.svg" )
  } );

  ui.createComponent( UK.Slider, {
    onChange( value: number ) { console.log( value ) },
  } );

  ui.createComponent( UK.Slider, {
    onChange( value: number ) { console.log( value ) },
    stepSize: 5
  } );

  ui.createComponent( UK.Slider, {
    onChange( value: number ) { console.log( value ) },
    min: 0,
    max: 50,
    stepSize: 10
  } );

  ui.createComponent( UK.Slider, {
    onChange( value: number ) { console.log( value ) },
    min: -50,
    stepSize: 5
  } );

  ui.createComponent( UK.Slider, {
    onChange( value: number ) { console.log( value ) },
    max: 50,
    stepSize: 2
  } );

  ui.createComponent( UK.Image, {
    src: "/vite.svg",
    alt: "logo",
  } );
}

init();
