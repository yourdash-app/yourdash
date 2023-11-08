/*
* Copyright ©2023 @Ewsgit and YourDash contributors.
* YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
*/

/*
* # The YourDash project
*  - https://github.com/yourdash-app/yourdash
*  - https://yourdash.pages.dev
*  - https://ydsh.pages.dev
*
* # ----- Server Startup steps -----
* 1. Fetch process arguments
* 2. Load the global database
* 3. Init express
* 4. Load authentication service
* 5. Start core services
* 6. Begin listening for requests
* 7. Start startup services
*    - request logger
*    - authenticated image
*    - user sanitization
*    - caching service
* 8. Load applications
* 9. Load post-startup services
*/

import sourceMapSupport from "source-map-support";
import coreApi from "./core/core/coreApi.js";

sourceMapSupport.install();

// Start the YourDash Instance
await coreApi.__internal__startInstance()

/*
/!*
 ///////////////////////////////////////
 //  6. Begin listening for requests  //
 ///////////////////////////////////////
*!/
async function listenForRequests() {
  try {
    try {
      await killPort( 3563 );
      log( logType.INFO, "core", "Killed port 3563" );
    } catch ( e ) {
      // ignore errors
    }
    
    httpServer.listen( 3563, () => {
      log( logType.INFO, "core", "server now listening on port 3563!" );
    } );
  } catch ( reason ) {
    log( logType.INFO, "Unable to kill port 3563", reason );
    
    try {
      httpServer.listen( 3563, () => {
        log( logType.INFO, "core", "server now listening on port 3563!" );
      } );
    } catch ( _err ) {
      log( logType.ERROR, "core", "Unable to start server!" );
      shutdownInstanceGracefully();
    }
  }
}

await listenForRequests();

/!*
 /////////////////
 //  SOCKET.IO  //            TODO: REFACTOR PENDING
 /////////////////
*!/
export interface ISocketActiveSocket {
  id: string;
  token: string;
  socket: SocketIoSocket;
}

const ACTIVE_SOCKET_IO_SOCKETS: {                                 TODO: REFACTOR PENDING, CoreApiWebsocketManager
  [ username: string ]: ISocketActiveSocket[];
} = {};

// Handle socket.io connections

export { socketIo, ACTIVE_SOCKET_IO_SOCKETS };

if ( PROCESS_ARGUMENTS[ "log-requests" ] ) {
  startRequestLogger( exp, { logOptionsRequests: !!PROCESS_ARGUMENTS[ "log-options-requests" ] } );
}

exp.use( cors() );
exp.use( express.json( { limit: "50mb" } ) );
exp.use( expressCompression() );
exp.use( ( _req, res, next ) => {
  res.removeHeader( "X-Powered-By" );
  next();
} );

process.stdin.on( "data", ( data ) => {
  const commandAndArgs = data.toString().replaceAll( "\n", "" ).replaceAll( "\r", "" ).split( " " );
  const command = commandAndArgs[ 0 ];
  
  switch ( command ) {
  case "exit":
    shutdownInstanceGracefully();
    break;
  case "gdb":
    const subCommand = commandAndArgs[ 1 ];
    const key = commandAndArgs[ 2 ];
    const value = commandAndArgs[ 3 ];
    
    switch ( subCommand ) {
    case "set":
      globalDatabase.set( key, value );
      log( logType.INFO, "core:command", `set "${ key }" to "${ value }"` );
      break;
    case "get":
      log( logType.INFO, "core:command", globalDatabase.get( key ) );
      break;
    case "delete":
      globalDatabase.removeValue( key );
      log( logType.INFO, "core:command", `deleted "${ key }"` );
      break;
    default:
      log( logType.INFO, "core:command", "gdb ( Global Database )\n- get: \"gdb get {key}\"\n- set: \"gdb set {key} {value}\"\n- delete: \"gdb delete {key}\"" );
    }
    break;
  default:
    log( logType.ERROR, "core:command", `Unknown command: ${ command }` );
  }
} );

exp.get( "/", ( _req, res ) => {
  // INFO: This should not be used for detection of a YourDash Instance, instead use the '/test' endpoint
  return res.send( "Hello from the YourDash instance software! 👋" );
} );

// Server discovery endpoint
exp.get( "/test", ( _req, res ) => {
  const discoveryStatus: YOURDASH_INSTANCE_DISCOVERY_STATUS = YOURDASH_INSTANCE_DISCOVERY_STATUS.NORMAL as YOURDASH_INSTANCE_DISCOVERY_STATUS;
  
  switch ( discoveryStatus ) {
  case YOURDASH_INSTANCE_DISCOVERY_STATUS.MAINTENANCE:
    return res.status( 200 ).json( {
      status: YOURDASH_INSTANCE_DISCOVERY_STATUS.MAINTENANCE,
      type: "yourdash"
    } );
  case YOURDASH_INSTANCE_DISCOVERY_STATUS.NORMAL:
    return res.status( 200 ).json( {
      status: YOURDASH_INSTANCE_DISCOVERY_STATUS.NORMAL,
      type: "yourdash"
    } );
  default:
    log( logType.ERROR, "Discovery status returned an invalid value" );
    return res.status( 200 ).json( {
      status: YOURDASH_INSTANCE_DISCOVERY_STATUS.MAINTENANCE,
      type: "yourdash"
    } );
  }
} );

exp.get( "/ping", ( _req, res ) => {
  // INFO: This should not be used for detection of a YourDash Instance, instead use the '/test' endpoint
  return res.send( "pong" );
} );

// Load all endpoints which require no authentication
startAuthenticatedImageHelper( exp );
defineLoginEndpoints( exp );

exp.get( "/core/test/self-ping", ( _req, res ) => {
  return res.json( { success: true } );
} );

// on startup, we ping ourselves to check if the webserver is running and accepting requests
fetch( "http://localhost:3563/core/test/self-ping" )
  .then( res => res.json() )
  .then( ( data: { success?: boolean } ) => {
    if ( data?.success ) {
      return log( logType.SUCCESS, "core", "self ping successful - The server is receiving requests" );
    }
    log( logType.ERROR, "core", "CRITICAL ERROR!, unable to ping self" );
  } )
  .catch( () => {
    // TODO: on failure we should alert the administrator, currently we only print to the log as PushNotification support has not yet been implemented
    log( logType.ERROR, "core", "CRITICAL ERROR!, unable to ping self" );
  } );

// check for authentication
exp.use( async ( req, res, next ) => {
  const {
    username,
    token
  } = req.headers as { username?: string, token?: string };
  
  if ( !username || !token ) {
    return res.json( { error: "authorization fail" } );
  }
  
  if ( !__internalGetSessionsDoNotUseOutsideOfCore()[ username ] ) {
    try {
      const user = new YourDashUser( username );
      
      __internalGetSessionsDoNotUseOutsideOfCore()[ username ] = ( await user.getAllLoginSessions() ) || [];
      
      const database = ( await fs.readFile( path.join( user.path, "core/user_db.json" ) ) ).toString();
      
      if ( database ) {
        USER_DATABASES.set( username, JSON.parse( database ) );
      } else {
        USER_DATABASES.set( username, {} );
        await fs.writeFile( path.join( user.path, "core/user_db.json" ), JSON.stringify( {} ) );
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


/!*
 * --------------------------------------------------------------
 * WARNING: all endpoints require authentication after this point
 * --------------------------------------------------------------
 *!/

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
    // all desktop sessions should support the PSA api
    sessions: ( await user.getAllLoginSessions() ).filter( ( session: { type: YOURDASH_SESSION_TYPE } ) => session.type === YOURDASH_SESSION_TYPE.desktop )
  } );
} );

exp.get( "/core/personal-server-accelerator/", async ( req, res ) => {
  const { username } = req.headers as { username: string };
  
  const user = new YourDashUser( username );
  
  try {
    return JSON.parse( ( await fs.readFile( path.join( user.path, "personal_server_accelerator.json" ) ) ).toString() );
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
    await fs.writeFile( path.join( user.path, "personal_server_accelerator.json" ), JSON.stringify( body ) );
  } catch ( _err ) {
    return res.json( { error: `Unable to write to ${ username }/personal_server_accelerator.json` } );
  }
  
  return res.json( { success: true } );
} );

// define all core endpoints
defineUserDatabaseRoutes( exp );
defineCorePanelRoutes( exp );
defineUserEndpoints( exp );

// load applications
applicationLoader( exp, httpServer );

// if we are not running in development mode, start the check for updates task
if ( !PROCESS_ARGUMENTS.dev ) {
  scheduleBackendUpdateChecker();
}
*/
