/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Engine } from "../index.ts";
import Scene from "../scene/scene.ts";
import Screen from "../screen.ts";
import vertexHelper from "../vertex.ts";

export default class GFXObject {
  properties: { [key: string]: any }
  position: { x: number, y: number }
  mesh: Float32Array
  vertexBuffer: GPUBuffer;
  protected screen: Screen
  private _renderNextFrame: boolean
  parentContainer: Scene | GFXObject
  
  constructor( screen: GFXObject["screen"], parentContainer: Scene | GFXObject, engine: Engine ) {
    this.properties = {}
    this.position = { x: 0, y: 0 }
    this.screen = screen
    this._renderNextFrame = false
    this.parentContainer = parentContainer
    this.mesh = new Float32Array( [
      ...vertexHelper( { x:-0.5, y:0.5, z:0, w:2 }, { red: 1, green: 0, blue: 0, alpha: 1 } ),
      ...vertexHelper( { x:0.5, y:0.5, z:0, w:2 }, { red: 0, green: 1, blue: 0, alpha: 1 } ),
      ...vertexHelper( { x:0.5, y:-0.5, z:0, w:2 }, { red: 0, green: 1, blue: 0, alpha: 1 } ),
      ...vertexHelper( { x:1, y:-1, z:0, w:2 }, { red: 1, green: 1, blue: 1, alpha: 1 } )
    ] )
    this.vertexBuffer = engine.gpuDevice.createBuffer( {
      size: this.mesh.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    } );
    engine.gpuDevice.queue.writeBuffer( this.vertexBuffer, 0, this.mesh, 0, this.mesh.length );
    
    return this;
  }
  
  render() {
    console.debug( "rendering object" )
    return this;
  }
  
  queueRender() {
    if ( this._renderNextFrame ) {
      requestAnimationFrame( () => {
        if ( this.parentContainer instanceof Scene ) {
          this.parentContainer.render()
        } else {
          this.parentContainer.queueRender()
        }
      } )
    }
  }
  
  setPosition( x: number, y: number ) {
    this.position.x = x
    this.position.y = y
    
    this._renderNextFrame = true
  }
}
