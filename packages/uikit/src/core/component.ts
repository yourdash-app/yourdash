/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import State from "./state.ts";

export type UKComponentState = { [ name: string ]: State<any> } // eslint-disable-line @typescript-eslint/no-explicit-any
export type UKComponentSlots = { [ name: string ]: State<UKComponent> }

export default class UKComponent<ComponentState extends UKComponentState = UKComponentState, ComponentSlots extends UKComponentSlots = UKComponentSlots> {
  domElement: HTMLElement;
  declare parentDomElement: HTMLElement;
  state: ComponentState;
  slots: ComponentSlots;
  
  constructor() {
    this.state = {} as ComponentState;
    this.slots = {} as ComponentSlots;
    this.domElement = document.createElement( "uk-empty-component" ) as HTMLDivElement
    
    return this;
  }
}
