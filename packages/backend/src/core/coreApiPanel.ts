/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { promises as fs } from "fs";
import path from "path";
import IPanelApplicationsLauncherApplication from "shared/core/panel/applicationsLauncher/application.js";
import sharp from "sharp";
import YourDashApplication from "../../helpers/applications.js";
import YourDashPanel from "./helpers/panel.js";
import { CoreApi } from "./coreApi.js";
import { authenticatedImageType } from "./coreApiAuthenticatedImage.js";

export default class CoreApiPanel {
  private coreApi: CoreApi

  constructor( coreApi: CoreApi ) {
    this.coreApi = coreApi
  }

  __internal__loadEndpoints() {
    this.coreApi.expressServer.get( "/core/panel/applications", async ( req, res ) => {
      res.set( "Cache-Control", "no-store" );
      const { username } = req.headers as { username: string }

      Promise.all( ( this.coreApi.globalDb.get( "core:installedApplications" ) || [] ).map( async ( app ) => {
        const application = await new YourDashApplication( app ).read();

        return new Promise( async resolve => {
          sharp( await fs.readFile( await application.getIconPath() ) )
            .resize( 128, 128 )
            .toBuffer( ( err, buf ) => {
              if ( err ) {
                resolve( { error: true } );
              }

              resolve( <IPanelApplicationsLauncherApplication>{
                name: application.getName(),
                displayName: application.getDisplayName(),
                description: application.getDescription(),
                // TODO: change from base 64 to file and pre-process defaults instead of at request time
                icon: this.coreApi.authenticatedImage.create( username, authenticatedImageType.BASE64, buf.toString( "base64" ) )
              } );
            } );
        } );
      } ) ).then( resp => res.json( resp ) );
    } );

    this.coreApi.expressServer.get( "/core/panel/quick-shortcuts", async ( req, res ) => {
      res.set( "Cache-Control", "no-store" );

      const { username } = req.headers as { username: string };

      const panel = new YourDashPanel( username );

      return res.json( await Promise.all( ( await panel.getQuickShortcuts() ).map( async shortcut => {
        const application = await new YourDashApplication( shortcut ).read()

        return {
          name: shortcut,
          icon: this.coreApi.authenticatedImage.create(
            username,
            authenticatedImageType.FILE,
            await application.getIconPath()
          )
        };
      } ) ) );
    } );

    this.coreApi.expressServer.delete( "/core/panel/quick-shortcuts/:ind", async ( req, res ) => {
      res.set( "Cache-Control", "" );

      const { ind } = req.params;
      const { username } = req.headers as { username: string };

      const panel = new YourDashPanel( username );
      try {
        await panel.removeQuickShortcut( parseInt( ind, 10 ) );
      } catch ( e ) {
        return res.json( { success: false, error: "Unable to remove shortcut" } );
      }

      return res.json( { success: true } );
    } );

    this.coreApi.expressServer.post( "/core/panel/quick-shortcuts/create", async ( req, res ) => {
      res.set( "Cache-Control", "no-store" );

      const { username } = req.headers as { username: string };
      const { name } = req.body as { name: string };

      const panel = new YourDashPanel( username );

      await panel.createQuickShortcut( name );

      return res.json( { success: true } );
    } );

    this.coreApi.expressServer.get( "/core/panel/position", async ( req, res ) => {
      res.set( "Cache-Control", "no-store" );

      const { username } = req.headers as {
      username: string
    };

      const panel = new YourDashPanel( username );

      return res.json( { position: await panel.getPanelPosition() } );
    } );

    this.coreApi.expressServer.get( "/core/panel/launcher-type", async ( req, res ) => {
      res.set( "Cache-Control", "no-store" );
      const { username } = req.headers as { username: string };

      const panel = new YourDashPanel( username );

      return res.json( { launcher: await panel.getLauncherType() } );
    } );

    this.coreApi.expressServer.get( "/core/panel/logo", ( req, res ) => {
      const { username } = req.headers as { username: string };

      return res.json( {
        small: this.coreApi.authenticatedImage.create(
          username,
          authenticatedImageType.FILE,
          path.join( this.coreApi.fs.ROOT_PATH, "./logo_panel_small.avif" )
        ),
        medium: this.coreApi.authenticatedImage.create(
          username,
          authenticatedImageType.FILE,
          path.join( this.coreApi.fs.ROOT_PATH, "./logo_panel_medium.avif" )
        ),
        large: this.coreApi.authenticatedImage.create(
          username,
          authenticatedImageType.FILE,
          path.join( this.coreApi.fs.ROOT_PATH, "./logo_panel_large.avif" )
        )
      } );
    } );
  }
}
