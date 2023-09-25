/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import YourDashUser from "backend/src/core/user/index.js";
import YourDashModule from "backend/src/core/yourDashModule.js";
export default class DashModule extends YourDashModule {
  constructor( args ) {
    super( args );
    this.API().request.get( "/app/dash/user-full-name", async ( req, res ) => {
      const { username } = req.headers;
      const user = new YourDashUser( username );
      res.json( await user.getName() );
    } );
    this.API().request.get( "/app/dash/modules", async ( req, res ) => {
      const { username } = req.headers;
      const user = new YourDashUser( username );
      res.json( { success: true } );
    } );
  }
}
// # sourceMappingURL=index.js.map
