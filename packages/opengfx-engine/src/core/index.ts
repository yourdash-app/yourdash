/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import GFX_RENDER_PIPELINE from "./render/pipelines/index.ts";

export default class Engine {
  private containerElement: HTMLDivElement
  private renderPipeline: GFX_RENDER_PIPELINE
  
  constructor() {
    this.containerElement = document.createElement( "div" ) as HTMLDivElement
    this.renderPipeline = GFX_RENDER_PIPELINE.TwoDimensional
  }
  
  start( containerElement: HTMLElement ) {
    containerElement.appendChild( this.containerElement )
    this.containerElement.style.width = "100%"
    this.containerElement.style.height = "100%"
    return this
  }
}
