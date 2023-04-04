import express from "express"
import cors from "cors"
import * as fs from "fs";
import path from "path";
import YourDashUser, { YourDashUserPermissions } from "./core/user.js";
import { compareHash, generateRandomStringOfLength } from "./core/encryption.js";
import { generateLogos } from "./core/logo.js";

console.log( `----------------------------------------------------\n                      YourDash                      \n----------------------------------------------------` )

let SESSIONS: { [ user: string ]: string } = {}

export enum YourDashServerDiscoveryStatus {
  MAINTENANCE, NORMAL
}

if ( process.env.DEV ) {
  if ( fs.existsSync( path.resolve( process.cwd(), `.dev-session-tokens` ) ) ) {
    // DEVELOPMENT MODE ONLY, loads all current session tokens between nodemon restarts
    SESSIONS = JSON.parse( fs.readFileSync( path.resolve( process.cwd(), `.dev-session-tokens` ) ).toString() || "{}" )
  }
}

function startupChecks() {
  if ( !fs.existsSync( path.resolve( `./fs/` ) ) ) {
    fs.cpSync(
        path.resolve( process.cwd(), `./default/fs/` ),
        path.resolve( process.cwd(), `./fs/` ),
        { recursive: true }
    )
    
    generateLogos()
  }
  
  fs.readdirSync( path.resolve( `./fs/users/` ) ).forEach( user => {
    new YourDashUser( user ).verifyUserConfig().write()
  } )
  
  let adminUser = new YourDashUser( "admin" )
  
  if ( !adminUser.exists() ) {
    adminUser.verifyUserConfig()
    adminUser.addPermission( YourDashUserPermissions.Administrator )
    adminUser.setName( { first: "Admin", last: "istrator" } )
    adminUser.write()
  }
}

startupChecks()

const app = express()
app.use( express.json( { limit: "50mb" } ) )
app.use( cors() )

app.get( `/`, ( req, res ) => {
  return res.send( `Hello from the yourdash server software` )
} )

app.get( `/test`, ( req, res ) => {
  const discoveryStatus: YourDashServerDiscoveryStatus = YourDashServerDiscoveryStatus.NORMAL as YourDashServerDiscoveryStatus
  switch ( discoveryStatus ) {
    case YourDashServerDiscoveryStatus.MAINTENANCE:
      return res.json( { status: YourDashServerDiscoveryStatus.MAINTENANCE, type: "yourdash" } )
    case YourDashServerDiscoveryStatus.NORMAL:
      return res.json( { status: YourDashServerDiscoveryStatus.NORMAL, type: "yourdash" } )
    default:
      console.error( `discovery status returned an invalid value` )
      return res.json( { status: YourDashServerDiscoveryStatus.MAINTENANCE, type: "yourdash" } )
  }
} )

app.get( `/login/background`, ( req, res ) => {
  return res.sendFile( path.resolve( process.cwd(), `./fs/login_background.avif` ) )
} )

app.get( `/login/user/:username/avatar`, ( req, res ) => {
  const user = new YourDashUser( req.params.username )
  
  return res.sendFile( path.resolve( user.getPath(), `avatar.avif` ) )
} )

app.get( `/login/user/:username`, ( req, res ) => {
  const user = new YourDashUser( req.params.username )
  
  if ( user.exists() ) {
    return res.json( {
      name: user.getName()
    } )
  } else {
    return res.json( { error: `Unknown user` } )
  }
} )

app.post( `/login/user/:username/authenticate`, ( req, res ) => {
  const { username } = req.params
  const { password } = req.body
  
  if ( !username || username === "" ) return res.json( { error: true } )
  if ( !password || password === "" ) return res.json( { error: true } )
  
  const user = new YourDashUser( username )
  let savedHashedPassword = fs.readFileSync( path.resolve( user.getPath(), `./password.txt` ) ).toString()
  let sessionToken = generateRandomStringOfLength( 128 )
  
  compareHash( savedHashedPassword, password ).then( result => {
    if ( result ) {
      SESSIONS[ username ] = sessionToken
      return res.json( { token: sessionToken } )
    }
  } )
  
} )

app.get( `/login/is-authenticated`, ( req, res ) => {
  let { username, token } = req.headers as { username?: string, token?: string }
  
  console.log( { username, token }, JSON.stringify( req.cookies ) )
  
  if ( !username )
    return res.json( { error: true } )
  
  if ( !token )
    return res.json( { error: true } )
  
  if ( SESSIONS[ username ] === token ) return res.json( { success: true } )
  
  return res.json( { error: true } )
} )

app.get( `/panel/logo/small`, ( req, res ) => {
  return res.sendFile( path.resolve( process.cwd(), `./fs/logo_panel_small.avif` ) )
} )

// --------------------------------------------------------------
// WARNING: all endpoints require authentication after this point
// --------------------------------------------------------------


app.use( ( req, res, next ) => {
  let { username, token } = req.headers as { username?: string, token?: string }
  
  if ( !username )
    return res.json( { error: `authorization fail` } )
  
  if ( !token )
    return res.json( { error: `authorization fail` } )
  
  if ( SESSIONS[ username ] === token ) return next()
  
  return res.json( { error: `authorization fail` } )
} )

app.get( `/panel/user/name`, ( req, res ) => {
  const { username } = req.headers as { username: string }
  
  const user = new YourDashUser( username )
  
  return res.json( user.getName() )
} )

new Promise<void>( ( resolve, reject ) => {
  if ( fs.existsSync( path.resolve( process.cwd(), `./apps/` ) ) ) {
    let apps = fs.readdirSync( path.resolve( process.cwd(), `./apps/` ) )
    
    apps.map( app => {
      console.log( `loading application: ${ app }` )
      import( `file://` + path.resolve( process.cwd(), `./apps/${ app }/index.js` ) ).then( mod => {
        try {
          mod.default()
        } catch ( err ) {
          reject( err )
        }
      } ).catch( err => {
        console.error( `Error while loading application: ${ app }`, err )
      } )
    } )
    
    resolve()
  } else {
    resolve()
  }
} ).then( () => {
  app.listen( 3560, () => {
    console.log( `server now listening on port 3560!` )
  } )
} ).catch( err => {
  console.error( `Error during server initialization: `, err )
} )

if ( process.env.DEV ) {
// DEVELOPMENT MODE ONLY, saves all current session tokens between nodemon restarts
  process.once( `SIGINT`, () => {
    fs.writeFileSync( path.resolve( process.cwd(), `.dev-session-tokens` ), JSON.stringify( SESSIONS ) )
  } );
}
