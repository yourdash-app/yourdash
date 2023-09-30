/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { GFX_RENDER_PIPELINE } from "./render/pipelines/index";
import Scene from "./scene/scene.ts";
import Screen from "./screen";

export default class Engine<T extends GFX_RENDER_PIPELINE> {
  private readonly canvasElement: HTMLCanvasElement
  private readonly containerElement: HTMLDivElement
  private renderPipeline: GFX_RENDER_PIPELINE
  screen: Screen<T>
  currentScene: Scene
  
  constructor( containerElement: HTMLElement, pipeline: GFX_RENDER_PIPELINE = GFX_RENDER_PIPELINE.TwoDimensional ) {
    console.debug( "OpenGFX engine started" )
    this.containerElement = document.createElement( "div" ) as HTMLDivElement
    containerElement.appendChild( this.containerElement )
    this.canvasElement = document.createElement( "canvas" ) as HTMLCanvasElement
    this.containerElement.appendChild( this.canvasElement )
    this.renderPipeline = pipeline
    this.screen = new Screen( this.containerElement, this.canvasElement, this.renderPipeline )
    this.currentScene = new Scene( { id: "default_scene", objects: [] } )
    containerElement.appendChild( this.containerElement )
    this.containerElement.style.backgroundColor = "#333333"
    this.canvasElement.style.outline = "solid #000 0.125rem"
    this.containerElement.style.width = "100%"
    this.containerElement.style.height = "100%"
    
    this.screen.update()
    this.currentScene.render( this.screen )
  }
  
  setScene( scene: Scene ): this {
    this.currentScene = scene
    this.currentScene.render( this.screen )
    
    return this
  }
}
