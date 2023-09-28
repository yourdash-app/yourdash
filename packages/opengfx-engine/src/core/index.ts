/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { GFX_RENDER_PIPELINE } from "./render/pipelines/index";
import Screen from "./screen";

export default class Engine {
  private canvasElement: HTMLCanvasElement
  private containerElement: HTMLDivElement
  private renderPipeline: GFX_RENDER_PIPELINE
  screen: Screen
  
  constructor() {
    this.containerElement = document.createElement( "div" ) as HTMLDivElement
    this.canvasElement = document.createElement( "canvas" ) as HTMLCanvasElement
    this.containerElement.appendChild( this.canvasElement )
    this.renderPipeline = GFX_RENDER_PIPELINE.TwoDimensional
    this.screen = new Screen( this.containerElement, this.canvasElement )
  }
  
  start( containerElement: HTMLElement, pipeline: GFX_RENDER_PIPELINE = GFX_RENDER_PIPELINE.TwoDimensional ): Engine {
    console.debug( "OpenGFX engine started" )
    containerElement.appendChild( this.containerElement )
    this.containerElement.style.backgroundColor = "#333333"
    this.canvasElement.style.outline = "solid #000 0.125rem"
    this.containerElement.style.width = "100%"
    this.containerElement.style.height = "100%"
    
    this.screen.update()
    
    this.renderPipeline = pipeline
    
    return this
  }
}
