import cors from "cors"
import express from "express"
import path from "path";
import { encrypt, generateRandomStringOfLength } from "./helpers/encryption.js";
import FileSystem from "./fileSystem/fileSystem.js";
import * as fs from "fs";

const app = express()

const FILESYSTEM_ROOT = path.resolve( "./fs/" )

console.log( FILESYSTEM_ROOT )

const USER_SESSION_CACHE: { [key: string]: string } = [] as any as { [key: string]: string }

if (!fs.existsSync( path.resolve( FILESYSTEM_ROOT ) ))
  fs.cpSync( path.resolve( `./defaultFs/` ), path.resolve( FILESYSTEM_ROOT ), { recursive: true } )

app.use( cors() )
app.use( express.json( { limit: "25mb" } ) )
app.use( express.urlencoded( { limit: "25mb" } ) )

// #region allows use without authentication

app.get( `/`, (_req, res) => {
  return res.redirect( `https://yourdash.vercel.app` )
} )

app.get( `/test`, (_req, res) => {
  return res.send( `YourDash instance` )
} )

app.get( "/api/instance/login/background", (_req, res) => {
  // TODO: save and load the actual background image
  return res.sendFile( path.resolve( `../applications/dash.png` ) )
} )

app.get( "/api/instance/login/logo", (_req, res) => {
  // TODO: save and load the actual logo
  return res.sendFile( path.resolve( `../applications/dash.png` ) )
} )

app.get( "/api/instance/login/name", (_req, res) => {
  // TODO: save and load the actual instance name
  return res.send( `Yourdash instance` )
} )

app.get( "/api/instance/login/message", (_req, res) => {
  // TODO: save and load the actual instance message
  return res.send( `This instance is new, welcome to YourDash` )
} )

app.post( "/api/instance/login/login", (req, res) => {
  let { username, password } = req.body as { username?: string, password?: string }

  if (!username || !password) return

  let encryptedPassword = encrypt( password )

  let fs = new FileSystem()

  let savedEncryptedPassword = JSON.parse( fs.openFile( `USER_DIRECTORY` ).read() as string )

  if (encryptedPassword === savedEncryptedPassword) {
    let token = generateRandomStringOfLength( 128 )

    USER_SESSION_CACHE[username] = token

    return res.json( { token } )
  }

  return res.json( { error: true } )
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
