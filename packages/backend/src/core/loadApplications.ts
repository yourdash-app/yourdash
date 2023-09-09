import path from "path";
import globalDatabase from "../helpers/globalDatabase.js";
import log, { LOG_TYPES } from "../helpers/log.js";
import { existsSync as fsExistsSync } from "fs";
import chalk from "chalk";
import { type YourDashApplicationServerPlugin } from "../helpers/applications.js";
import { type Application as ExpressApplication } from "express";
import { type Server as SocketIoServer } from "socket.io";

function checkIfApplicationIsValidToLoad( applicationName: string ): boolean {
  if (
    !fsExistsSync( path.resolve( process.cwd(), `../applications/${ applicationName }/backend` ) )
  ) {
    log(
      LOG_TYPES.ERROR,
      `${ chalk.yellow.bold( "CORE" ) }: Unknown application: ${ applicationName }!`
    );
    return false;
  }
  if (
    !fsExistsSync( path.resolve( process.cwd(), `../applications/${ applicationName }/backend/index.js` ) )
  ) {
    console.log( path.resolve( process.cwd(), `../applications/${ applicationName }/backend/index.js` ) );
    
    log(
      LOG_TYPES.ERROR,
      `${ chalk.yellow.bold( "CORE" ) }: application ${ applicationName } does not contain an index.ts file!`
    );
    return false;
  }
  if (
    !fsExistsSync( path.resolve( process.cwd(), `../applications/${ applicationName }/application.json` ) )
  ) {
    log(
      LOG_TYPES.ERROR,
      `${ chalk.yellow.bold( "CORE" ) }: application ${ applicationName } does not contain an application.json file!`
    );
    return false;
  }
  if (
    !fsExistsSync( path.resolve( process.cwd(), `../applications/${ applicationName }/icon.avif` ) )
  ) {
    log(
      LOG_TYPES.ERROR,
      `${ chalk.yellow.bold( "CORE" ) }: application ${ applicationName } does not contain an icon.avif file!`
    );
    return false;
  }

  return true;
}

export function loadApplication( appName: string, app: ExpressApplication, io: SocketIoServer ) {
  if ( !checkIfApplicationIsValidToLoad( appName ) ) {
    log( LOG_TYPES.ERROR, `${ chalk.yellow.bold( "CORE" ) }: Unable to load newly installed application: ${ appName }!` );
    return;
  }

  // import and load all applications
  
  import( `applications/${ appName }/backend/index.js` )
    .then( ( mod: { default?: YourDashApplicationServerPlugin } ) => {
      try {
        log( LOG_TYPES.INFO, `${ chalk.yellow.bold( "CORE" ) }: Starting application: ${ appName }` );

        if ( !mod.default ) {
          log(
            LOG_TYPES.ERROR,
            `${ chalk.yellow.bold( "CORE" ) }: Unable to load ${ appName }! This application does not contain a default export!`
          );
          return;
        }

        mod.default( {
          exp: app, // express app instance
          io, // socket.io server instance
          pluginFilesystemPath: path.resolve( path.join( process.cwd(), `../applications/${ appName }` ) )
        } );
        
        log( LOG_TYPES.SUCCESS, `${ chalk.yellow.bold( "CORE" ) }: Initialized application: ${ appName }` );
        
        return 1
      } catch ( err ) {
        log( LOG_TYPES.ERROR, `${ chalk.yellow.bold( "CORE" ) }: Error during application initialization: ${ appName }` );
        
        return 0
      }
    } ).catch( _err => {
      log( LOG_TYPES.ERROR, `${ chalk.yellow.bold( "CORE" ) }: Error while loading application: ${ appName }` );
      
      return 0
    } );
}

export default function loadApplications( exp: ExpressApplication, io: SocketIoServer ) {
  if ( fsExistsSync( path.resolve( process.cwd(), "../applications/" ) ) ) {
    const apps = globalDatabase.get( "installedApplications" ) || [];
    if ( apps?.length === 0 ) {
      log( LOG_TYPES.WARNING, "No applications were loaded" )
    } else {
      log( LOG_TYPES.INFO, `Loading applications ${apps}` );
    }
    apps.forEach( ( appName: string ) => {
      try {
        loadApplication( appName, exp, io );
      } catch ( e ) {
        log( LOG_TYPES.ERROR, `unable to load application: ${appName}` )
        console.trace( e )
      }
    } );
  } else {
    log( LOG_TYPES.ERROR, `${ chalk.yellow.bold( "CORE" ) }: No applications found!` );
  }
}
