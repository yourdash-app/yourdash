/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreApi from "backend/src/core/coreApi.js";
import BackendModule, { YourDashModuleArguments } from "backend/src/core/moduleManager/backendModule.js";

export default class DashModule extends BackendModule {
  constructor( args: YourDashModuleArguments ) {
    super( args );

    this.API.request.get( "/app/dash/user-full-name", async ( req, res ) => {
      const { username } = req.headers as {
        username: string
      };

      const user = coreApi.users.get( username )

      res.json( await user.getName() );
    } );

    // TODO: implement module system
    this.API.request.get( "/app/dash/modules", async ( req, res ) => {
      res.json( { success: true } );
    } );
  }
}
