import { Engine } from "./runtime/core";

export default class EngineRuntime {
  engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine

    return this;
  }
}

export enum ENGINE_RUNTIMES {
  THREE,
  OPEN_GFX,
  CANVAS_2D
}