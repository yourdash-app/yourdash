import cors from "cors"
import express from "express"
import path from "path";
import { compareHash, generateRandomStringOfLength } from "./helpers/encryption.js";
import * as fs from "fs";
import User, { YourDashCorePermissions } from "./helpers/user.js";
import Fs from "./fileSystem/fileSystem.js";

const app = express()
const FILESYSTEM_ROOT = path.resolve( "./fs/" )
const USER_SESSION_CACHE: { [key: string]: string } = [] as any as { [key: string]: string }

if (!fs.existsSync( path.resolve( FILESYSTEM_ROOT ) )) {
  fs.cpSync( path.resolve( `./defaultFs/` ), path.resolve( FILESYSTEM_ROOT ), { recursive: true } )

  User.create( "admin", "admin", { name: "Administrator", permissions: [ YourDashCorePermissions.Administrator ] } )
}

app.use( cors() )
app.use( express.json( { limit: "25mb" } ) )
app.use( (_req, res, next) => {
  res.removeHeader( "X-Powered-By" )
  next()
} )

// #region allows use without authentication

app.get( `/`, (_req, res) => {
  return res.redirect( `https://yourdash.vercel.app` )
} )

app.get( `/test`, (_req, res) => {
  return res.send( `YourDash instance` )
} )

app.get( "/api/instance/login/background", (_req, res) => {
  return res.sendFile( path.resolve( `${ FILESYSTEM_ROOT }/background` ) )
} )

app.get( "/api/instance/login/logo", (_req, res) => {
  return res.sendFile( path.resolve( `${ FILESYSTEM_ROOT }/logo` ) )
} )

app.get( "/api/instance/login/name", (_req, res) => {
  // TODO: save and load the actual instance name
  return res.send( `Yourdash instance` )
} )

app.get( "/api/instance/login/message", (_req, res) => {
  // TODO: save and load the actual instance message
  return res.send( `This instance is new, welcome to YourDash` )
} )

// @ts-ignore
app.post( "/api/instance/login/login", (req, res) => {
  let { username, password } = req.body as { username: string, password: string }

  if (!username || !password) return res.json( { error: true } )

  let hashedPassword = Fs.openFile( User.getPath( username ), "password.enc" ).read() as string

  compareHash( hashedPassword, password ).then( resp => {
    if (resp) {
      let token = generateRandomStringOfLength( 128 )

      USER_SESSION_CACHE[username] = token

      return res.json( { token } )
    }

    return res.json( { error: true } )
  } ).catch( () => { return res.json( { error: true } )} )
} )

// #endregion

// check for authentication
app.use( (req, res, next) => {
  let { username, sessiontoken } = req.body as { username?: string, sessiontoken?: string }

  if (!username || !sessiontoken) return res.json( { error: `Unauthorized request` } )

  if (USER_SESSION_CACHE?.[username] === sessiontoken) {
    return next()
  }

  return res.json( { error: `Unauthorized request` } )
} )


app.listen( 3560, () => {
  console.log( `Yourdash backend listening on port 3560` )
} )

export { FILESYSTEM_ROOT }
