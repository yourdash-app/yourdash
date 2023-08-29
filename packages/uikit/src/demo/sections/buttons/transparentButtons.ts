import Button from "../../../core/components/buttons/button/button.ts";
import Card from "../../../core/components/card/card.ts";

export default function createTransparentButtons(card: Card) {
  card.slots.content.createComponent(Button, {
    label: "Button 1 Label",
    onClick() {
      console.log("Button 1 Clicked")
    },
    size: "small",
    transparent: true
  })

  card.slots.content.createComponent(Button, {
    label: "Button 2 Label",
    onClick() {
      console.log("Button 2 Clicked")
    },
    size: "medium",
    transparent: true
  })

  card.slots.content.createComponent(Button, {
    label: "Button 3 Label",
    onClick() {
      console.log("Button 3 Clicked")
    },
    size: "large",
    transparent: true
  })
}