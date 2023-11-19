/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UIKit from "../core";
import Image from "../core/components/image/image.ts";
import createButtonsSection from "./sections/buttons/buttons.ts";
import Icon from "../core/components/icon/icon.ts";
import { UKIcon } from "../core/icons/icons.ts";

function init() {
  const ui = new UIKit( document.body );

  createButtonsSection( ui );

  ui.createComponent( Icon, {
    icon: UKIcon.Archive
  } )

  ui.createComponent( Icon, {
    icon: UKIcon.Apps
  } )

  ui.createComponent( Icon, {
    icon: UKIcon.ArrowDown
  } )

  ui.createComponent( Icon, {
    icon: UKIcon.Browser
  } )

  ui.createComponent( Icon, {
    icon: UKIcon.Broadcast
  } )

  ui.createComponent( Image, {
    src: "/vite.svg",
    alt: "logo"
  } );
}

init();
