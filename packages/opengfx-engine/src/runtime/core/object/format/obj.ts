import { Engine } from "../../index.ts";
import Screen from "../../screen.ts";

export default class LoadObj {
  screen: Screen;
  engine: Engine;
  rawData: { lines: string[] };
  objects: { [key: string]: { mesh: number[] } };
  mesh: Float32Array;

  async load(objectData: string) {
    this.rawData.lines = objectData.split("\n");

    console.log(this.rawData.lines);

    let currentObject = "";

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

    const shaderModule = this.engine.gpuDevice.createShaderModule({
      code: shaders,
    });

    this.rawData.lines.map((line) => {
      if (line.startsWith("o")) {
        currentObject = line.replace("o ", "");
        this.objects[currentObject] = {
          mesh: [],
        };
      }

      if (line.startsWith("v")) {
        const coordinate: number[] = [];
        line = line.replace("v ", "");
        const lineParams = line.split(" ");

        lineParams.forEach((pos, ind) => {
          coordinate[ind] = parseFloat(pos as string);
        });

        this.objects[currentObject].mesh.push(coordinate[0]);
        this.objects[currentObject].mesh.push(coordinate[1]);
        this.objects[currentObject].mesh.push(coordinate[2]);
        this.objects[currentObject].mesh.push(0);
        this.objects[currentObject].mesh.push(1);
        this.objects[currentObject].mesh.push(1);
        this.objects[currentObject].mesh.push(1);
        this.objects[currentObject].mesh.push(0.5);
      }
    });

    this.mesh = new Float32Array(this.objects[currentObject].mesh);

    const vertexBuffer = this.engine.gpuDevice.createBuffer({
      size: this.mesh.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });

    this.engine.gpuDevice.queue.writeBuffer(vertexBuffer, 0, this.mesh, 0, this.mesh.length);

    const vertexBuffers = [
      {
        attributes: [
          {
            shaderLocation: 0, // position
            offset: 0,
            format: "float32x4",
          },
          {
            shaderLocation: 1, // color
            offset: 16,
            format: "float32x4",
          },
        ],
        arrayStride: 32,
        stepMode: "vertex",
      },
    ];

    const pipelineDescriptor: GPURenderPipelineDescriptor = {
      vertex: {
        module: shaderModule,
        entryPoint: "vertex_main",
        // @ts-ignore
        buffers: vertexBuffers,
      },
      fragment: {
        module: shaderModule,
        entryPoint: "fragment_main",
        targets: [
          {
            format: navigator.gpu.getPreferredCanvasFormat(),
          },
        ],
      },
      primitive: {
        topology: "triangle-list",
      },
      layout: "auto",
    };

    this.engine.renderPipeline = this.engine.gpuDevice.createRenderPipeline(pipelineDescriptor);

    this.engine.gpuCommandEncoder = this.engine.gpuDevice.createCommandEncoder();

    this.engine.renderPassDescriptor = {
      colorAttachments: [
        {
          clearValue: {
            r: 0.2,
            g: 0.2,
            b: 0.2,
            a: 1.0,
          },
          loadOp: "clear",
          storeOp: "store",
          view: this.screen.context.getCurrentTexture().createView(),
        },
      ],
    };

    const passEncoder = this.engine.gpuCommandEncoder.beginRenderPass(this.engine.renderPassDescriptor);

    passEncoder.setPipeline(this.engine.renderPipeline);
    passEncoder.setVertexBuffer(0, vertexBuffer);
    passEncoder.draw(this.mesh.length / 8);

    passEncoder.end();

    this.engine.gpuDevice.queue.submit([this.engine.gpuCommandEncoder.finish()]);

    console.log("Rendered:", vertexBuffer, this.mesh);

    console.log(this);
  }

  constructor(screen: Screen, engine: Engine) {
    this.screen = screen;
    this.engine = engine;
    this.rawData = {
      lines: [],
    };
    this.objects = {};
    this.mesh = new Float32Array([]);

    return this;
  }
}
