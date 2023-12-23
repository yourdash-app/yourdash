/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKComponentSlot from "./slot.ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UKComponentProps = ( { [ key: string ]: any } & { slots?: { [key: string]: UKComponent }, __debug?: boolean } ) | undefined


export class UKComponent<
  ComponentProps extends UKComponentProps = UKComponentProps
> {
  domElement: HTMLElement;
  declare readonly parentDomElement: HTMLElement;
  props: ComponentProps

  constructor( props: ComponentProps ) {
    this.props = props
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
