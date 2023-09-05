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

// The YourDash project
//  - https://github.com/yourdash-app/yourdash
//  - https://yourdash-app.github.io

import { promises as fs, writeFile, existsSync as fsExistsSync } from "fs";
import path from "path";
import * as http from "http";
import cors from "cors";
import express from "express";
import { Server as SocketIoServer, Socket as SocketIoSocket } from "socket.io";
import chalk from "chalk";
import minimist from "minimist";
import killPort from "kill-port";
import { YourDashSessionType } from "shared/core/session.js";
import log, { logTypes, logHistory } from "./helpers/log.js";
import YourDashUnreadUser, { YourDashUserPermissions } from "./helpers/user.js";
import GLOBAL_DB from "./helpers/globalDatabase.js";
import { __internalGetSessionsDoNotUseOutsideOfCore } from "./core/sessions.js";
import { YourDashServerDiscoveryStatus } from "./core/discovery.js";
import defineCorePanelRoutes from "./core/endpoints/panel.js";
import loadApplications from "./core/loadApplications.js";
import startRequestLogger from "./core/requestLogger.js";
import { startAuthenticatedImageHelper } from "./core/authenticatedImage.js";
import defineLoginEndpoints from "./core/endpoints/login.js";
import defineUserDatabaseRoutes, { userDatabases } from "./core/endpoints/userDatabase.js";
import centerTerminalOutputOnLine from "./helpers/terminal/centerTerminalOutputOnLine.js";
import { generateLogos } from "./helpers/logo.js";

/*
 
 Server Startup steps
 
 1. Fetch process arguments
 2. Load the global database
 3. Init express
 4. Load authentication service
 5. Begin listening for requests
 6. Start startup services
 - request logger
 - authenticated image
 - user sanitization
 - caching service
 7. Load applications
 8. Load post-startup services
 
 */

// -------------------------------
// THIS FILE IS A WORK IN PROGRESS
// -------------------------------

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
      log( logTypes.error, "Unable to create \"./fs/\"" );
      console.trace( e );
    }
    
    // set the instance's default user avatar
    try {
      await fs.cp(
        path.join( process.cwd(), "./src/assets/default_avatar.avif" ),
        path.join( FS_DIRECTORY_PATH, "./default_avatar.avif" )
      );
    } catch ( e ) {
      log( logTypes.error, "Unable to copy the default user avatar" );
      console.trace( e );
    }
    
    // set the instance's default logo
    try {
      await fs.cp(
        path.join( process.cwd(), "./src/assets/default_instance_logo.avif" ),
        path.join( FS_DIRECTORY_PATH, "./instance_logo.avif" )
      );
    } catch ( e ) {
      log( logTypes.error, "Unable to copy the default instance logo" );
      console.trace( e );
    }
    
    // set the default login background
    try {
      await fs.cp(
        path.join( process.cwd(), "./src/assets/default_login_background.avif" ),
        path.join( FS_DIRECTORY_PATH, "./login_background.avif" )
      );
    } catch ( e ) {
      log( logTypes.error, "Unable to create the default login background" );
    }
    
    // create the users' folders
    try {
      await fs.mkdir( path.join( FS_DIRECTORY_PATH, "./users/" ) );
    } catch ( e ) {
      log( logTypes.error, "Unable to create the \"./fs/users/\" directory" );
    }
    
    // create the global database
    try {
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
      log( logTypes.error, "Unable to create the \"./fs/global_database.json\" file" );
    }
    
    // create the default instance logos
    try {
      generateLogos();
    } catch ( e ) {
      log( logTypes.error, "Unable to generate logo assets" );
    }
    
    // if the administrator user doesn't exist,
    // create a new user "admin" with the administrator permission
    const adminUserUnread = new YourDashUnreadUser( "admin" );
    if ( !( await adminUserUnread.exists() ) ) {
      await adminUserUnread.create(
        "password",
        {
          first: "Admin",
          last: "istrator"
        },
        [YourDashUserPermissions.Administrator]
      );
    }
  } catch ( err ) {
    log( logTypes.error, "Uncaught error in fs verification!" );
    console.trace( err );
  }
}

try {
  for ( const user of ( await fs.readdir( path.join( FS_DIRECTORY_PATH, "./users/" ) ) ) ) {
    await ( await new YourDashUnreadUser( user ).read() ).verifyUserConfig().write();
  }
} catch ( err ) {
  log( logTypes.error, "Unable to verify users' settings!" );
  console.trace( err );
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
        logTypes.info,
        centerTerminalOutputOnLine( "server now listening on port 3560!" )
      );
    } );
  } catch ( _err ) {
    log(
      logTypes.error,
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

const activeSockets: {
  [ username: string ]: ISocketActiveSocket[];
} = {};

// save the database before process termination
const handleShutdown = () => {
  log(
    logTypes.info,
    "Shutting down... (restart of core should occur automatically)"
  );
  
  const logOutput = logHistory
    .map( ( hist ) => {
      return `${ hist.type }: ${ hist.message }`;
    } )
    .join( "\n" );
  
  writeFile( path.resolve( process.cwd(), "./fs/log.log" ), logOutput, () => {
    GLOBAL_DB._internalDoNotUseOnlyIntendedForShutdownSequenceWriteToDisk(
      path.resolve( process.cwd(), "./fs/global_database.json" ),
      () => {
        process.kill( process.pid );
      }
    );
  } );
};

process.on( "SIGINT", handleShutdown );

// Handle socket.io connections
socketIo.on( "connection", ( socket: SocketIoSocket<any, any, any, any> ) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  
  // Check that all required parameters are present
  if ( !socket.handshake.query.username || !socket.handshake.query.sessionToken || !socket.handshake.query.sessionId ) {
    log( logTypes.error, "[PSA-BACKEND]: Closing connection! Missing required parameters!" );
    
    socket.disconnect( true );
    return;
  }
  
  if ( !activeSockets[ socket.handshake.query.username as string ] ) {
    activeSockets[ socket.handshake.query.username as string ] = [];
  }
  
  activeSockets[ socket.handshake.query.username as string ].push( <
    ISocketActiveSocket
    >{
      id: socket.handshake.query.sessionId as string,
      token: socket.handshake.query.sessionToken as string,
      socket
    } );
  
  socket.on( "execute-command-response", ( output: any ) => {
    log( logTypes.info, output );
  } );
  
  socket.on( "disconnect", () => {
    activeSockets[ socket.handshake.query.username as string ].forEach( () => {
      activeSockets[ socket.handshake.query.username as string ].filter(
        ( sock ) => sock.id !== socket.id
      );
    } );
    
    log( logTypes.info, "[PSA-BACKEND]: Closing PSA connection" );
  } );
  
  return;
} );

// handle socket.io session authentication
socketIo.use( async ( socket: SocketIoSocket<any, any, any, any>, next ) => {
  const {
    username,
    sessionToken
  } = socket.handshake.query as {
    username?: string;
    sessionToken?: string;
  };
  if ( !username || !sessionToken ) {
    return socket.disconnect();
  }
  if ( !__internalGetSessionsDoNotUseOutsideOfCore()[ username ] ) {
    try {
      const user = await new YourDashUnreadUser( username ).read();
      __internalGetSessionsDoNotUseOutsideOfCore()[ username ] =
        ( await user.getSessions() ) || [];
    } catch ( _err ) {
      return socket.disconnect();
    }
  }
  if (
    __internalGetSessionsDoNotUseOutsideOfCore()[ username ].find(
      ( session ) => session.sessionToken === sessionToken
    )
  ) {
    return next();
  }
  return socket.disconnect();
} );

export { socketIo, activeSockets };

if ( PROCESS_ARGUMENTS[ "log-requests" ] ) {
  startRequestLogger( exp, {
    logOptionsRequests: !!PROCESS_ARGUMENTS[ "log-options-requests" ]
  } );
}

exp.use( cors() );
exp.use( express.json( { limit: "50mb" } ) );
exp.use( ( _req, res, next ) => {
  res.removeHeader( "X-Powered-By" );
  next();
} );

process.stdin.on( "data", ( data ) => {
  const commandAndArgs = data
    .toString()
    .replaceAll( "\n", "" )
    .replaceAll( "\r", "" )
    .split( " " );
  const command = commandAndArgs[ 0 ];
  // const args = commandAndArgs.slice(1);
  
  switch ( command ) {
  case "exit":
    handleShutdown();
    break;
  default:
    log( logTypes.error, `Unknown command: ${ command }` );
  }
} );

exp.get( "/", ( _req, res ) =>
  res.send( "Hello from the yourdash server software" )
);

exp.get( "/test", ( _req, res ) => {
  const discoveryStatus: YourDashServerDiscoveryStatus =
    YourDashServerDiscoveryStatus.NORMAL as YourDashServerDiscoveryStatus;
  
  switch ( discoveryStatus ) {
  case YourDashServerDiscoveryStatus.MAINTENANCE:
    return res.json( {
      status: YourDashServerDiscoveryStatus.MAINTENANCE,
      type: "yourdash"
    } );
  case YourDashServerDiscoveryStatus.NORMAL:
    return res.json( {
      status: YourDashServerDiscoveryStatus.NORMAL,
      type: "yourdash"
    } );
  default:
    log( logTypes.error, "discovery status returned an invalid value" );
    return res.json( {
      status: YourDashServerDiscoveryStatus.MAINTENANCE,
      type: "yourdash"
    } );
  }
} );

startAuthenticatedImageHelper( exp );
defineLoginEndpoints( exp );

// check for authentication
exp.use( async ( req, res, next ) => {
  const {
    username,
    token
  } = req.headers as {
    username?: string;
    token?: string;
  };
  
  if ( !username || !token ) {
    return res.json( { error: "authorization fail" } );
  }
  
  if ( !__internalGetSessionsDoNotUseOutsideOfCore()[ username ] ) {
    try {
      const user = await new YourDashUnreadUser( username ).read();
      
      __internalGetSessionsDoNotUseOutsideOfCore()[ username ] =
        ( await user.getSessions() ) || [];
      
      const database = fs
        .readFile( path.resolve( user.getPath(), "./user_db.json" ) )
        ?.toString();
      
      if ( database ) {
        userDatabases.set( username, JSON.parse( database ) );
      } else {
        userDatabases.set( username, {} );
        fs.writeFile(
          path.resolve( user.getPath(), "./user_db.json" ),
          JSON.stringify( {} )
        );
      }
    } catch ( _err ) {
      return res.json( { error: "authorization fail" } );
    }
  }
  
  if (
    __internalGetSessionsDoNotUseOutsideOfCore()[ username ].find(
      ( session ) => session.sessionToken === token
    )
  ) {
    return next();
  }
  
  return res.json( { error: "authorization fail" } );
} );

/**
 * --------------------------------------------------------------
 * WARNING: all endpoints require authentication after this point
 * --------------------------------------------------------------
 */

await defineCorePanelRoutes( exp );

exp.get( "/core/sessions", async ( req, res ) => {
  const { username } = req.headers as {
    username: string;
  };
  
  const user = await new YourDashUnreadUser( username ).read();
  
  return res.json( { sessions: await user.getSessions() } );
} );

exp.delete( "/core/session/:id", async ( req, res ) => {
  const { username } = req.headers as {
    username: string;
  };
  const { id: sessionId } = req.params;
  
  const user = await new YourDashUnreadUser( username ).read();
  
  user.getSession( parseInt( sessionId, 10 ) ).invalidate();
  
  return res.json( { success: true } );
} );

exp.get( "/core/personal-server-accelerator/sessions", async ( req, res ) => {
  const { username } = req.headers as {
    username: string;
  };
  
  const user = await new YourDashUnreadUser( username ).read();
  
  return res.json( {
    sessions: ( await user.getSessions() ).filter( ( session ) => session.type === YourDashSessionType.desktop )
  } );
} );

exp.get( "/core/personal-server-accelerator/", async ( req, res ) => {
  const { username } = req.headers as {
    username: string;
  };
  
  const unreadUser = new YourDashUnreadUser( username );
  
  try {
    return JSON.parse(
      (
        await fs.readFile(
          path.resolve( unreadUser.getPath(), "personal_server_accelerator.json" )
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
  const { username } = req.headers as {
    username: string;
  };
  const body = req.body;
  
  const user = new YourDashUnreadUser( username );
  
  try {
    await fs.writeFile(
      path.resolve( user.getPath(), "personal_server_accelerator.json" ),
      JSON.stringify( body )
    );
  } catch ( _err ) {
    return res.json( { error: `Unable to write to ${ username }/personal_server_accelerator.json` } );
  }
  
  return res.json( { success: true } );
} );

defineUserDatabaseRoutes( exp );

loadApplications( exp, socketIo );