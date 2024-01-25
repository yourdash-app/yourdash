/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Scene from "./scene/scene.ts";
import Screen from "./screen";

const clearColor = { r: 0.0, g: 0.5, b: 1.0, a: 1.0 };

const shaders = `
struct VertexOut {
  @builtin(position) position : vec4f,
  @location(0) color : vec4f
}

@vertex
fn vertex_main(@location(0) position: vec4f, @location(1) color: vec4f) -> VertexOut {
  var output : VertexOut;
  output.position = position;
  output.color = color;
  return output;
}

@fragment
fn fragment_main(fragData: VertexOut) -> @location(0) vec4f {
  return fragData.color;
}
`;

export class Engine {
  private readonly canvasElement: HTMLCanvasElement;
  private readonly containerElement: HTMLDivElement;
  screen: Screen;
  currentScene: Scene;
  gpuDevice: GPUDevice;
  renderPipeline: GPURenderPipeline;
  renderPassDescriptor: GPURenderPassDescriptor;
  gpuCommandEncoder: GPUCommandEncoder;

  constructor( webGpuDevice: GPUDevice, containerElement: HTMLElement ) {
    this.gpuDevice = webGpuDevice;
    console.debug( "OpenGFX engine started" );
    this.containerElement = document.createElement( "div" ) as HTMLDivElement;
    containerElement.appendChild( this.containerElement );
    this.canvasElement = document.createElement( "canvas" ) as HTMLCanvasElement;
    this.containerElement.appendChild( this.canvasElement );
    this.screen = new Screen( this.containerElement, this.canvasElement, this );
    this.currentScene = new Scene( {
      sessionId: "default_scene",
      objects: []
    }, this.screen );
    containerElement.appendChild( this.containerElement );
    this.containerElement.style.backgroundColor = "#333333";
    this.canvasElement.style.outline = "solid #000 0.125rem";
    this.containerElement.style.width = "100%";
    this.containerElement.style.height = "100%";

    this.screen.update();

    // const box = new GFXObject( this.screen, this.currentScene, this )
    // this.currentScene.appendObject( box )
    //
    // const shaderModule = this.gpuDevice.createShaderModule( {
    //   code: shaders
    // } );
    //
    // const vertexBuffers = [{
    //   attributes: [{
    //     shaderLocation: 0, // position
    //     offset: 0,
    //     format: "float32x4"
    //   }, {
    //     shaderLocation: 1, // color
    //     offset: 16,
    //     format: "float32x4"
    //   }],
    //   arrayStride: 32,
    //   stepMode: "vertex"
    // }];
    //
    // const pipelineDescriptor: GPURenderPipelineDescriptor = {
    //   vertex: {
    //     module: shaderModule,
    //     entryPoint: "vertex_main",
    //     // @ts-ignore
    //     buffers: vertexBuffers
    //   },
    //   fragment: {
    //     module: shaderModule,
    //     entryPoint: "fragment_main",
    //     targets: [{
    //       format: navigator.gpu.getPreferredCanvasFormat()
    //     }]
    //   },
    //   primitive: {
    //     topology: "triangle-list"
    //   },
    //   layout: "auto"
    // };
    // this.renderPipeline = this.gpuDevice.createRenderPipeline( pipelineDescriptor )
    // this.gpuCommandEncoder = this.gpuDevice.createCommandEncoder();
    //
    // this.renderPassDescriptor = {
    //   colorAttachments: [{
    //     clearValue: clearColor,
    //     loadOp: "clear",
    //     storeOp: "store",
    //     view: this.screen.context.getCurrentTexture().createView()
    //   }]
    // };
    //
    // const passEncoder = this.gpuCommandEncoder.beginRenderPass( this.renderPassDescriptor );
    //
    // passEncoder.setPipeline( this.renderPipeline );
    // passEncoder.setVertexBuffer( 0, this.currentScene.objects[0].vertexBuffer );
    // passEncoder.draw( this.currentScene.objects[ 0 ].mesh.length / 8 );
    // passEncoder.end();
    // this.gpuDevice.queue.submit( [this.gpuCommandEncoder.finish()] );
    //
    // this.currentScene.render();
  }

  setScene( scene: Scene ): this {
    this.currentScene = scene;
    this.currentScene.render();

    return this;
  }

  render(): this {
    // Clear screen
    this.screen.context

    console.debug( "rendering scene" );
    this.currentScene.render();

    return this;
  }
}

export default async function initEngine( containerElement: HTMLElement ) {
  const webGPUAdapter = await navigator.gpu.requestAdapter( { powerPreference: "high-performance" } );

  if ( !webGPUAdapter ) {
    throw new Error( "No GPU adapter found" );
  }

  const webGpuDevice = await webGPUAdapter.requestDevice();

  return new Engine( webGpuDevice, containerElement );
}
