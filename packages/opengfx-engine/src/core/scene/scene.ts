/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import GFXObject from "../object/object.ts";
import { GFX_RENDER_PIPELINE } from "../render/pipelines/index.ts";
import Screen from "./../screen.ts"

export default class Scene {
  // Replace with Object[]
  objects: GFXObject[]
  
  constructor( props: { id: string, objects: Scene["objects"] } ) {
    this.objects = props.objects || []
    
    return this
  }
  
  render( screen: Screen<GFX_RENDER_PIPELINE> ) {
    console.debug( "rendering scene" )
    this.objects.forEach( object => {
      object.render( screen )
    } )
    
    return this
  }
}
