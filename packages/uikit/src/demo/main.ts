import UIKit from "../core";
import Button from "../core/components/buttons/button.ts";

function init() {
  const ui = new UIKit(document.body)

  ui.add(Button, { label: "Button Label" })
  ui.add(Button, { label: "Button Label" })
  ui.add(Button, { label: "Button Label" })
  ui.add(Button, { label: "Button Label" })
  ui.add(Button, { label: "Button Label" })
}

init()