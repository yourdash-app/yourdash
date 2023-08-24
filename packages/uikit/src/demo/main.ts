import UIKit from "../core";
import Image from "../core/components/image/image.ts";
import createButtonsSection from "./sections/buttons/buttons.ts";
import Card from "../core/components/card/card.ts";

function init() {
  const ui = new UIKit(document.body)

  createButtonsSection(ui)

  const card = ui.add(Card, {})

  card.slots.content.create(Image, {
    src: "/vite.svg",
    alt: "logo"
  })

  card.setLabel("Button 1 Label")

  ui.add(Image, {
    src: "/vite.svg",
    alt: "logo"
  })
}

init()