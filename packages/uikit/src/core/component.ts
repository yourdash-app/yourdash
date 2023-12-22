/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export type UKComponentProps = ( { [ key: string ]: unknown } & { slots?: { [key: string]: ValidUKComponent }, __debug: boolean } ) | undefined

export class UKComponent<
  ComponentProps = UKComponentProps,
> {
  domElement: HTMLElement;
  declare readonly parentDomElement: HTMLElement;
  props: ComponentProps;

  constructor( props: ComponentProps ) {
    this.props = props as ComponentProps || {} as ComponentProps;
    this.domElement = document.createElement( "uk-empty-component" ) as HTMLDivElement;

    return this;
  }
}

export class UKSlotComponent<
  ComponentProps = UKComponentProps
> extends UKComponent<ComponentProps> {
  // @ts-ignore
  domElement: HTMLElement;
  declare readonly parentDomElement: HTMLElement;

  constructor( props: ComponentProps ) {
    super( props );

    return this;
  }
}


// TODO: REMOVE ME
export type ValidUKComponent = UKComponent
