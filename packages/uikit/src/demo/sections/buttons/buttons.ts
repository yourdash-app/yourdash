/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKContext from "../../../core/context.ts";
import createDisabledButtons from "./disabledButtons.ts";
import createTransparentButtons from "./transparentButtons.ts";
import createButtons from "./normalButtons.ts";
import { UK } from "../../../core/index.ts";

export default function createButtonsSection( ui: UKContext ) {
  const cardContainer = ui.createAndRenderComponent( UK.Card, {} )

  createButtons( cardContainer )
  createTransparentButtons( cardContainer )
  createDisabledButtons( cardContainer )
}
