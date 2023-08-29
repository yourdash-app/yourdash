import UIKit from "../core";
import Image from "../core/components/image/image.ts";
import createButtonsSection from "./sections/buttons/buttons.ts";
import Icon from "../core/components/icon/icon.ts";
import { UKIcon } from "../core/icons/icons.ts";

function init() {
  const ui = new UIKit( document.body );
  
  createButtonsSection( ui );

  ui.add( Icon, {
    icon: UKIcon.Archive
  } )
  
  ui.add( Icon, {
    icon: UKIcon.Apps
  } )

  ui.add( Icon, {
    icon: UKIcon.ArrowDown
  } )

  ui.add( Icon, {
    icon: UKIcon.Browser
  } )

  ui.add( Icon, {
    icon: UKIcon.Broadcast
  } )
  
  ui.add( Image, {
    src: "/vite.svg",
    alt: "logo"
  } );
}

init();