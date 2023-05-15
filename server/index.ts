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
import YourDashUser, { YourDashUserPermissions } from "./helpers/user.js"
import { YourDashSession, YourDashSessionType } from "../shared/core/session.js"
import { createSession } from "./helpers/session.js"

console.log(
  "----------------------------------------------------\n                      YourDash                      \n----------------------------------------------------"
)

const SESSIONS: { [ user: string ]: YourDashSession[] } = {}

export function __internalGetSessions(): { [ user: string ]: YourDashSession[] } {
  return SESSIONS
}

export enum YourDashServerDiscoveryStatus {
  // eslint-disable-next-line no-unused-vars
  MAINTENANCE, NORMAL, HIDDEN
}

export const SESSION_TOKEN_LENGTH = 128

async function startupChecks() {
  // check if the filesystem exists
  if ( !fsExistsSync( path.resolve( process.cwd(), "./fs/" ) ) ) {
    await fs.mkdir( path.resolve( process.cwd(), "./fs/" ) )
    await fs.cp( path.resolve( process.cwd(), "./assets/default_avatar.avif" ), path.resolve( process.cwd(), "./fs/avatar.avif" ) )
    await fs.cp( path.resolve( process.cwd(), "./assets/default_instance_logo.avif" ), path.resolve( process.cwd(), "./fs/instance_logo.avif" ) )
    await fs.cp( path.resolve( process.cwd(), "./assets/default_login_background.avif" ), path.resolve( process.cwd(), "./fs/login_background.avif" ) )
    await fs.mkdir( path.resolve( process.cwd(), "./fs/users/" ) )

    // generate all instance logos
    generateLogos()
  }

  for ( const user of ( await fs.readdir( path.resolve( "./fs/users/" ) ) ) ) {
    await ( await new YourDashUser( user ).read() ).verifyUserConfig().write()
  }

  const adminUserUnread = new YourDashUser( "admin" )

  if ( !( await adminUserUnread.exists() ) ) {
    const adminUser = await adminUserUnread.read()
    adminUser.verifyUserConfig()
    adminUser.addPermission( YourDashUserPermissions.Administrator )
    adminUser.setName( { first: "Admin", last: "istrator" } )
    await adminUser.write()
  }
}

await startupChecks()

const app = express()

app.use( express.json( { limit: "50mb" } ) )
app.use( cors() )

app.use( ( _req, res, next ) => {
  res.removeHeader( "X-Powered-By" )
  next()
} )

app.get( "/", ( _req, res ) => res.send( "Hello from the yourdash server software" ) )

app.get( "/test", ( _req, res ) => {
  const discoveryStatus: YourDashServerDiscoveryStatus =
    YourDashServerDiscoveryStatus.NORMAL as YourDashServerDiscoveryStatus

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
  const user = new YourDashUser( req.params.username )
  return res.sendFile( path.resolve( user.getPath(), "avatar.avif" ) )
} )

app.get( "/login/user/:username", async ( req, res ) => {
  const user = new YourDashUser( req.params.username )
  if ( await user.exists() ) {
    return res.json( { name: ( await user.read() ).getName() } )
  } else {
    return res.json( { error: "Unknown user" } )
  }
} )

app.post( "/login/user/:username/authenticate", async ( req, res ) => {
  const { username } = req.params
  const { password } = req.body
  if ( !username || username === "" ) {
    return res.json( { error: true } )
  }
  if ( !password || password === "" ) {
    return res.json( { error: true } )
  }
  const user = new YourDashUser( username )
  const savedHashedPassword = (
    await fs.readFile( path.resolve( user.getPath(), "./password.txt" ) )
  ).toString()
  compareHash( savedHashedPassword, password ).then( result => {
    if ( result ) {
      const session = createSession( username, YourDashSessionType.web )
      return res.json( { token: session.sessionToken } )
    }
  } )
} )

app.get( "/login/is-authenticated", ( req, res ) => {
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
    return res.json( { error: true } )
  }

  if ( SESSIONS[username].find( session => session.sessionToken === token ) ) {
    return res.json( { success: true } )
  }
  return res.json( { error: true } )
} )

app.get( "/panel/logo/small", ( _req, res ) => res.sendFile( path.resolve(
  process.cwd(),
  "./fs/logo_panel_small.avif"
) ) )


/**
 --------------------------------------------------------------
 WARNING: all endpoints require authentication after this point
 --------------------------------------------------------------
*/


app.use( ( req, res, next ) => {
  const { username, token } = req.headers as { username?: string, token?: string }

  if ( !username ) {
    return res.json( { error: "authorization fail" } )
  }

  if ( !token ) {
    return res.json( { error: "authorization fail" } )
  }

  if ( !SESSIONS[username] ) {
    return res.json( { error: "authorization fail" } )
  }

  if ( SESSIONS[username].find( session => session.sessionToken === token ) ) {
    return next()
  }

  return res.json( { error: "authorization fail" } )
} )

app.get( "/panel/user/name", async ( req, res ) => {
  const { username } = req.headers as { username: string }
  const user = ( await new YourDashUser( username ).read() )
  return res.json( user.getName() )
} )

app.get( "/panel/launcher/applications", async ( _req, res ) => {
  Promise.all( ( await getAllApplications() ).map( async app => {
    const application = await new YourDashUnreadApplication( app ).read()
    return new Promise( async resolve => {
      sharp( await fs.readFile( path.resolve(
        process.cwd(),
        `./apps/${ app }/icon.avif`
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

new Promise<void>( async ( resolve, reject ) => {
  if ( fsExistsSync( path.resolve( process.cwd(), "./apps/" ) ) ) {
    const apps = await fs.readdir( path.resolve( process.cwd(), "./apps/" ) )
    apps.forEach( appName => {
      console.log( `loading application: ${ appName }` )

      // import and load all applications
      import(
        `file://${ path.resolve(
          process.cwd(),
          `./apps/${ appName }/index.js`
        ) }`
      ).then( mod => {
        try {
          mod.default( app )
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
} ).then( () => {
  app.listen( 3560, () => {
    console.log( "server now listening on port 3560!" )
  } )
} ).catch( err => {
  console.error( "Error during server initialization: ", err )
} )
