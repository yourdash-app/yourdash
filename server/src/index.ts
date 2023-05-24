import minimist from "minimist"
import hmr from "node-hmr"
import * as http from "http"
import { IYourDashSession } from "../../shared/core/session.js"

console.log(
  "----------------------------------------------------\n                      YourDash                      \n----------------------------------------------------"
)

const args = minimist( process.argv.slice( 2 ) )

const SESSIONS: { [ user: string ]: IYourDashSession<any>[] } = {}

export function __internalGetSessions(): { [ user: string ]: IYourDashSession<any>[] } {
  return SESSIONS
}

let app: http.RequestListener

hmr( async () => {
  ( { default: app } = await import( "./main.js" ) )
} )

const server = http.createServer( app )

server.listen( 3000 )
