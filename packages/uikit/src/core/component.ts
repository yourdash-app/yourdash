/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import State from "./state.ts";

export type UKComponentState = { [ name: string ]: State<any> } // eslint-disable-line @typescript-eslint/no-explicit-any
export type UKComponentSlots = { [ name: string ]: State<UKComponent<UKComponentProps>> }

export default class UKComponent<ComponentProps extends UKComponentProps, ComponentState extends UKComponentState = UKComponentState, ComponentSlots extends UKComponentSlots = UKComponentSlots> {
  declare domElement: HTMLElement;
  declare parentDomElement: HTMLElement;
  state: ComponentState;
  slots: ComponentSlots;
  props: ComponentProps;
  
  constructor( props: ComponentProps ) {
    this.props = props;
    this.state = {} as ComponentState;
    this.slots = {} as ComponentSlots;
    
    return this;
  }
}
