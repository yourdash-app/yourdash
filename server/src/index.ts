import minimist from "minimist"
import hmr from "node-hmr"
import { IYourDashSession } from "../../shared/core/session.js"

console.log(
  "----------------------------------------------------\n                      YourDash                      \n----------------------------------------------------"
)

const args = minimist( process.argv.slice( 2 ) )

export { args }

const SESSIONS: { [ user: string ]: IYourDashSession<any>[] } = {}

export function __internalGetSessions(): { [ user: string ]: IYourDashSession<any>[] } {
  return SESSIONS
}

console.log( process.cwd() )

if ( args.dev ) {
  hmr( async () => {
    await import( "./main.js" )
  }, {} )
} else {
  await import( "./main.js" )
}
