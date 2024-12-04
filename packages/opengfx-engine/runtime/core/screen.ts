/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Engine } from "./index.ts";

export default class Screen {
  width = 400;
  height = 200;
  aspectRatio = 2;
  private screenContainer: HTMLElement;
  private screenElement: HTMLCanvasElement;
  private engine: Engine;
  context: GPUCanvasContext;

  constructor(screenContainer: HTMLElement, screenElement: HTMLCanvasElement, engine: Engine) {
    this.screenContainer = screenContainer;
    this.screenElement = screenElement;
    this.engine = engine;

    this.screenElement.width = this.width;
    this.screenElement.height = this.height;

    // @ts-ignore
    this.context = this.screenElement.getContext("webgpu");

    this.context.configure({
      device: this.engine.gpuDevice,
      format: navigator.gpu.getPreferredCanvasFormat(),
      alphaMode: "premultiplied",
    });

    // @ts-ignore
    let timeout: NodeJS.Timeout;

    // on resize, with a debounce delay of 100ms, update the screen
    window.addEventListener("resize", () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(this.update.bind(this), 100);
    });
  }

  update() {
    this.width = this.screenContainer.offsetWidth;
    this.height = this.screenContainer.offsetHeight;
    this.aspectRatio = this.width / this.height;

    console.debug(`GFX screen updated X:${this.width} Y:${this.height}`);

    this.screenElement.width = this.width;
    this.screenElement.height = this.height;

    this.engine.currentScene.render();
  }
}
