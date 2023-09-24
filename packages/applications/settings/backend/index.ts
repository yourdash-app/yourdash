/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import YourDashPanel from "backend/src/core/panel.js";
import { type YourDashApplicationServerPlugin } from "backend/src/helpers/applications.js";
import YourDashUser from "backend/src/core/user/index.js";
import { PersonalServerAcceleratorCommunication } from "backend/src/helpers/personalServerAccelerator.js";
import { promises as fs } from "fs";
import globalDatabase from "backend/src/helpers/globalDatabase.js";
import { loadApplication } from "backend/src/core/applicationLoader.js";

const main: YourDashApplicationServerPlugin = ( {
  exp,
  io
} ) => {
  exp.post( "/app/settings/core/panel/position", async ( req, res ) => {
    const { username } = req.headers as {
      username: string
    };
    const { position } = req.body;
    
    const panel = new YourDashPanel( username );
    
    await panel.setPanelPosition( position );
    
    return res.json( {
      success: true
    } );
  } );
  
  exp.post( "/app/settings/core/panel/quick-shortcuts", ( req, res ) => {
    const { username } = req.headers as {
      username: string
    };
    const { launcher } = req.body;
    
    const panel = new YourDashPanel( username );
    
    panel.setLauncherType( launcher );
    
    return res.json( { success: true } );
  } );
  
  exp.get( "/app/settings/debug/psa/update/:sessionId", async ( req, res ) => {
    const { sessionId } = req.params;
    const { username } = req.headers as {
      username: string
    };
    const user = new YourDashUser( username );
    
    const psa = new PersonalServerAcceleratorCommunication( username, user.getLoginSession( parseInt( sessionId, 10 ) ) );
    
    if ( !psa.socketConnection ) {
      return res.json( { success: false } );
    }
    
    psa.emit( "/core/update", true );
    
    return res.json( {
      success: true,
      data: user.getLoginSession( parseInt( sessionId, 10 ) )
    } );
  } );
  
  exp.get( "/app/settings/admin/dev/install_all_applications", async ( req, res ) => {
    const installableApplications = ( await fs.readdir( "../applications" ) ).filter( app => app !== "node_modules" && app !== "package.json" && app !== "package-lock.json" );
    
    installableApplications.map( app => {
      if ( globalDatabase.get( "installedApplications" ).includes( app ) )
        return;
      
      globalDatabase.set( "installedApplications", [ ...globalDatabase.get( "installedApplications" ), app] );
      loadApplication( app, exp, io );
    } )
    
    return res.json( { success: true } );
  } )
};

export default main;
