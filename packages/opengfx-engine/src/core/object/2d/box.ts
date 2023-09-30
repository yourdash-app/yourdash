/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { GFX_RENDER_PIPELINE } from "../../render/pipelines/index.ts";
import GFXObject from "../object.ts";
import Screen from "../../screen.ts"

export default class GFXBox extends GFXObject {
  public render( screen: Screen<GFX_RENDER_PIPELINE.TwoDimensional> ): this {
    const ctx = screen.context
    
    ctx.fillStyle = "#fff"
    ctx.fillRect( this.position.x + 0,this.position.y + 0, 50, 50 )
    
    return this;
  }
}
