/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UIKit from "../../../core";
import createDisabledButtons from "./disabledButtons.ts";
import createTransparentButtons from "./transparentButtons.ts";
import createButtons from "./normalButtons.ts";
import Card from "../../../core/components/card/card.ts";

export default function createButtonsSection( ui: UIKit ) {
  const cardContainer = ui.createComponent( Card, {  } )

  createButtons( cardContainer as Card )
  createTransparentButtons( cardContainer as Card )
  createDisabledButtons( cardContainer as Card )
}
