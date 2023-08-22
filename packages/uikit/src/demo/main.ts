import UIKit from "../core";
import Button from "../core/components/buttons/button.ts";
import Image from "../core/components/image/image.ts";

function init() {
  const ui = new UIKit( document.body )

  ui.add( Button, {
    label: "Button 1 Label",
    onClick() {
      console.log( "Button 1 Clicked" )
    }
  } )
  ui.add( Button, {
    label: "Button 2 Label",
    onClick() {
      console.log( "Button 2 Clicked" )
    }
  } )
  ui.add( Button, {
    label: "Button 3 Label",
    onClick() {
      console.log( "Button 3 Clicked" )
    }
  } )
  ui.add( Button, {
    label: "Button 4 Label",
    onClick() {
      console.log( "Button 4 Clicked" )
    }
  } )
  ui.add( Button, {
    label: "Button 5 Label",
    onClick() {
      console.log( "Button 5 Clicked" )
    }
  } )
  ui.add( Image, {
    src: "/vite.svg",
    alt: "logo"
  } )
}

init()