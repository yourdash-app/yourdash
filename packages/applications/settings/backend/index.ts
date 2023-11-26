/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import YourDashPanel from "packages/backend/src/core/helpers/panel.js";
import Module, { YourDashModuleArguments } from "packages/backend/src/core/moduleManager/module.js";
import YourDashUser from "backend/src/core/user/index.js";
import { PersonalServerAcceleratorCommunication } from "backend/src/helpers/personalServerAccelerator.js";
import { promises as fs } from "fs";
import coreApi from "backend/src/core/coreApi.js"
import path from "path"

export default class SettingsModule extends Module {
  constructor( args: YourDashModuleArguments ) {
    super( args );

    this.API.request.post( "/app/settings/core/panel/position", async ( req, res ) => {
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

    this.API.request.post( "/app/settings/core/panel/quick-shortcuts", async ( req, res ) => {
      const { username } = req.headers as {
        username: string
      };
      const { launcher } = req.body;

      const panel = new YourDashPanel( username );

      await panel.setLauncherType( launcher );

      return res.json( { success: true } );
    } );

    this.API.request.get( "/app/settings/debug/psa/update/:sessionId", async ( req, res ) => {
      const { sessionId } = req.params;
      const { username } = req.headers as {
        username: string
      };
      const user = new YourDashUser( username );

      const psa = new PersonalServerAcceleratorCommunication( username, user.getLoginSessionById( parseInt( sessionId, 10 ) ) );

      if ( !psa.socketConnection ) {
        return res.json( { success: false } );
      }

      psa.emit( "/core/update", true );

      return res.json( {
        success: true,
        data: user.getLoginSessionById( parseInt( sessionId, 10 ) )
      } );
    } );

    this.API.request.get( "/app/settings/developer/install_all_applications", async ( req, res ) => {
      const installableApplications = ( await fs.readdir( "../applications" ) ).filter( app => app !== "node_modules" && app !== "package.json" && app !== "package-lock.json" );

      installableApplications.map( async app => {
        if ( coreApi.globalDb.get( "installedApplications" ).includes( app ) )
          return;

        coreApi.globalDb.set( "installedApplications", [ ...coreApi.globalDb.get( "installedApplications" ), app ] );
        await coreApi.moduleManager.loadModule( app, path.join( process.cwd(), `../applications/${app}/backend/` ) );
      } )

      return res.json( { success: true } );
    } )
  }
}
