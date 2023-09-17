/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { type YourDashApplicationServerPlugin } from "backend/src/helpers/applications.js";
import YourDashUser from "backend/src/core/user/index.js";

const main: YourDashApplicationServerPlugin = ( { exp, io } ) => {
  exp.get( "/app/dash/user-full-name", async ( req, res ) => {
    const { username } = req.headers as {
      username: string
    };

    const user = new YourDashUser( username );

    res.json( await user.getName() );
  } );

  // TODO: implement module system
  exp.get( "/app/dash/modules", async ( req, res ) => {
    const { username } = req.headers as {
      username: string
    };

    const user = await new YourDashUser( username );

    res.json( { success: true } );
  } );
};

export default main;
