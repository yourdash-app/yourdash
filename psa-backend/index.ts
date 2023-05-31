import * as express from "express"
import { io as socketIoClient } from "socket.io-client"
import shellExec from "shell-exec"
import fetch from "node-fetch"

const app = express()

export default function startPsaBackend( wsInstanceUrl: string, restInstanceUrl: string, username: string, password: string ) {
  fetch( `${ restInstanceUrl }/login/user/${ username }/authenticate`, {
    method: "POST", headers: {
      "Content-Type": "application/json", type: "desktop"
    }, body: JSON.stringify( {
      password
    } )
  } )
  .then( ( res: any ) => res.json() )
  .then( ( sessionTokenResponse: any ) => {
    const io = socketIoClient( wsInstanceUrl, {
      query: {
        username: username, sessionToken: sessionTokenResponse.token, sessionId: sessionTokenResponse.id
      }
    } )
    
    io.on( "execute-command", async ( cmd: string ) => {
      let resp = await shellExec( cmd )
      io.emit( "execute-command-response", resp )
    } )
    
    io.on("disconnect", () => {
      console.log( "Disconnected from psa-backend! (retrying connection)" )
      io.connect()
    })
    
    app.get( "/", ( req, res ) => {
      res.send( "Hello curious user, welcome to the YourDash PSA (Personal Server Accelerator) backend!" )
    } )
    
    app.get( "/test", ( req, res ) => {
      res.json( { status: "ok" } )
    } )
    
    app.listen( 3561, () => {
      console.log( "Started psa-backend on port 3561\n\t- http://localhost:3561\n\t- http://0.0.0.0:3561" )
    } )
  } )
}
