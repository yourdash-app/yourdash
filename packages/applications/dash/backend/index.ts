/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import YourDashUser from "backend/src/core/user/index.js";
import YourDashModule, { YourDashModuleArguments } from "backend/src/core/yourDashModule.js";

export default class DashModule extends YourDashModule {
  constructor( args: YourDashModuleArguments ) {
    super( args );
  
    this.API().request.get( "/app/dash/user-full-name", async ( req, res ) => {
      const { username } = req.headers as {
      username: string
    };

      const user = new YourDashUser( username );

      res.json( await user.getName() );
    } );

    // TODO: implement module system
    this.API().request.get( "/app/dash/modules", async ( req, res ) => {
      const { username } = req.headers as {
      username: string
    };

      const user = new YourDashUser( username );

      res.json( { success: true } );
    } );
  }
}
