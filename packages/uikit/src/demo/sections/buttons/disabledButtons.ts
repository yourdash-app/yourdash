/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Button from "../../../core/components/buttons/button/button.ts";
import Card from "../../../core/components/card/card.ts";

export default function createDisabledButtons(card: Card) {
  card.slots.content.createComponent(Button, {
    label: "Button 1 Label",
    onClick() {
      console.log("Button 1 Clicked")
    },
    size: "small",
    disabled: true
  })
  card.slots.content.createComponent(Button, {
    label: "Button 2 Label",
    onClick() {
      console.log("Button 2 Clicked")
    },
    size: "medium",
    disabled: true
  })
  card.slots.content.createComponent(Button, {
    label: "Button 3 Label",
    onClick() {
      console.log("Button 3 Clicked")
    },
    size: "large",
    disabled: true
  })
}