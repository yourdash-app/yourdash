/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Application as ExpressApplication } from "express";
import globalDatabase from "backend/src/helpers/globalDatabase.js";
import YourDashApplication from "backend/src/helpers/applications.js";
import { base64ToDataUrl } from "backend/src/helpers/base64.js";
import sharp from "sharp";
import path from "path";
import { promises as fs } from "fs";
import YourDashPanel from "backend/src/helpers/panel.js";
import { FS_DIRECTORY_PATH } from "../../main.js";
import authenticatedImage, { AUTHENTICATED_IMAGE_TYPE } from "../authenticatedImage.js";
import IPanelApplicationsLauncherApplication from "shared/core/panel/applicationsLauncher/application.js";

export default async function defineRoute( exp: ExpressApplication ) {
  exp.get( "/core/panel/applications", async ( _req, res ) => {
    res.set( "Cache-Control", "no-store" );
    
    Promise.all( ( globalDatabase.get( "installedApplications" ) ).map( async app => {
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
    
    const { username } = req.headers as {
      username: string
    };
    
    const panel = new YourDashPanel( username );
    
    return res.json( ( await panel.getQuickShortcuts() ).map( shortcut => {
      return {
        name: shortcut,
        icon: authenticatedImage(
          username,
          AUTHENTICATED_IMAGE_TYPE.FILE,
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
    
    const { username } = req.headers as {
      username: string
    };
    const { name } = req.body as {
      name: string;
    };
    
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
    
    const { username } = req.headers as {
      username: string
    };
    
    const panel = new YourDashPanel( username );
    
    return res.json( { launcher: await panel.getLauncherType() } );
  } );
  
  exp.get( "/core/panel/logo", ( req, res ) => {
    const { username } = req.headers as {
      username: string
    };
    
    return res.json( {
      small: authenticatedImage(
        username,
        AUTHENTICATED_IMAGE_TYPE.FILE,
        path.join( FS_DIRECTORY_PATH, "./logo_panel_small.avif" )
      ),
      medium: authenticatedImage(
        username,
        AUTHENTICATED_IMAGE_TYPE.FILE,
        path.join( FS_DIRECTORY_PATH, "./logo_panel_medium.avif" )
      ),
      large: authenticatedImage(
        username,
        AUTHENTICATED_IMAGE_TYPE.FILE,
        path.join( FS_DIRECTORY_PATH, "./logo_panel_large.avif" )
      )
    } );
  } );
}
