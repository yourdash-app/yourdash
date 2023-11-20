/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKComponentProps, UKComponentState } from "./component.ts";
import UKComponentSlot from "./slot.ts";

export default class UKSlotComponent<ComponentProps extends UKComponentProps = UKComponentProps, ComponentState extends UKComponentState = UKComponentState> extends UKComponentSlot {
  declare parentDomElement: HTMLElement;
  state: ComponentState;
  props: ComponentProps;

  // @ts-ignore
  constructor( props: ComponentProps = {} ) {
    super( document.createElement( "div" ) );

    this.state = {} as ComponentState;
    this.props = props as ComponentProps;

    return this;
  }
}
