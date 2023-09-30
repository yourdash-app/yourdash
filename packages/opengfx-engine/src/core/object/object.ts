/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { GFX_RENDER_PIPELINE } from "../render/pipelines/index.ts";
import Screen from "../screen.ts";

export default class GFXObject {
  properties: { [key: string]: any }
  position: { x: number, y: number }
  private screen: Screen<GFX_RENDER_PIPELINE.TwoDimensional>
  
  constructor() {
    this.properties = {}
    this.position = { x: 0, y: 0 }
    
    return this;
  }
  
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render( screen: Screen<GFX_RENDER_PIPELINE.TwoDimensional> ) {
    this.screen = screen
    
    console.debug( "rendering object" )
    return this;
  }
  
  setPosition( x: number, y: number ) {
    this.position.x = x
    this.position.y = y
  }
}
