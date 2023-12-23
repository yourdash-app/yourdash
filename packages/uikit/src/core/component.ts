/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
import UKComponentSlot from "./slot.ts";

export type UKComponentProps = ( { [ key: string ]: any } & { __debug?: boolean } ) | undefined
export type UKComponentSlots = { [ key: string ]: UKComponentSlot<UKComponent> }

export class UKComponent<
  ComponentProps extends UKComponentProps = UKComponentProps,
  ComponentSlots extends UKComponentSlots = UKComponentSlots
> {
  domElement: HTMLElement;
  declare readonly parentDomElement: HTMLElement;
  props: ComponentProps;
  slots: ComponentSlots;

  constructor( props: ComponentProps ) {
    this.props = props || {} as ComponentProps;
    this.slots = {} as ComponentSlots;
    this.domElement = document.createElement( "uk-empty-component" ) as HTMLDivElement;

    return this;
  }

  render(): void {
    // This method is called when the component is requested to be rendered
  }
}
