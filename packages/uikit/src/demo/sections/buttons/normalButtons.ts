/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Button from "../../../core/components/button/button.ts";
import Card from "../../../core/components/card/card.ts";

export default function createButtons( card: Card ) {
  card.slots.content.createComponent( Button, {
    label: "Button 1 Label",
    onClick() {
      console.log( "Button 1 Clicked" )
    },
    size: "small"
  } )

  card.slots.content.createComponent( Button, {
    label: "Button 2 Label",
    onClick() {
      console.log( "Button 2 Clicked" )
    },
    size: "medium"
  } )

  card.slots.content.createComponent( Button, {
    label: "Button 3 Label",
    onClick() {
      console.log( "Button 3 Clicked" )
    },
    size: "large"
  } )
}
