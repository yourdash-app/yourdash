/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UIKit from "../core";
import { UK } from "../core";
import { UKIcon } from "../core/icons/icons.ts";
import createButtonsSection from "./sections/buttons/buttons.ts";

function init() {
  const ui = UIKit.createContext( document.body as HTMLBodyElement );

  createButtonsSection( ui );

  ui.createAndRenderComponent( UK.Button, { label: "Hello World!", onClick() { return 0 } } )
    .createAndRenderComponent( UK.Icon, {
      icon: UKIcon.Apps,
      color: "#ffffff",
      useDefaultColor: false
    } )
    .createAndRenderComponent( UK.Icon, {
      icon: UKIcon.ArrowDown
    } )
    .createAndRenderComponent( UK.Icon, {
      icon: UKIcon.Browser
    } )
    .createAndRenderComponent( UK.Icon, {
      icon: UKIcon.Broadcast
    } )
    .createAndRenderComponent( UK.Icon, {
      icon: UKIcon.Custom( "/vite.svg" )
    } )
    .createAndRenderComponent( UK.Slider, {
      onChange() { return 0 },
    } )
    .createAndRenderComponent( UK.Slider, {
      onChange() { return 0 },
      stepSize: 5
    } )
    .createAndRenderComponent( UK.Slider, {
      onChange() { return 0 },
      min: 0,
      max: 50,
      stepSize: 10
    } )
    .createAndRenderComponent( UK.Slider, {
      onChange() { return 0 },
      min: -50,
      stepSize: 5
    } )
    .createAndRenderComponent( UK.Slider, {
      onChange() { return 0 },
      max: 50,
      stepSize: 2
    } )
    .createAndRenderComponent( UK.Image, {
      src: "/vite.svg",
      alt: "logo",
    } )
    .createAndRenderComponent( UK.Dialog, {
      headlineIcon: UKIcon.Apps,
      headline: "Hello World!",
      description: "This is a sample dialog description.",
      closable: true,
    }, {
      content: UIKit.createComponent( UK.Slider, { onChange( value: number ) { return value } } )
    } )
}

init();
