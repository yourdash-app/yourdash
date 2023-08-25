import UIKit from "../core";
import Image from "../core/components/image/image.ts";
import createButtonsSection from "./sections/buttons/buttons.ts";
import Card from "../core/components/card/card.ts";

function init() {
  const ui = new UIKit( document.body );
  
  createButtonsSection( ui );
  
  ui.add( Image, {
    src: "/vite.svg",
    alt: "logo"
  } );
}

init();