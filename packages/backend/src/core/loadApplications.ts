/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import path from "path";
import globalDatabase from "../helpers/globalDatabase.js";
import log, { logType } from "../helpers/log.js";
import { existsSync as fsExistsSync } from "fs";
import chalk from "chalk";
import { type YourDashApplicationServerPlugin } from "../helpers/applications.js";
import { type Application as ExpressApplication } from "express";
import { type Server as SocketIoServer } from "socket.io";

function checkIfApplicationIsValidToLoad( applicationName: string ): boolean {
  if ( !fsExistsSync( path.resolve( process.cwd(), `../applications/${ applicationName }/backend` ) ) ) {
    log( logType.ERROR,`${ chalk.yellow.bold( "CORE" ) }: Unknown application: ${ applicationName }!` );
    return false;
  }
  
  if ( !fsExistsSync( path.resolve( process.cwd(), `../applications/${ applicationName }/backend/index.js` ) ) ) {
    log( logType.ERROR,`${ chalk.yellow.bold( "CORE" ) }: application ${ applicationName } does not contain an index.ts file!` );
    return false;
  }
  
  if ( !fsExistsSync( path.resolve( process.cwd(), `../applications/${ applicationName }/application.json` ) ) ) {
    log( logType.ERROR,`${ chalk.yellow.bold( "CORE" ) }: application ${ applicationName } does not contain an application.json file!` );
    return false;
  }
  
  if ( !fsExistsSync( path.resolve( process.cwd(), `../applications/${ applicationName }/icon.avif` ) ) ) {
    log( logType.ERROR,`${ chalk.yellow.bold( "CORE" ) }: application ${ applicationName } does not contain an icon.avif file!` );
    return false;
  }

  return true;
}

export function loadApplication( appName: string, exp: ExpressApplication, io: SocketIoServer ) {
  // check if the application contains a valid backend plugin
  if ( !checkIfApplicationIsValidToLoad( appName ) ) {
    // some applications don't have a backend plugin to load
    // in this case we return as this is not required
    return;
  }

  // import and load all applications
  import( `applications/${ appName }/backend/index.js` )
    .then( ( mod: { default?: YourDashApplicationServerPlugin } ) => {
      try {
        log( logType.INFO, `${ chalk.yellow.bold( "CORE" ) }: Starting application: ${ appName }` );

        if ( !mod.default ) {
          log(
            logType.ERROR,
            `${ chalk.yellow.bold( "CORE" ) }: Unable to load ${ appName }! This application does not contain a default export!`
          );
          return;
        }

        mod.default( {
          exp: exp, // express exp instance
          io, // socket.io server instance
          pluginFilesystemPath: path.resolve( path.join( process.cwd(), `../applications/${ appName }` ) )
        } );
        
        log( logType.SUCCESS, `${ chalk.yellow.bold( "CORE" ) }: Initialized application: ${ appName }` );
        
        return 1
      } catch ( err ) {
        log( logType.ERROR, `${ chalk.yellow.bold( "CORE" ) }: Error during application initialization: ${ appName }` );
        
        return 0
      }
    } ).catch( () => {
      log( logType.ERROR, `${ chalk.yellow.bold( "CORE" ) }: Error while loading application: ${ appName }` );
      
      return 0
    } );
}

export default function loadApplications( exp: ExpressApplication, io: SocketIoServer ) {
  if ( fsExistsSync( path.resolve( process.cwd(), "../applications/" ) ) ) {
    const apps = globalDatabase.get( "installedApplications" ) || [];
    if ( apps?.length === 0 ) {
      log( logType.WARNING, "No applications were loaded" )
    } else {
      log( logType.INFO, `Loading applications ${apps}` );
    }
    apps.forEach( ( appName: string ) => {
      try {
        loadApplication( appName, exp, io );
      } catch ( e ) {
        log( logType.ERROR, `Unable to load application: ${appName}` )
        console.trace( e )
      }
    } );
  } else {
    log( logType.ERROR, `${ chalk.yellow.bold( "CORE" ) }: No applications found!` );
  }
}
