/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Module, { YourDashModuleArguments } from "packages/backend/src/core/moduleManager/module.js";

export default class DiffusionLabModule extends Module {
  constructor( args: YourDashModuleArguments ) {
    super( args );
    this.API.request.get( "/app/diffusion_lab/models", async ( req, res ) => res.json( { models: ["everything v5", "stable diffusion 2.1", "blueberry mix"] } )
    )
  }
}
