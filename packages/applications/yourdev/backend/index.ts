/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import BackendModule, { YourDashModuleArguments } from "backend/src/core/moduleManager/backendModule.js";

export default class YourDevModule extends BackendModule {
  constructor( args: YourDashModuleArguments ) {
    super( args );

    this.API.request.get( "/app/yourdev/", ( req, res ) => {
      return res.json( { success: true } )
    } )
  }
}
