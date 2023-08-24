import UIKit from "../../../core";
import createDisabledButtons from "./disabledButtons.ts";
import createTransparentButtons from "./transparentButtons.ts";
import createButtons from "./normalButtons.ts";
import Card from "../../../core/components/card/card.ts";

export default function createButtonsSection(ui: UIKit) {
  const cardContainer = ui.add(Card, {  })

  createButtons(cardContainer)
  createTransparentButtons(cardContainer)
  createDisabledButtons(cardContainer)
}