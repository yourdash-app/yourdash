/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKComponentSlot from "./slot.ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UKComponentProps = ( { [ key: string ]: any } & { __debug?: boolean } ) | undefined
export type UKComponentSlots<T extends UKComponentSlotsProcessed> = { [ key in keyof T ]: UKComponentSlot<T[ key ]> }

export type UKComponentSlotsProcessed = { [ key: string ]: UKComponent}

export class UKComponent<
  ComponentProps extends UKComponentProps = UKComponentProps,
  ComponentSlots extends UKComponentSlotsProcessed = UKComponentSlotsProcessed
> {
  declare readonly __tslots__: ComponentSlots;
  domElement: HTMLElement;
  declare readonly parentDomElement: HTMLElement;
  props: ComponentProps;
  slots: UKComponentSlots<ComponentSlots>;

  constructor( props: ComponentProps ) {
    this.props = props || {} as ComponentProps;
    this.slots = {} as UKComponentSlots<ComponentSlots>;
    this.domElement = document.createElement( "uk-empty-component" ) as HTMLDivElement;

    return this;
  }

  render(): void {
    // This method is called when the component is requested to be rendered
  }
}
