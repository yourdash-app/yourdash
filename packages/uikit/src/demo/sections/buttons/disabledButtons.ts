import Button from "../../../core/components/buttons/button.ts";
import Card from "../../../core/components/card/card.ts";

export default function createDisabledButtons(card: Card) {
  card.slots.content.create(Button, {
    label: "Button 1 Label",
    onClick() {
      console.log("Button 1 Clicked")
    },
    size: "small",
    disabled: true
  })
  card.slots.content.create(Button, {
    label: "Button 2 Label",
    onClick() {
      console.log("Button 2 Clicked")
    },
    size: "medium",
    disabled: true
  })
  card.slots.content.create(Button, {
    label: "Button 3 Label",
    onClick() {
      console.log("Button 3 Clicked")
    },
    size: "large",
    disabled: true
  })
}