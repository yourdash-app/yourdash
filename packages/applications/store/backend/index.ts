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

import { type StorePromotedApplication } from "shared/apps/store/storePromotedApplication.js";
import YourDashApplication, { getAllApplications, type YourDashApplicationServerPlugin } from "backend/src/helpers/applications.js";
import { type IStoreCategory } from "shared/apps/store/storeCategory.js";
import { getInstanceLogoBase64 } from "backend/src/helpers/logo.js";
import getAllCategories, { getAllApplicationsFromCategory } from "./helpers/categories.js";
import GLOBAL_DB from "backend/src/helpers/globalDatabase.js";
import { loadApplication } from "backend/src/core/loadApplications.js";
import path from "path";
import authenticatedImage, { authenticatedImageType } from "backend/src/core/authenticatedImage.js";
import { IYourDashStoreApplication } from "shared/apps/store/storeApplication.js";

const promotedApplications: string[] = ["dash", "store"];

const main: YourDashApplicationServerPlugin = ( {
  exp,
  io
} ) => {
  exp.get( "/app/store/promoted/applications", ( _req, res ) => {
    Promise.all(
      promotedApplications.map( async ( app ): Promise<StorePromotedApplication> => {
        const application = ( await new YourDashApplication( app ).read() );
        return {
          name: application.getName(),
          backgroundImage: `data:image/png;base64,${ ( await application.getStoreBackground() ).toString( "base64" ) }`,
          icon: `data:image/avif;base64,${ ( await application.getIcon() ).toString( "base64" ) }`,
          displayName: application.getDisplayName(),
          installed: application.isInstalled()
        };
      } ) ).then( out => res.json( out ) );
  } );
  
  exp.get( "/app/store/categories", async ( _req, res ) => {
    const applications = await getAllApplications();
    
    const categories: {
      [ key: string ]: boolean
    } = {};
    
    for ( const application of applications ) {
      const unreadApplication = new YourDashApplication( application );
      
      if ( !( await unreadApplication.exists() ) ) {
        continue;
      }
      
      const app = await unreadApplication.read();
      
      categories[app.getCategory()] = true;
    }
    
    return res.json( Object.keys( categories ) );
  } );
  
  exp.get( "/app/store/applications", async ( req, res ) => {
    const { username } = req.headers as {
      username: string
    };
    
    const applications = await getAllApplications();
    
    return res.json(
      await Promise.all(
        applications.map( async applicationName => {
          const unreadApplication = new YourDashApplication( applicationName )
          
          if ( !( await unreadApplication.exists() ) ) {
            return { id: applicationName };
          }
          
          const application = await unreadApplication.read();
          
          return {
            id: applicationName,
            displayName: application.getDisplayName() || applicationName,
            icon: authenticatedImage( username, authenticatedImageType.file, application.getIconPath() ) || authenticatedImage( username, authenticatedImageType.file,  path.join( process.cwd(), "" ) )
          };
        } )
      )
    );
  } );
  
  exp.get( "/app/store/category/:id", async ( req, res ) => {
    const { id } = req.params;
    
    if ( !id ) {
      return res.json( { error: true } );
    }
    
    const categories = await getAllCategories();
    
    if ( !categories.includes( id ) ) {
      return res.json( { error: `unknown category ${ id }` } );
    }
    
    const categoryApplications = await getAllApplicationsFromCategory( id );
    
    const applicationsOutput: {
      name: string,
      icon: string,
      displayName: string
    }[] = [];
    
    await Promise.all( categoryApplications.map( async app => {
      const application = await new YourDashApplication( app ).read();
      applicationsOutput.push( {
        name: application.getName(),
        icon: `data:image/avif;base64,${ ( await application.getIcon() ).toString( "base64" ) }`,
        displayName: application.getDisplayName()
      } );
    } ) );
    
    return res.json( <IStoreCategory>{
      id,
      applications: applicationsOutput,
      icon: `data:image/avif;base64,${ getInstanceLogoBase64() }`,
      displayName: id.slice( 0, 1 ).toUpperCase() + id.slice( 1 ),
      promotedApplications,
      bannerImage: `data:image/avif;base64,${ getInstanceLogoBase64() }`
    } );
  } );
  
  exp.get( "/app/store/application/:id", async ( req, res ) => {
    const { id } = req.params;
    
    if ( !id ) {
      return res.json( { error: true } );
    }
    
    const unreadApplication = new YourDashApplication( id );
    
    if ( !( await unreadApplication.exists() ) ) {
      return res.json( { error: true } );
    }
    
    const application = await unreadApplication.read();
    
    const response: IYourDashStoreApplication = {
      ...application.getRawApplicationData(),
      icon: `data:image/avif;base64,${ ( await application.getIcon() ).toString( "base64" ) }`,
      installed: application.isInstalled()
    };
    
    return res.json( response );
  } );
  
  exp.post( "/app/store/application/install/:id", async ( req, res ) => {
    const { id } = req.params;
    const applicationUnread = new YourDashApplication( id );
    if ( !( await applicationUnread.exists() ) ) {
      return res.json( { error: true } );
    }
    const application = await applicationUnread.read();
    
    GLOBAL_DB.set( "installedApplications", [...GLOBAL_DB.get( "installedApplications" ), id, ...application.getDependencies()] );
    loadApplication( id, exp, io );
    
    return res.json( { success: true } );
  } );
  
  exp.post( "/app/store/application/uninstall/:id", ( req, res ) => {
    const { id } = req.params;
    const application = new YourDashApplication( id );
    if ( !application.exists() ) {
      return res.json( { error: true } );
    }
    GLOBAL_DB.set( "installedApplications", GLOBAL_DB.get( "installedApplications" ).filter( app => app !== id ) );
    return res.json( { success: true } );
  } );
  
  exp.get( "/app/store/application/:id/icon", async ( req, res ) => {
    const { id } = req.params;
    const unreadApplication = new YourDashApplication( id );
    if ( !( await unreadApplication.exists() ) ) {
      return res.sendFile( path.resolve( process.cwd(), "./assets/placeholder_application_icon.png" ) );
    }
    const application = await unreadApplication.read();
    return res.sendFile( application.getIconPath() );
  } );
};

export default main;
