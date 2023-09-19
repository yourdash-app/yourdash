/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

//  * The YourDash project
//  *  - https://github.com/yourdash-app/yourdash
//  *  - https://yourdash.pages.dev
//  *  - https://ydsh.pages.dev

import chalk from "chalk";
import cors from "cors";
import express from "express";
import { existsSync as fsExistsSync, promises as fs, writeFile } from "fs";
import * as http from "http";
import killPort from "kill-port";
import minimist from "minimist";
import path from "path";
import { YOURDASH_SESSION_TYPE } from "shared/core/session.js";
import { Server as SocketIoServer, Socket as SocketIoSocket } from "socket.io";
import { startAuthenticatedImageHelper } from "./core/authenticatedImage.js";
import { YOURDASH_INSTANCE_DISCOVERY_STATUS } from "./core/discovery.js";
import defineLoginEndpoints from "./core/endpoints/login.js";
import defineCorePanelRoutes from "./core/endpoints/panel.js";
import defineUserEndpoints from "./core/endpoints/user.js";
import defineUserDatabaseRoutes, { saveUserDatabases, USER_DATABASES } from "./core/endpoints/userDatabase.js";
import loadApplications from "./core/loadApplications.js";
import startRequestLogger from "./core/logRequests.js";
import { __internalGetSessionsDoNotUseOutsideOfCore } from "./core/session.js";
import scheduleTask from "./core/taskScheduler.js";
import YourDashUser from "./core/user/index.js";
import { YourDashCoreUserPermissions } from "./core/user/permissions.js";
import GLOBAL_DB from "./helpers/globalDatabase.js";
import log, { LOG_HISTORY, logType } from "./helpers/log.js";
import { generateLogos } from "./helpers/logo.js";
import centerTerminalOutputOnLine from "./helpers/terminal/centerTerminalOutputOnLine.js";
import { startUserDatabaseService } from "./core/user/database.js";

/*
 * --- Server Startup steps ---
 * 1. Fetch process arguments
 * 2. Load the global database
 * 3. Init express
 * 4. Load authentication service
 * 5. Begin listening for requests
 * 6. Start startup services
 *    - request logger
 *    - authenticated image
 *    - user sanitization
 *    - caching service
 * 7. Load applications
 * 8. Load post-startup services
 */

// ! -------------------------------
// ! THIS FILE IS A WORK IN PROGRESS
// ! -------------------------------

const FS_DIRECTORY_PATH = path.resolve( path.join( process.cwd(), "./fs/" ) );
export { FS_DIRECTORY_PATH }

/*
 //////////////////////////////////
 //  1. Fetch process arguments  //
 //////////////////////////////////
*/
const PROCESS_ARGUMENTS = minimist( process.argv.slice( 2 ) );
export { PROCESS_ARGUMENTS };

/*
 ///////////////////////////////////
 //  2. Load the global database  //
 ///////////////////////////////////
*/
if ( fsExistsSync( path.join( FS_DIRECTORY_PATH, "./global_database.json" ) ) ) {
  await GLOBAL_DB.readFromDisk( path.join( FS_DIRECTORY_PATH, "./global_database.json" ) );

  if ( JSON.stringify( GLOBAL_DB.keys ) === JSON.stringify( {} ) ) {
    await fs.rm( path.join( FS_DIRECTORY_PATH, "./global_database.json" ) );
  }
} else {
  log( logType.WARNING, "Unable to load the global database!" );
}

/*
 /////////////////////////////
 //  3. Initialize express  //
 /////////////////////////////
*/
const exp = express();
const httpServer = http.createServer( exp );
const socketIo = new SocketIoServer( httpServer );

/*
 //////////////////////////////////////////////
 //  4. Verify correct filesystem structure  //
 //////////////////////////////////////////////
*/
if ( !fsExistsSync( FS_DIRECTORY_PATH ) ) {
  try {
    // create the fs directory
    try {
      await fs.mkdir( FS_DIRECTORY_PATH );
    } catch ( e ) {
      log( logType.ERROR, "Unable to create \"./fs/\"" );
      console.trace( e );
    }
    
    // set the instance's default user avatar
    try {
      await fs.cp(
        path.join( process.cwd(), "./src/assets/default_avatar.avif" ),
        path.join( FS_DIRECTORY_PATH, "./default_avatar.avif" )
      );
    } catch ( e ) {
      log( logType.ERROR, "Unable to copy the default user avatar" );
      console.trace( e );
    }
    
    // set the instance's default logo
    try {
      await fs.cp(
        path.join( process.cwd(), "./src/assets/default_instance_logo.avif" ),
        path.join( FS_DIRECTORY_PATH, "./instance_logo.avif" )
      );
    } catch ( e ) {
      log( logType.ERROR, "Unable to copy the default instance logo" );
      console.trace( e );
    }
    
    // set the default login background
    try {
      await fs.cp(
        path.join( process.cwd(), "./src/assets/default_login_background.avif" ),
        path.join( FS_DIRECTORY_PATH, "./login_background.avif" )
      );
    } catch ( e ) {
      log( logType.ERROR, "Unable to create the default login background" );
    }
    
    // create the users' folders
    try {
      await fs.mkdir( path.join( FS_DIRECTORY_PATH, "./users/" ) );
    } catch ( e ) {
      log( logType.ERROR, "Unable to create the \"./fs/users/\" directory" );
    }
    
    // create the global database
    try {
      log( logType.INFO, "The global database file does not exist, creating a new one" );
  
      // write the default global database file
      await fs.writeFile( path.join( FS_DIRECTORY_PATH, "./global_database.json" ), JSON.stringify( {
        displayName: "YourDash Instance",
        administratorDetails: {
          name: "[ADMINISTRATOR NAME]",
          contactDetails: {
            phone: false,
            email: "admin@example.com",
            username: "admin"
          }
        },
        installedApplications: ["dash", "settings", "files", "store", "weather"],
        defaults: {
          user: {
            quickShortcuts: ["dash", "settings", "files", "store", "weather"]
          }
        }
      } ) );
  
      // load the new global database
      await GLOBAL_DB.readFromDisk( path.join( FS_DIRECTORY_PATH, "./global_database.json" ) )
    } catch ( e ) {
      log( logType.ERROR, "Unable to create the \"./fs/global_database.json\" file" );
    }
    
    // create the default instance logos
    try {
      generateLogos();
    } catch ( e ) {
      log( logType.ERROR, "Unable to generate logo assets" );
    }
    
    // if the administrator user doesn't exist,
    // create a new user "admin" with the administrator permission
    const adminUser = new YourDashUser( "admin" );
    if ( !await adminUser.doesExist() ) {
      await adminUser.create();
      await adminUser.setName( { first: "Admin", last: "istrator" } )
      await adminUser.setPermissions( [ YourDashCoreUserPermissions.Administrator ] )
    }
  } catch ( err ) {
    log( logType.ERROR, "Uncaught error in fs verification!" );
    console.trace( err );
  }
}

/*
 ///////////////////////////////////////
 //  5. Begin listening for requests  //
 ///////////////////////////////////////
*/
async function listenForRequests() {
  await killPort( 3560 );
  try {
    httpServer.listen( 3560, () => {
      log(
        logType.INFO,
        centerTerminalOutputOnLine( "server now listening on port 3560!" )
      );
    } );
  } catch ( _err ) {
    log(
      logType.ERROR,
      `${ chalk.bold.yellow( "CORE" ) }: Unable to start server!, retrying...`
    );
    
    await listenForRequests();
  }
}

await listenForRequests();

/*
 /////////////////
 //  SOCKET.IO  //            TODO: REFACTOR PENDING
 /////////////////
*/
export interface ISocketActiveSocket {
  id: string;
  token: string;
  socket: SocketIoSocket;
}

const ACTIVE_SOCKET_IO_SOCKETS: {
  [ username: string ]: ISocketActiveSocket[];
} = {};

// save the database before process termination
const CORE_HANDLE_SHUTDOWN = () => {
  log(
    logType.INFO,
    "Shutting down... (restart of core should occur automatically)"
  );
  
  const LOG_OUTPUT = LOG_HISTORY.map( ( hist ) => {
    return `${ hist.type }: ${ hist.message }`;
  } ).join( "\n" );
  
  saveUserDatabases()
  
  writeFile( path.resolve( process.cwd(), "./fs/log.log" ), LOG_OUTPUT, () => {
    GLOBAL_DB._internalDoNotUseOnlyIntendedForShutdownSequenceWriteToDisk(
      path.resolve( process.cwd(), "./fs/global_database.json" ),
      () => {
        process.kill( process.pid );
      }
    );
  } );
};

process.on( "SIGINT", CORE_HANDLE_SHUTDOWN );

// Handle socket.io connections
socketIo.on( "connection", ( socket: SocketIoSocket<any, any, any, any> ) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  
  // Check that all required parameters are present
  if ( !socket.handshake.query.username || !socket.handshake.query.sessionToken || !socket.handshake.query.sessionId ) {
    log( logType.ERROR, "[PSA-BACKEND]: Closing connection! Missing required parameters!" );
    
    socket.disconnect( true );
    return;
  }
  
  if ( !ACTIVE_SOCKET_IO_SOCKETS[ socket.handshake.query.username as string ] ) {
    ACTIVE_SOCKET_IO_SOCKETS[ socket.handshake.query.username as string ] = [];
  }
  
  ACTIVE_SOCKET_IO_SOCKETS[ socket.handshake.query.username as string ].push( <ISocketActiveSocket>{
    id: socket.handshake.query.sessionId as string,
    token: socket.handshake.query.sessionToken as string,
    socket
  } );
  
  socket.on( "execute-command-response", ( output: never ) => {
    log( logType.INFO, output );
  } );
  
  socket.on( "disconnect", () => {
    ACTIVE_SOCKET_IO_SOCKETS[ socket.handshake.query.username as string ].forEach( () => {
      ACTIVE_SOCKET_IO_SOCKETS[ socket.handshake.query.username as string ].filter(
        ( sock ) => sock.id !== socket.id
      );
    } );
    
    log( logType.INFO, "[PSA-BACKEND]: Closing PSA connection" );
  } );
  
  return;
} );

// handle socket.io session authentication
socketIo.use( async ( socket: SocketIoSocket, next ) => {
  const { username, sessionToken } = socket.handshake.query as { username?: string, sessionToken?: string };
  
  if ( !username || !sessionToken )
    return socket.disconnect();
  
  if ( !__internalGetSessionsDoNotUseOutsideOfCore()[ username ] ) {
    try {
      const user = new YourDashUser( username );
      __internalGetSessionsDoNotUseOutsideOfCore()[ username ] = ( await user.getAllLoginSessions() ) || [];
    } catch ( _err ) {
      return socket.disconnect();
    }
  }
  
  if ( __internalGetSessionsDoNotUseOutsideOfCore()[ username ].find( ( session ) => session.sessionToken === sessionToken ) )
    return next();
  
  return socket.disconnect();
} );

export { socketIo, ACTIVE_SOCKET_IO_SOCKETS };

if ( PROCESS_ARGUMENTS[ "log-requests" ] )
  startRequestLogger( exp, { logOptionsRequests: !!PROCESS_ARGUMENTS[ "log-options-requests" ] } );

exp.use( cors() );
exp.use( express.json( { limit: "50mb" } ) );
exp.use( ( _req, res, next ) => {
  res.removeHeader( "X-Powered-By" );
  next();
} );

process.stdin.on( "data", ( data ) => {
  const commandAndArgs = data.toString().replaceAll( "\n", "" ).replaceAll( "\r", "" ).split( " " );
  const command = commandAndArgs[ 0 ];
  
  switch ( command ) {
  case "exit":
    CORE_HANDLE_SHUTDOWN();
    break;
  default:
    log( logType.ERROR, `Unknown command: ${ command }` );
  }
} );

exp.get( "/", ( _req, res ) =>
  res.send( "Hello from the yourdash server software" )
);

// Server discovery endpoint
exp.get( "/test", ( _req, res ) => {
  const discoveryStatus: YOURDASH_INSTANCE_DISCOVERY_STATUS = YOURDASH_INSTANCE_DISCOVERY_STATUS.NORMAL as YOURDASH_INSTANCE_DISCOVERY_STATUS;
  
  switch ( discoveryStatus ) {
  case YOURDASH_INSTANCE_DISCOVERY_STATUS.MAINTENANCE:
    return res.status( 200 ).json( { status: YOURDASH_INSTANCE_DISCOVERY_STATUS.MAINTENANCE, type: "yourdash" } );
  case YOURDASH_INSTANCE_DISCOVERY_STATUS.NORMAL:
    return res.status( 200 ).json( { status: YOURDASH_INSTANCE_DISCOVERY_STATUS.NORMAL, type: "yourdash" } );
  default:
    log( logType.ERROR, "Discovery status returned an invalid value" );
    return res.status( 200 ).json( { status: YOURDASH_INSTANCE_DISCOVERY_STATUS.MAINTENANCE, type: "yourdash" } );
  }
} );

startAuthenticatedImageHelper( exp );
defineLoginEndpoints( exp );

// check for authentication
exp.use( async ( req, res, next ) => {
  const { username, token } = req.headers as { username?: string, token?: string };
  
  if ( !username || !token ) {
    return res.json( { error: "authorization fail" } );
  }
  
  if ( !__internalGetSessionsDoNotUseOutsideOfCore()[ username ] ) {
    try {
      const user = new YourDashUser( username );
      
      __internalGetSessionsDoNotUseOutsideOfCore()[ username ] =
        ( await user.getAllLoginSessions() ) || [];
      
      const database = ( await fs.readFile( path.join( user.path, "core/user_db.json" ) ) ).toString();
      
      if ( database ) {
        USER_DATABASES.set( username, JSON.parse( database ) );
      } else {
        USER_DATABASES.set( username, {} );
        await fs.writeFile(
          path.join( user.path, "core/user_db.json" ),
          JSON.stringify( {} )
        );
      }
    } catch ( _err ) {
      return res.json( { error: "authorization fail" } );
    }
  }
  
  if ( __internalGetSessionsDoNotUseOutsideOfCore()[ username ].find( ( session ) => session.sessionToken === token ) ) {
    return next();
  }
  
  return res.json( { error: "authorization fail" } );
} );

/*
 * --------------------------------------------------------------
 * WARNING: all endpoints require authentication after this point
 * --------------------------------------------------------------
 */

exp.get( "/core/sessions", async ( req, res ) => {
  const { username } = req.headers as { username: string };
  
  const user = new YourDashUser( username );
  
  return res.json( { sessions: await user.getAllLoginSessions() } );
} );

exp.delete( "/core/session/:id", async ( req, res ) => {
  const { username } = req.headers as { username: string };
  const { id: sessionId } = req.params;
  
  const user = new YourDashUser( username );
  
  user.getLoginSession( parseInt( sessionId, 10 ) ).invalidate();
  
  return res.json( { success: true } );
} );

exp.get( "/core/personal-server-accelerator/sessions", async ( req, res ) => {
  const { username } = req.headers as { username: string };
  
  const user = new YourDashUser( username );
  
  return res.json( {
    sessions: ( await user.getAllLoginSessions() ).filter( ( session ) => session.type === YOURDASH_SESSION_TYPE.desktop )
  } );
} );

exp.get( "/core/personal-server-accelerator/", async ( req, res ) => {
  const { username } = req.headers as { username: string };
  
  const user = new YourDashUser( username );
  
  try {
    return JSON.parse(
      (
        await fs.readFile(
          path.join( user.path, "personal_server_accelerator.json" )
        )
      ).toString()
    );
  } catch ( _err ) {
    return res.json( {
      error: `Unable to read ${ username }/personal_server_accelerator.json`
    } );
  }
} );

exp.post( "/core/personal-server-accelerator/", async ( req, res ) => {
  const { username } = req.headers as { username: string };
  const body = req.body;
  
  const user = new YourDashUser( username );
  
  try {
    await fs.writeFile(
      path.join( user.path, "personal_server_accelerator.json" ),
      JSON.stringify( body )
    );
  } catch ( _err ) {
    return res.json( { error: `Unable to write to ${ username }/personal_server_accelerator.json` } );
  }
  
  return res.json( { success: true } );
} );

// define all core endpoints
defineUserDatabaseRoutes( exp );
defineCorePanelRoutes( exp )
defineUserEndpoints( exp )

// start core services
startUserDatabaseService()

loadApplications( exp, socketIo );