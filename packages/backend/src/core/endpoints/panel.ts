/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Application as ExpressApplication } from "express";
import globalDatabase from "backend/src/helpers/globalDatabase.js";
import YourDashApplication from "backend/src/helpers/applications.js";
import { base64ToDataUrl } from "backend/src/helpers/base64.js";
import sharp from "sharp";
import path from "path";
import { promises as fs } from "fs";
import YourDashPanel from "backend/src/core/panel.js";
import { FS_DIRECTORY_PATH } from "../../main.js";
import authenticatedImage, { authenticatedImageType } from "../authenticatedImage.js";
import IPanelApplicationsLauncherApplication from "shared/core/panel/applicationsLauncher/application.js";

export default function defineCorePanelRoutes( exp: ExpressApplication ) {
  exp.get( "/core/panel/applications", async ( _req, res ) => {
    res.set( "Cache-Control", "no-store" );
    
    Promise.all( ( globalDatabase.get( "installedApplications" ) ).map( async ( app: any ) => {
      const application = await new YourDashApplication( app ).read();
      return new Promise( async resolve => {
        sharp(
          await fs.readFile( path.resolve(
            process.cwd(),
            `../applications/${ app }/icon.avif`
          ) )
        ).resize( 88, 88 ).toBuffer( ( err, buf ) => {
          if ( err ) {
            resolve( { error: true } );
          }
          
          resolve( <IPanelApplicationsLauncherApplication>{
            name: application.getName(),
            displayName: application.getDisplayName(),
            description: application.getDescription(),
            icon: base64ToDataUrl( buf.toString( "base64" ) )
          } );
        } );
      } );
    } ) ).then( resp => res.json( resp ) );
  } );
  
  exp.get( "/core/panel/quick-shortcuts", async ( req, res ) => {
    res.set( "Cache-Control", "no-store" );
    
    const { username } = req.headers as { username: string };
    
    const panel = new YourDashPanel( username );
    
    return res.json( ( await panel.getQuickShortcuts() ).map( shortcut => {
      return {
        name: shortcut,
        icon: authenticatedImage(
          username,
          authenticatedImageType.FILE,
          path.resolve( path.join( process.cwd(), `../applications/${ shortcut }/icon.avif` ) )
        )
      };
    } ) );
  } );
  
  exp.delete( "/core/panel/quick-shortcuts/:ind", async ( req, res ) => {
    res.set( "Cache-Control", "no-store" );
    
    const { ind } = req.params;
    const { username } = req.headers as {
      username: string
    };
    
    const panel = new YourDashPanel( username );
    
    await panel.removeQuickShortcut( parseInt( ind, 10 ) );
    
    return res.json( { success: true } );
  } );
  
  exp.post( "/core/panel/quick-shortcuts/create", async ( req, res ) => {
    res.set( "Cache-Control", "no-store" );
    
    const { username } = req.headers as { username: string };
    const { name } = req.body as { name: string };
    
    const panel = new YourDashPanel( username );
    
    await panel.createQuickShortcut( name );
    
    return res.json( { success: true } );
  } );
  
  exp.get( "/core/panel/position", async ( req, res ) => {
    res.set( "Cache-Control", "no-store" );
    
    const { username } = req.headers as {
      username: string
    };
    
    const panel = new YourDashPanel( username );
    
    return res.json( { position: await panel.getPanelPosition() } );
  } );
  
  exp.get( "/core/panel/launcher-type", async ( req, res ) => {
    res.set( "Cache-Control", "no-store" );
    const { username } = req.headers as { username: string };
    
    const panel = new YourDashPanel( username );
    
    return res.json( { launcher: await panel.getLauncherType() } );
  } );
  
  exp.get( "/core/panel/logo", ( req, res ) => {
    const { username } = req.headers as { username: string };
    
    return res.json( {
      small: authenticatedImage(
        username,
        authenticatedImageType.FILE,
        path.join( FS_DIRECTORY_PATH, "./logo_panel_small.avif" )
      ),
      medium: authenticatedImage(
        username,
        authenticatedImageType.FILE,
        path.join( FS_DIRECTORY_PATH, "./logo_panel_medium.avif" )
      ),
      large: authenticatedImage(
        username,
        authenticatedImageType.FILE,
        path.join( FS_DIRECTORY_PATH, "./logo_panel_large.avif" )
      )
    } );
  } );
}
