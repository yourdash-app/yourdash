/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import YourDashUnreadUser from "backend/src/core/user/user.js";
import { YourDashCoreUserPermissions } from "backend/src/core/user/permissions.js";
import { type YourDashApplicationServerPlugin } from "backend/src/helpers/applications.js";
import globalDatabase from "backend/src/helpers/globalDatabase.js";
import path from "path";

const main: YourDashApplicationServerPlugin = ( { exp } ) => {
  exp.get( "/app/global_db/db", async ( req, res ) => {
    const { username } = req.headers as {
      username: string
    };
    
    const user = await new YourDashUnreadUser( username ).read();
    
    if ( user.hasPermission( YourDashCoreUserPermissions.Administrator ) ) {
      return res.json( {
        db: globalDatabase.keys
      } );
    }
    
    return res.json( {
      error: true
    } );
  } );
  
  exp.post( "/app/global_db/db", async ( req, res ) => {
    const { username } = req.headers as {
      username: string
    };
    
    const keys = req.body;
    
    const user = await new YourDashUnreadUser( username ).read();
    
    if ( user.hasPermission( YourDashCoreUserPermissions.Administrator ) ) {
      globalDatabase.merge( keys );
      
      return res.json( {
        success: true
      } );
    }
    
    return res.json( { error: true } );
  } );
  
  exp.post( "/app/global_db/db/force-write", async ( req, res ) => {
    const { username } = req.headers as {
      username: string
    };
    
    const keys = req.body;
    
    const user = await new YourDashUnreadUser( username ).read();
    
    if ( user.hasPermission( YourDashCoreUserPermissions.Administrator ) ) {
      globalDatabase.merge( keys );
      await globalDatabase.writeToDisk( path.resolve( process.cwd(), "./fs/globalDatabase.json" ) );
      
      return res.json( {
        success: true
      } );
    }
    
    return res.json( { error: true } );
  } );
};

export default main;
