/*
 * Copyright ©2025 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export enum GFXEngineRuntime {
  WGPU,
  Canvas2D,
}

export default function getEngineRuntime(runtime: GFXEngineRuntime) {
  switch (runtime) {
    case GFXEngineRuntime.WGPU:
      return import("./core/index.ts");
    case GFXEngineRuntime.Canvas2D:
      return import("./canvas/index.ts");
  }
}
