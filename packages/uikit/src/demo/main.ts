/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UIKit from "../core";
import Image from "../core/components/image/image.ts";
import createButtonsSection from "./sections/buttons/buttons.ts";
import { UK } from "../core";
import { UKIcon } from "../core/icons/icons.ts";

function init() {
  const ui = new UIKit( document.body as HTMLDivElement );

  createButtonsSection( ui );

  ui.createComponent( UK.Icon, {
    icon: UKIcon.Heart,
  } )

  ui.createComponent( UK.Icon, {
    icon: UKIcon.Apps
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

  ui.createComponent( Image, {
    src: "/vite.svg",
    alt: "logo"
  } );
}

init();
