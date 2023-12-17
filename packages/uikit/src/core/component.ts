/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKComponentSlot from "./slot.ts";

export type UKComponentSlots = { [ key: string ]: UKComponentSlot } | undefined
export type UKComponentProps = { [ key: string ]: unknown } | undefined

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
    this.props = props as ComponentProps || {} as ComponentProps;
    this.domElement = document.createElement( "uk-empty-component" ) as HTMLDivElement;

    return this;
  }
}

export class UKSlotComponent<
  ComponentProps extends UKComponentProps = UKComponentProps
> extends UKComponent<ComponentProps, undefined> {
  // @ts-ignore
  domElement: HTMLElement;
  declare readonly parentDomElement: HTMLElement;

  constructor( props: ComponentProps ) {
    super( props );

    return this;
  }
}


export type ValidUKComponent<
  ComponentProps extends UKComponentProps = UKComponentProps,
  ComponentSlots extends UKComponentSlots = UKComponentSlots
> = UKComponent<ComponentProps, ComponentSlots> | UKSlotComponent<ComponentProps>
