/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKComponentSlot from "./slot.ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UKComponentProps = ( { [ key: string ]: any } & { slots?: UKComponentSlots, __debug?: boolean } ) | undefined
export type UKComponentSlots = { [key: string]: UKComponent }
export type UKComponentGeneratedSlots<Props extends UKComponentSlots> = { [ key in keyof Props ]: UKComponentSlot<Props[ key ]> | undefined }

type UKComponentInternalProps<
  Props extends UKComponentProps,
  Slots extends UKComponentSlots | undefined
> = Slots extends undefined
      ? Props
      /* @ts-ignore */
      : Omit<Props, "slots"> & { slots: UKComponentGeneratedSlots<Slots> }

export class UKComponent<
  ComponentProps extends UKComponentProps = UKComponentProps
> {
  domElement: HTMLElement;
  declare readonly parentDomElement: HTMLElement;
  props: UKComponentInternalProps<ComponentProps, ComponentProps extends { slots: UKComponentSlots } ? ComponentProps[ "slots" ] : undefined>;

  constructor( props: ComponentProps ) {
    this.props = props as UKComponentInternalProps<ComponentProps, ComponentProps extends { slots: UKComponentSlots } ? ComponentProps[ "slots" ] : undefined>;
    this.domElement = document.createElement( "uk-empty-component" ) as HTMLDivElement;

    if ( !this.props?.slots ) {
      Object.keys( this.props?.slots || {} ).forEach( key => {
        // @ts-ignore
        this.props.slots[ key ] = new UKComponentSlot( this.props.slots[ key ] );
      } )
    }

    return this;
  }

  render(): void {
    // This method is called when the component is requested to be rendered
  }
}
