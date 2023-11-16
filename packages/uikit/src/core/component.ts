/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import State from "./state.ts";

export type UKComponentState = { [ key: string ]: State<any> } // eslint-disable-line @typescript-eslint/no-explicit-any
export type UKComponentSlots = { [ key: string ]: State<UKComponent> }
export type UKComponentProps = { [ key: string ]: any }

export default class UKComponent<ComponentProps extends UKComponentProps = UKComponentProps, ComponentState extends UKComponentState = UKComponentState, ComponentSlots extends UKComponentSlots = UKComponentSlots> {
  domElement: HTMLElement;
  declare parentDomElement: HTMLElement;
  state: ComponentState;
  slots: ComponentSlots;
  props: ComponentProps;

  constructor( props: ComponentProps = {} ) {
    this.state = {} as ComponentState;
    this.slots = {} as ComponentSlots;
    this.props = props as ComponentProps;
    this.domElement = document.createElement( "uk-empty-component" ) as HTMLDivElement;

    return this;
  }
}
