/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */
import { ValidUKComponent } from "./component";

interface renderParams<Component extends ValidUKComponent> {
  props: Component["props"];
  slots?: Component["slots"];
  events?: {
    render: () => void,
    error: ( error: unknown ) => void
  }
}

export default function internalRender<Component extends ValidUKComponent>( component: new ( props: Component["props"] ) => Component, params: renderParams<Component> ) {
  try {
    const comp = new component( params.props );

    Object.keys( params.slots || {} ).forEach( slot => {
      if ( params.slots?.[slot].__internal__component && comp.slots ) {
        comp.slots[slot].__internal__component = params.slots[slot].__internal__component
      }
    } )

    return comp
  } catch ( e ) {
    params.events?.error( e )
  }
}
