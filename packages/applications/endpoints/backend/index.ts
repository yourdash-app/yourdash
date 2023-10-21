/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import YourDashModule, { YourDashModuleArguments } from "backend/src/core/yourDashModule.js";

export default class EndpointsModule extends YourDashModule {
  constructor( args: YourDashModuleArguments ) {
    super( args );
    this.API().request.get( "/app/endpoints/endpoints", ( req, res ) => res.json( this.API().request._router.stack ) )
  }
}
