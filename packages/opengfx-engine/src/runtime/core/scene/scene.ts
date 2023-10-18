/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import GFXObject from "../object/object.ts";
import Screen from "../screen.ts";

export default class Scene {
  // Replace with Object[]
  objects: GFXObject[]
  screen: Screen
  
  constructor( props: { id: string, objects: Scene["objects"] }, screen: Screen ) {
    this.objects = props.objects || []
    this.screen = screen
    
    return this
  }
  
  render() {
    console.debug( "CLEAR SCREEN" )
    // this.screen.context.clearRect( 0, 0, this.screen.width, this.screen.height )
    
    console.debug( "RENDER SCENE" )
    for ( let i = 0; i < this.objects.length; i++ ) {
      const obj = this.objects[i]
      
      obj.render()
      // this.screen.context.strokeStyle = "#ff0000"
      // this.screen.context.lineWidth = 5
      // this.screen.context.strokeRect( obj.position.x, obj.position.y, 50, 50 )
    }
    
    return this
  }
  
  appendObject( object: GFXObject ) {
    this.objects.push( object )
  }
}
