/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKComponentSlots, ValidUKComponent } from "./component.ts";
import * as UIKit from "./index.ts";

/* UKTree

  <T extends ValidUKComponent>[ T, T["props"], T["slots"]][]

  make slots optional

 */

export type UKTree<T extends ValidUKComponent> = [ T, T["props"], T extends { slots: UKComponentSlots } ? T["slots"] : undefined ][]


export default [
  [ UIKit.Box, { noBorder: true }, undefined],
  [ UIKit.Text as unknown as ValidUKComponent, { content: true }, undefined],
] as UKTree<ValidUKComponent>;
