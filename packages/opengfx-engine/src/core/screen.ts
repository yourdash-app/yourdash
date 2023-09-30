/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { GFX_RENDER_PIPELINE } from "./render/pipelines/index.ts";

export default class Screen<T extends GFX_RENDER_PIPELINE> {
  width = 400;
  height = 200;
  aspectRatio = 2;
  private screenContainer: HTMLElement;
  private screenElement: HTMLCanvasElement;
  context: ( T extends GFX_RENDER_PIPELINE.TwoDimensional ? CanvasRenderingContext2D : WebGL2RenderingContext ) | null;
  
  constructor( screenContainer: HTMLElement, screenElement: HTMLCanvasElement, pipeline: T ) {
    this.screenContainer = screenContainer;
    this.screenElement = screenElement;
    
    this.screenElement.width = this.width;
    this.screenElement.height = this.height;
    
    switch ( pipeline ) {
    case GFX_RENDER_PIPELINE.TwoDimensional:
      // @ts-ignore
      this.context = this.screenElement.getContext( "2d" );
      break;
    case GFX_RENDER_PIPELINE.ThreeDimensional:
      // @ts-ignore
      this.context = this.screenElement.getContext( "webgl2" );
      break;
    default:
      // @ts-ignore
      this.context = this.screenElement.getContext( "2d" );
      console.error( "Invalid render pipeline supplied to screen" );
      break;
    }
    
    let timeout: NodeJS.Timeout;
    
    // on resize, with a debounce delay of 100ms, update the screen
    window.addEventListener( "resize", () => {
      if ( timeout ) {
        clearTimeout( timeout );
      }
      timeout = setTimeout( this.update.bind( this ), 100 );
    } );
  }
  
  update() {
    this.width = this.screenContainer.offsetWidth;
    this.height = this.screenContainer.offsetHeight;
    this.aspectRatio = this.width / this.height;
    
    console.debug( `GFX screen updated X:${ this.width } Y:${ this.height }` );
    
    this.screenElement.width = this.width;
    this.screenElement.height = this.height;
  }
}
