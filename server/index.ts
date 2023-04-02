import express from "express"
import cors from "cors"
import * as fs from "fs";
import path from "path";
import YourDashUser from "./core/user.js";

console.log( `----------------------------------------------------\n                      YourDash                      \n----------------------------------------------------` )

export enum YourDashServerDiscoveryStatus {
  MAINTENANCE, NORMAL
}

if (!fs.existsSync( path.resolve( `./fs/` ) )) {
  fs.cpSync( path.resolve( `./default/fs/` ), path.resolve( `./fs/` ), { recursive: true } )
}

const app = express()
app.use( express.json( { limit: "50mb" } ) )
app.use( cors() )

app.get( `/`, (req, res) => {
  return res.send( `Hello from the yourdash server software` )
} )

app.get( `/test`, (req, res) => {
  const discoveryStatus: YourDashServerDiscoveryStatus = YourDashServerDiscoveryStatus.NORMAL as YourDashServerDiscoveryStatus
  switch (discoveryStatus) {
    case YourDashServerDiscoveryStatus.MAINTENANCE:
      return res.json( { status: YourDashServerDiscoveryStatus.MAINTENANCE, type: "yourdash" } )
    case YourDashServerDiscoveryStatus.NORMAL:
      return res.json( { status: YourDashServerDiscoveryStatus.NORMAL, type: "yourdash" } )
    default:
      console.error( `discovery status returned an invalid value` )
      return res.json( { status: YourDashServerDiscoveryStatus.MAINTENANCE, type: "yourdash" } )
  }
} )

app.get( `/login/background`, (req, res) => {
  return res.sendFile( path.resolve( `./fs/login_background.avif` ) )
} )

app.get( `/login/user/:username/avatar`, (req, res) => {
  const user = new YourDashUser( req.params.username )
  
  return res.sendFile( path.resolve( user.getPath(), `login_avatar.avif` ) )
} )

app.get( `/login/user/:username`, (req, res) => {
  const user = new YourDashUser( req.params.username )
  
  if (user.exists()) {
    return res.json( {
      name: user.getName()
    } )
  } else {
    return res.json( { error: `Coming soon...` } )
  }
} )

app.listen( 3560, () => {
  console.log( `server now listening on port 3560!` )
} )
