/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import EngineRuntime, { ENGINE_RUNTIMES } from "../../engineRuntime.ts";
import Scene from "./scene/scene.ts";
import Screen from "./screen";

// TODO: move all rendering code to it's runtime directory to allow for multiple
//       rendering methods ( e.g: three.js, OpenGFX (WebGPU impl ( default )), Canvas2D, OpenGL )

export class Engine {
  private readonly canvasElement: HTMLCanvasElement;
  private readonly containerElement: HTMLDivElement;
  screen: Screen;
  currentScene: Scene;
  runtime: EngineRuntime;

  constructor(engineRuntime: ENGINE_RUNTIMES, containerElement: HTMLElement) {
    console.debug("OpenGFX engine starting up");
    console.time("OpenGFX_engine_startup");
    // @ts-ignore
    this.runtime = import.meta.glob("../runtime/**/index.ts")[engineRuntime];
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
    console.timeEnd("OpenGFX_engine_startup");
  }

  setScene(scene: Scene): this {
    this.currentScene = scene;
    this.currentScene.render();

    return this;
  }

  render(): this {
    // Clear screen

    console.debug("rendering scene");
    this.currentScene.render();

    return this;
  }
}

export default async function initEngine(containerElement: HTMLElement) {
  // @ts-ignore
  const webGPUAdapter = await navigator.gpu.requestAdapter({ powerPreference: "high-performance" });

  if (!webGPUAdapter) {
    throw new Error("No GPU adapter found");
  }

  const webGpuDevice = await webGPUAdapter.requestDevice();

  return new Engine(webGpuDevice, containerElement);
}
