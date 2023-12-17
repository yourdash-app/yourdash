/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKComponentSlots, ValidUKComponent } from "./component.ts";

export interface UKTree<T extends ValidUKComponent = ValidUKComponent> {
  component: new ( props: T["props"] ) => T,
  props: T["props"];
  slots: T extends { slots: UKComponentSlots } ? T["slots"] : undefined;
}
