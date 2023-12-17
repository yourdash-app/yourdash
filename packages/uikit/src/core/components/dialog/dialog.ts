/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKComponent, ValidUKComponent } from "../../component.ts";
import { UKIcon } from "../../icons/icons.ts";
import { UK } from "../../index.ts";
import UKComponentSlot from "../../slot.ts";
import { Empty } from "../index.ts";

export default class Dialog extends UKComponent<{
  closable?: boolean;
  headlineIcon?: typeof UKIcon;
  headline?: string;
  description?: string;
}, {
  content?: UKComponentSlot<ValidUKComponent>,
  options?: UKComponentSlot<Empty | UK.Button /* TODO: implement this => UK.Link */>
}> {
  domElement: HTMLDivElement
  headlineElement: HTMLHeadingElement
  descriptionElement: HTMLDivElement
  headlineIconComponent: UK.Icon

  constructor( props: Dialog["props"] ) {
    super( props );
  }
}
