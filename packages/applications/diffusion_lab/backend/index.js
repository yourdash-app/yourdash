/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import YourDashModule from "backend/src/core/yourDashModule.js";
export default class DiffusionLabModule extends YourDashModule {
  constructor( args ) {
    super( args );
    this.API().request.get( "/app/diffusion_lab/models", async ( req, res ) => res.json( { models: ["everything v5", "stable diffusion 2.1", "blueberry mix"] } ) );
  }
}
// # sourceMappingURL=index.js.map
