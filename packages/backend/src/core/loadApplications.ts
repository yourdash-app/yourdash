import path from "path";
import globalDatabase from "../helpers/globalDatabase.js";
import log, { logTypes } from "../helpers/log.js";
import { existsSync as fsExistsSync } from "fs";
import chalk from "chalk";
import { type YourDashApplicationServerPlugin } from "../helpers/applications.js";
import { type Application as ExpressApplication } from "express"
import { type Server as SocketIoServer } from "socket.io"

function checkIfApplicationIsValidToLoad( applicationName: string ): boolean {
  if (
    !fsExistsSync( path.resolve( process.cwd(), `../applications/${ applicationName }/backend` ) )
  ) {
    log(
      logTypes.error,
      `${ chalk.yellow.bold( "CORE" ) }: Unknown application: ${ applicationName }!`
    );
    return false;
  }
  if (
    !fsExistsSync( path.resolve( process.cwd(), `../applications/${ applicationName }/backend/index.js` ) )
  ) {
    console.log( path.resolve( process.cwd(), `../applications/${ applicationName }/backend/index.js` ) );
    
    log(
      logTypes.error,
      `${ chalk.yellow.bold( "CORE" ) }: application ${ applicationName } does not contain an index.ts file!`
    );
    return false;
  }
  if (
    !fsExistsSync( path.resolve( process.cwd(), `../applications/${ applicationName }/application.json` ) )
  ) {
    log(
      logTypes.error,
      `${ chalk.yellow.bold( "CORE" ) }: application ${ applicationName } does not contain an application.json file!`
    );
    return false;
  }
  if (
    !fsExistsSync( path.resolve( process.cwd(), `../applications/${ applicationName }/icon.avif` ) )
  ) {
    log(
      logTypes.error,
      `${ chalk.yellow.bold( "CORE" ) }: application ${ applicationName } does not contain an icon.avif file!`
    );
    return false;
  }

  return true;
}

export function loadApplication( appName: string, app: ExpressApplication, io: SocketIoServer ) {
  if ( !checkIfApplicationIsValidToLoad( appName ) ) {
    return;
  }

  // import and load all applications
  
  import( `applications/${ appName }/backend/index.js` )
    .then( ( mod: { default?: YourDashApplicationServerPlugin } ) => {
      try {
        log( logTypes.info, `${ chalk.yellow.bold( "CORE" ) }: Starting application: ${ appName }` );

        if ( !mod.default ) {
          log(
            logTypes.error,
            `${ chalk.yellow.bold( "CORE" ) }: Unable to load ${ appName }! This application does not contain a default export!`
          );
          return;
        }

        mod.default( {
          exp: app, // express app instance
          io, // socket.io server instance
          pluginFilesystemPath: path.resolve( path.join( process.cwd(), `../applications/${ appName }` ) )
        } );
          
        log( logTypes.success, `${ chalk.yellow.bold( "CORE" ) }: Initialized application: ${ appName }` );
          
        return 1
      } catch ( err ) {
        log( logTypes.error, `${ chalk.yellow.bold( "CORE" ) }: Error during application initialization: ${ appName }` );
          
        return 0
      }
    } ).catch( _err => {
      log( logTypes.error, `${ chalk.yellow.bold( "CORE" ) }: Error while loading application: ${ appName }` );
        
      return 0
    } );
}

export default function loadApplications( exp: ExpressApplication, io: SocketIoServer ) {
  if ( fsExistsSync( path.resolve( process.cwd(), "../applications/" ) ) ) {
    const apps = ( globalDatabase.get( "installedApplications" ) );
    console.log( apps )
    apps.forEach( ( appName: string ) => {
      try {
        loadApplication( appName, exp, io );
      } catch ( e ) {
        console.trace( e )
      }
    } );
  } else {
    log( logTypes.error, `${ chalk.yellow.bold( "CORE" ) }: No applications found!` );
  }
}
