/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { ValidUKComponent } from "./component";

interface RenderTreeSegment<Component extends ValidUKComponent> {
  component: new ( props: Component["props"] ) => Component;
  props: Component["props"];
  slots?: Component["slots"];
}

export default function renderRenderTree<C extends ValidUKComponent>( tree: RenderTreeSegment<C> ) {
  const component = new tree.component( tree.props );

  Object.keys( tree.slots || {} ).forEach( slot => {
    component.slots[slot].setComponent( tree.slots[slot].getComponent() );
  } )

  return component
}

/*
 * render a tree of components or dom-like-components
 * how could I gain element references from a tree?
 *
 * component?: ValidUKComponent
 * referenceId?: string
 * props?: UKComponentProps
 * slots?: UKComponentSlots
 */
