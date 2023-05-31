/** @format */

// The YourDash project
//  - https://github.com/yourdash-app/yourdash
//  - https://yourdash-app.github.io

import cors from "cors"
import express from "express"
import { existsSync as fsExistsSync, promises as fs } from "fs"
import path from "path"
import sharp from "sharp"
import YourDashUnreadApplication, { getAllApplications } from "./helpers/applications.js"
import { base64ToDataUrl } from "./helpers/base64.js"
import { compareHash } from "./helpers/encryption.js"
import { generateLogos } from "./helpers/logo.js"
import YourDashPanel from "./helpers/panel.js"
import YourDashUnreadUser, { YourDashUserPermissions } from "./helpers/user.js"
import { YourDashSessionType, IYourDashSession } from "../../shared/core/session.js"
import { createSession } from "./helpers/session.js"
import { Server as SocketIoServer } from "socket.io"
import * as http from "http"
import chalk from "chalk"
import minimist from "minimist"

const args = minimist( process.argv.slice( 2 ) )

const SESSIONS: { [key: string]: IYourDashSession<any>[] } = {}

function __internalGetSessions() {
  return SESSIONS
}

const SESSION_TOKEN_LENGTH = 128
enum YourDashServerDiscoveryStatus {
  // eslint-disable-next-line no-unused-vars
  MAINTENANCE, NORMAL, HIDDEN
}

export { args, __internalGetSessions, SESSION_TOKEN_LENGTH, YourDashServerDiscoveryStatus }

async function startupChecks() {
  // check if the filesystem exists
  if ( !fsExistsSync( path.resolve( process.cwd(), "./fs/" ) ) ) {
    await fs.mkdir(
      path.resolve( process.cwd(),
        "./fs/"
      ) )
    await fs.cp(
      path.resolve( process.cwd(),
        "./src/assets/default_avatar.avif" ), path.resolve( process.cwd(), "./fs/default_avatar.avif"
      ) )
    await fs.cp(
      path.resolve( process.cwd(),
        "./src/assets/default_instance_logo.avif" ), path.resolve( process.cwd(), "./fs/instance_logo.avif"
      ) )
    await fs.cp(
      path.resolve( process.cwd(),
        "./src/assets/default_login_background.avif" ), path.resolve( process.cwd(), "./fs/login_background.avif"
      ) )
    await fs.mkdir(
      path.resolve( process.cwd(),
        "./fs/users/"
      ) )

    // generate all instance logos
    generateLogos()
  }

  for ( const user of ( await fs.readdir( path.resolve( "./fs/users/" ) ) ) ) {
    await ( await new YourDashUnreadUser( user ).read() ).verifyUserConfig().write()
  }

  const adminUserUnread = new YourDashUnreadUser( "admin" )

  if ( !( await adminUserUnread.exists() ) ) {
    await adminUserUnread.create(
      "password",
      { first: "Admin", last: "istrator" },
      [YourDashUserPermissions.Administrator]
    )
  }
}

await startupChecks()

const app = express()
const httpServer = http.createServer( app )
const io = new SocketIoServer( httpServer )
const activeSockets = new Map<{id: string, token: string}, string>()

process.on( "SIGINT", () => {
  httpServer.close( () => {
    // eslint-disable-next-line no-process-exit
    process.exit( 0 )
  } )
} )

export { io, activeSockets }

io.use( async ( socket, next ) => {
  const { username, sessionToken } = socket.handshake.query as { username?: string, sessionToken?: string }

  if ( !username ) {
    return socket.disconnect()
  }

  if ( !sessionToken ) {
    return socket.disconnect()
  }

  if ( !__internalGetSessions()[username] ) {
    try {
      const user = await ( new YourDashUnreadUser( username ).read() )

      __internalGetSessions()[username] = ( await user.getSessions() ) || []
    } catch ( _err ) {
      return socket.disconnect()
    }
  }

  if ( __internalGetSessions()[username].find( session => session.sessionToken === sessionToken ) ) {
    return next()
  }


  return socket.disconnect()
} )

io.on( "connection", socket => {
  activeSockets.set( { id: socket.handshake.query.id as string, token: socket.handshake.query.sessionToken as string }, socket.id )

  socket.on( "execute-command-response", output => {
    console.log( output )
  } )

  socket.on( "disconnect", () => {
    activeSockets.forEach( ( value, key ) => {
      if ( value === socket.id ) {
        activeSockets.delete( key )
      }
    } )
  } )
} )


app.use( express.json( { limit: "50mb" } ) )
app.use( cors() )

app.use( ( _req, res, next ) => {
  res.removeHeader( "X-Powered-By" )
  next()
} )

if ( args["log-requests"] ) {
  app.use( ( req, res, next ) => {
    const date = new Date()
    switch ( req.method ) {
      case "GET":
        console.log(
          `${ date.getHours() }:${ date.getMinutes() }:${
            date.getSeconds() < 10
              ? `${ date.getSeconds() }0`
              : date.getSeconds()
          } ${ chalk.bgGreen( chalk.whiteBright( " GET " ) ) } ${ res.statusCode } ${ req.path }`
        )
        if ( JSON.stringify( req.query ) !== "{}" ) {
          console.log( JSON.stringify( req.query ) )
        }
        break
      case "POST":
        console.log(
          `${ date.getHours() }:${ date.getMinutes() }:${
            date.getSeconds() < 10
              ? `${ date.getSeconds() }0`
              : date.getSeconds()
          } ${ chalk.bgBlue( chalk.whiteBright( " POS " ) ) } ${ res.statusCode } ${ req.path }`
        )
        if ( JSON.stringify( req.query ) !== "{}" ) {
          console.log( JSON.stringify( req.query ) )
        }
        break
      case "DELETE":
        console.log(
          `${ date.getHours() }:${ date.getMinutes() }:${
            date.getSeconds() < 10
              ? `${ date.getSeconds() }0`
              : date.getSeconds()
          } ${ chalk.bgRed( chalk.whiteBright( " DEL " ) ) } ${ res.statusCode } ${ req.path }`
        )
        if ( JSON.stringify( req.query ) !== "{}" ) {
          console.log( JSON.stringify( req.query ) )
        }
        break
      default:
        console.log( `WARN ERROR IN REQUEST LOGGER, UNKNOWN REQUEST TYPE: ${ req.method }` )
    }
    next()
  } )
}

app.get( "/", ( _req, res ) => res.send( "Hello from the yourdash server software" ) )

app.get( "/test", ( _req, res ) => {
  const discoveryStatus: YourDashServerDiscoveryStatus = YourDashServerDiscoveryStatus.NORMAL as YourDashServerDiscoveryStatus

  switch ( discoveryStatus ) {
    case YourDashServerDiscoveryStatus.MAINTENANCE:
      return res.json( {
        status: YourDashServerDiscoveryStatus.MAINTENANCE, type: "yourdash"
      } )
    case YourDashServerDiscoveryStatus.NORMAL:
      return res.json( {
        status: YourDashServerDiscoveryStatus.NORMAL, type: "yourdash"
      } )
    default:
      console.error( "discovery status returned an invalid value" )
      return res.json( {
        status: YourDashServerDiscoveryStatus.MAINTENANCE, type: "yourdash"
      } )
  }
} )

app.get( "/login/background", ( _req, res ) => res.sendFile( path.resolve(
  process.cwd(),
  "./fs/login_background.avif"
) ) )

app.get( "/login/user/:username/avatar", ( req, res ) => {
  const user = new YourDashUnreadUser( req.params.username )
  return res.sendFile( path.resolve( user.getPath(), "avatar.avif" ) )
} )

app.get( "/login/user/:username", async ( req, res ) => {
  const user = new YourDashUnreadUser( req.params.username )
  if ( await user.exists() ) {
    return res.json( { name: ( await user.read() ).getName() } )
  } else {
    return res.json( { error: "Unknown user" } )
  }
} )

app.post( "/login/user/:username/authenticate", async ( req, res ) => {
  const username = req.params.username
  const password = req.body.password

  if ( !username || username === "" ) {
    return res.json( { error: true } )
  }

  if ( !password || password === "" ) {
    return res.json( { error: true } )
  }

  const user = new YourDashUnreadUser( username )

  const savedHashedPassword = ( await fs.readFile( path.resolve( user.getPath(), "./password.txt" ) ) ).toString()

  compareHash( savedHashedPassword, password )
    .then( async result => {
      if ( result ) {
        const session = await createSession(
          username,
          req.headers?.type === "desktop"
            ? YourDashSessionType.desktop
            : YourDashSessionType.web
        )
        return res.json( { token: session.sessionToken, id: session.id } )
      } else {
        return res.json( { error: true } )
      }
    } )
    .catch( _err => res.json( { error: true } ) )
} )

app.get( "/panel/logo/small", ( _req, res ) => res.sendFile( path.resolve(
  process.cwd(),
  "./fs/logo_panel_small.avif"
) ) )

app.get( "/login/is-authenticated", async ( req, res ) => {
  const { username, token } = req.headers as {
    username?: string; token?: string;
  }

  if ( !username ) {
    return res.json( { error: true } )
  }

  if ( !token ) {
    return res.json( { error: true } )
  }

  if ( !SESSIONS[username] ) {
    try {
      const user = await ( new YourDashUnreadUser( username ).read() )

      SESSIONS[username] = ( await user.getSessions() ) || []
    } catch ( _err ) {
      return res.json( { error: true } )
    }
  }

  if ( SESSIONS[username].find( session => session.sessionToken === token ) ) {
    return res.json( { success: true } )
  }
  return res.json( { error: true } )
} )

/**
 --------------------------------------------------------------
 WARNING: all endpoints require authentication after this point
 --------------------------------------------------------------
 */

app.use( async ( req, res, next ) => {
  const { username, token } = req.headers as { username?: string, token?: string }

  if ( !username ) {
    return res.json( { error: "authorization fail" } )
  }

  if ( !token ) {
    return res.json( { error: "authorization fail" } )
  }

  if ( !__internalGetSessions()[username] ) {
    try {
      const user = await ( new YourDashUnreadUser( username ).read() )

      SESSIONS[username] = ( await user.getSessions() ) || []
    } catch ( _err ) {
      return res.json( { error: "authorization fail" } )
    }
  }

  if ( __internalGetSessions()[username].find( session => session.sessionToken === token ) ) {
    return next()
  }

  return res.json( { error: "authorization fail" } )
} )

app.get( "/panel/user/name", async ( req, res ) => {
  const { username } = req.headers as { username: string }
  const user = ( await new YourDashUnreadUser( username ).read() )
  return res.json( user.getName() )
} )

app.get( "/panel/launcher/applications", async ( _req, res ) => {
  Promise.all( ( await getAllApplications() ).map( async app => {
    const application = await new YourDashUnreadApplication( app ).read()
    return new Promise( async resolve => {
      sharp( await fs.readFile( path.resolve(
        process.cwd(),
        `./src/apps/${ app }/icon.avif`
      ) ) ).resize( 98, 98 ).toBuffer( ( err, buf ) => {
        if ( err ) {
          resolve( { error: true } )
        }

        resolve( {
          name: application.getName(),
          displayName: application.getDisplayName(),
          description: application.getDescription(),
          icon: base64ToDataUrl( buf.toString( "base64" ) )
        } )
      } )
    } )
  } ) ).then( resp => res.json( resp ) )
} )

app.get( "/panel/quick-shortcuts", async ( req, res ) => {
  const { username } = req.headers as { username: string }

  const panel = new YourDashPanel( username )

  return res.json( await panel.getQuickShortcuts() )
} )

app.delete( "/panel/quick-shortcut/:ind", async ( req, res ) => {
  const { ind } = req.params
  const { username } = req.headers as { username: string }

  const panel = new YourDashPanel( username )

  await panel.removeQuickShortcut( parseInt( ind, 10 ) )

  return res.json( { success: true } )
} )

app.post( "/panel/quick-shortcuts/create", async ( req, res ) => {
  const { username } = req.headers as { username: string }
  const { displayName, name } = req.body as {
    displayName: string; name: string;
  }

  const panel = new YourDashPanel( username )
  const application = new YourDashUnreadApplication( name )

  try {
    await panel.createQuickShortcut(
      displayName,
      `/app/a/${ name }`,
      await fs.readFile( path.resolve( application.getPath(), "./icon.avif" ) )
    )
    return res.json( { success: true } )
  } catch ( _err ) {
    return res.json( { error: true } )
  }
} )

app.get( "/panel/position", async ( req, res ) => {
  const { username } = req.headers as { username: string }

  const panel = new YourDashPanel( username )

  return res.json( { position: await panel.getPanelPosition() } )
} )

app.get( "/panel/launcher", async ( req, res ) => {
  const { username } = req.headers as { username: string }

  const panel = new YourDashPanel( username )

  return res.json( { launcher: await panel.getLauncherType() } )
} )

app.get( "/core/sessions", async ( req, res ) => {
  const { username } = req.headers as { username: string }

  const user = await ( new YourDashUnreadUser( username ).read() )

  return res.json( { sessions: await user.getSessions() } )
} )

app.delete( "/core/session/:id", async ( req, res ) => {
  const { username } = req.headers as { username: string }
  const { id: sessionId } = req.params

  const user = await ( new YourDashUnreadUser( username ).read() )

  user.getSession( parseInt( sessionId, 10 ) ).invalidate()

  return res.json( { success: true } )
} )

app.get( "/core/personal-server-accelerator/sessions", async ( req, res ) => {
  const { username } = req.headers as { username: string }

  const user = await ( new YourDashUnreadUser( username ).read() )

  return res.json( { sessions: ( await user.getSessions() ).filter( session => session.type === YourDashSessionType.desktop ) } )
} )

app.get( "/core/personal-server-accelerator/", async ( req, res ) => {
  const { username } = req.headers as { username: string }

  const user = await ( new YourDashUnreadUser( username ) )

  try {
    return JSON.parse( ( await fs.readFile( path.resolve( user.getPath(), "personal_server_accelerator.json" ) ) ).toString() )
  } catch ( _err ) {
    return res.json( { error: `Unable to read ${ username }/personal_server_accelerator.json` } )
  }
} )

app.post( "/core/personal-server-accelerator/", async ( req, res ) => {
  const { username } = req.headers as { username: string }
  const body = req.body

  const user = await ( new YourDashUnreadUser( username ) )

  try {
    await fs.writeFile( path.resolve( user.getPath(), "personal_server_accelerator.json" ), JSON.stringify( body ) )
  } catch ( _err ) {
    return res.json( { error: `Unable to write to ${ username }/personal_server_accelerator.json` } )
  }

  return res.json( { success: true } )
} )

try {
  await new Promise<void>( async ( resolve, reject ) => {
    if ( fsExistsSync( path.resolve( process.cwd(), "./src/apps/" ) ) ) {
      const apps = await fs.readdir( path.resolve( process.cwd(), "./src/apps/" ) )
      apps.forEach( appName => {
      // console.log( `[${ chalk.bold.yellow.inverse( "CORE" ) }]: loading application: ${ appName }` )

        // import and load all applications
        import(
          `./apps/${ appName }/index.js`
        ).then( mod => {
          try {
            console.log( `Loading application: ${appName}` )
            mod.default( { app, io } )
          } catch ( err ) {
            reject( err )
          }
        } ).catch( err => {
          console.error( `Error while loading application: ${ appName }`, err )
        } )
      } )
      resolve()
    } else {
      resolve()
    }
  } )
} catch ( err ) {
  console.error( `[${ chalk.yellow.bold( "CORE" ) }]: Error during server initialization: ${ err.toString() }` )
}

httpServer.listen( 3560, () => {
  console.log( `[${ chalk.yellow.bold( "CORE" ) }]: server now listening on port 3560!` )
} )
