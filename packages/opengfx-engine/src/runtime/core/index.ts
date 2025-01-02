/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import GFXObject from "./object/object.ts";
import Scene from "./scene/scene.ts";
import Screen from "./screen";

// const shaders = `
// struct VertexOut {
//   @builtin(position) position : vec4f,
//   @location(0) color : vec4f
// }
//
// @vertex
// fn vertex_main(@location(0) position: vec4f, @location(1) color: vec4f) -> VertexOut {
//   var output : VertexOut;
//   output.position = position;
//   output.color = color;
//   return output;
// }
//
// @fragment
// fn fragment_main(fragData: VertexOut) -> @location(0) vec4f {
//   return fragData.color;
// }
// `;

export class Engine {
  private readonly canvasElement: HTMLCanvasElement;
  private readonly containerElement: HTMLDivElement;
  screen: Screen;
  currentScene: Scene;
  gpuDevice: GPUDevice;
  renderPipeline: GPURenderPipeline;

  constructor(webGpuDevice: GPUDevice, containerElement: HTMLElement) {
    this.gpuDevice = webGpuDevice;
    console.debug("OpenGFX engine started");
    this.containerElement = document.createElement("div") as HTMLDivElement;
    containerElement.appendChild(this.containerElement);
    this.canvasElement = document.createElement("canvas") as HTMLCanvasElement;
    this.containerElement.appendChild(this.canvasElement);
    this.screen = new Screen(this.containerElement, this.canvasElement, this);
    this.currentScene = new Scene(
      {
        id: "default_scene",
        objects: [],
      },
      this.screen,
    );
    containerElement.appendChild(this.containerElement);
    this.containerElement.style.backgroundColor = "#333333";
    this.canvasElement.style.outline = "solid #000 0.125rem";
    this.containerElement.style.width = "100%";
    this.containerElement.style.height = "100%";

    this.screen.update();

    const box = new GFXObject(this.screen, this.currentScene, this);
    this.currentScene.appendObject(box);

    const vertices = new Float32Array([
      -0.8, -0.8, 0.8, -0.8, 0.8, 0.8,

      -0.8, -0.8, 0.8, 0.8, -0.8, 0.8,
    ]);
    const vertexBuffer = this.gpuDevice.createBuffer({
      label: "Cell vertices",
      size: vertices.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });
    this.gpuDevice.queue.writeBuffer(vertexBuffer, 0, vertices);

    const vertexBufferLayout = {
      arrayStride: 8,
      attributes: [
        {
          format: "float32x2",
          offset: 0,
          shaderLocation: 0, // Position. Matches @location(0) in the @vertex shader.
        },
      ],
    };

    const cellShaderModule = this.gpuDevice.createShaderModule({
      label: "Cell shader",
      code: `struct VertexOutput {
            @builtin(position) position: vec4f,
            @location(0) cell: vec2f,
          };

          @group(0) @binding(0) var<uniform> grid: vec2f;
          @group(0) @binding(1) var<storage> cellState: array<u32>;

          @vertex
          fn vertexMain(@location(0) position: vec2f,
                        @builtin(instance_index) instance: u32) -> VertexOutput {
            let i = f32(instance);
            let cell = vec2f(i % grid.x, floor(i / grid.x));
            let state = f32(cellState[instance]);

            let cellOffset = cell / grid * 2;
            let gridPos = (position*state+1) / grid - 1 + cellOffset;

            var output: VertexOutput;
            output.position = vec4f(gridPos, 0, 1);
            output.cell = cell;
            return output;
          }

          @fragment
          fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
            let c = input.cell / grid;
            return vec4f(c, 1-c.x, 1);
          }`,
    });

    this.renderPipeline = this.gpuDevice.createRenderPipeline({
      label: "Cell pipeline",
      layout: "auto",
      vertex: {
        module: cellShaderModule,
        entryPoint: "vertexMain",
        // @ts-ignore
        buffers: [vertexBufferLayout],
      },
      fragment: {
        module: cellShaderModule,
        entryPoint: "fragmentMain",
        targets: [
          {
            format: this.screen.preferedFormat,
          },
        ],
      },
    });

    // Create a uniform buffer that describes the grid.
    const uniformArray = new Float32Array([32, 32]);
    const uniformBuffer = this.gpuDevice.createBuffer({
      label: "Grid Uniforms",
      size: uniformArray.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    this.gpuDevice.queue.writeBuffer(uniformBuffer, 0, uniformArray);

    // Create an array representing the active state of each cell.
    const cellStateArray = new Uint32Array(64 * 64);

    const cellStateStorage = [
      this.gpuDevice.createBuffer({
        label: "Cell State A",
        size: cellStateArray.byteLength,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
      }),
      this.gpuDevice.createBuffer({
        label: "Cell State B",
        size: cellStateArray.byteLength,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
      }),
    ];

    // Mark every third cell of the first grid as active.
    for (let i = 0; i < cellStateArray.length; i += 3) {
      cellStateArray[i] = 1;
    }
    this.gpuDevice.queue.writeBuffer(cellStateStorage[0], 0, cellStateArray);

    // Mark every other cell of the second grid as active.
    for (let i = 0; i < cellStateArray.length; ++i) {
      cellStateArray[i] = i % 2;
    }
    this.gpuDevice.queue.writeBuffer(cellStateStorage[1], 0, cellStateArray);

    const bindGroups = [
      this.gpuDevice.createBindGroup({
        label: "Cell renderer bind group A",
        layout: this.renderPipeline.getBindGroupLayout(0),
        entries: [
          {
            binding: 0,
            resource: { buffer: uniformBuffer },
          },
          {
            binding: 1,
            resource: { buffer: cellStateStorage[0] },
          },
        ],
      }),
      this.gpuDevice.createBindGroup({
        label: "Cell renderer bind group B",
        layout: this.renderPipeline.getBindGroupLayout(0),
        entries: [
          {
            binding: 0,
            resource: { buffer: uniformBuffer },
          },
          {
            binding: 1,
            resource: { buffer: cellStateStorage[1] },
          },
        ],
      }),
    ];

    let step = 0;
    const updateGrid = () => {
      step++; // Increment the step count

      // Start a render pass
      const encoder = this.gpuDevice.createCommandEncoder();
      const pass = encoder.beginRenderPass({
        colorAttachments: [
          {
            view: this.screen.context.getCurrentTexture().createView(),
            loadOp: "clear",
            clearValue: { r: 0, g: 0, b: 0.4, a: 1.0 },
            storeOp: "store",
          },
        ],
      });

      // Draw the grid.
      pass.setPipeline(this.renderPipeline);
      pass.setBindGroup(0, bindGroups[step % 2]); // Updated!
      pass.setVertexBuffer(0, vertexBuffer);
      pass.draw(vertices.length / 2, 64);

      // End the render pass and submit the command buffer
      pass.end();
      this.gpuDevice.queue.submit([encoder.finish()]);

      setTimeout(() => {
        requestAnimationFrame(updateGrid.bind(this));
      }, 100);
    };
    requestAnimationFrame(updateGrid.bind(this));
  }

  setScene(scene: Scene): this {
    this.currentScene = scene;
    this.currentScene.render();

    return this;
  }

  render(): this {
    // Clear screen
    this.screen.context;

    console.debug("rendering scene");
    this.currentScene.render();

    return this;
  }
}

export default async function initEngine(containerElement: HTMLElement) {
  const webGPUAdapter = await navigator.gpu.requestAdapter({
    powerPreference: "high-performance",
  });

  if (!webGPUAdapter) {
    throw new Error("No GPU adapter found");
  }

  const webGpuDevice = await webGPUAdapter.requestDevice();

  return new Engine(webGpuDevice, containerElement);
}
