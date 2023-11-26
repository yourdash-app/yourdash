/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKComponentSlot from "./slot.ts";
import State from "./state.ts";

export type UKComponentSlots = { [ key: string ]: State<ValidUKComponent> }
export type UKComponentProps = { [ key: string ]: any } | undefined  // eslint-disable-line @typescript-eslint/no-explicit-any

export class UKComponent<
  ComponentProps extends UKComponentProps = UKComponentProps,
  ComponentSlots extends UKComponentSlots = UKComponentSlots
> {
  domElement: HTMLElement;
  declare readonly parentDomElement: HTMLElement;
  slots: ComponentSlots;
  props: ComponentProps;

  constructor( props: ComponentProps ) {
    this.slots = {} as ComponentSlots;
    this.props = props as ComponentProps;
    this.domElement = document.createElement( "uk-empty-component" ) as HTMLDivElement;

    return this;
  }
}

export class UKSlotComponent<
  ComponentProps extends UKComponentProps = UKComponentProps
>
  extends UKComponentSlot {
  declare readonly parentDomElement: HTMLElement;
  props: ComponentProps;

  constructor( props: ComponentProps ) {
    super( document.createElement( "uk-empty-component" ) as HTMLDivElement );

    this.props = props as ComponentProps;

    return this;
  }
}


export type ValidUKComponent = UKComponent | UKSlotComponent
