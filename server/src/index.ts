import minimist from "minimist"
import hmr from "./helpers/hmr.js"
import { IYourDashSession } from "../../shared/core/session.js"
import { exec } from "child_process"

console.log(
  "----------------------------------------------------\n                      YourDash                      \n----------------------------------------------------"
)

const args = minimist( process.argv.slice( 2 ) )

console.log( `Starting with arguments: ${JSON.stringify( args )}` )

export { args }

const SESSIONS: { [ user: string ]: IYourDashSession<any>[] } = {}

export function __internalGetSessions(): { [ user: string ]: IYourDashSession<any>[] } {
  return SESSIONS
}

if ( args.dev || args.compile ) {
  const childProcess = exec( "yarn run compile" )

  childProcess.stdout.on( "data", data => {
    console.log( `[TSC]: ${data.toString().replaceAll( "\n", "" )}` )
  } )

  process.on( "exit", code => {
    console.log( "[CORE]: Server about to exit!" )

    if ( childProcess && !childProcess.killed ) {
      console.log( `[CORE]: Killing child process [ ${childProcess.pid} ] (tsc)` )
      childProcess.kill()
    }
  } )
}

if ( args.dev ) {
  let timeout: NodeJS.Timeout

  hmr( ["./src/**/*.js"], () => {
    if ( timeout ) {
      clearTimeout( timeout )
    }
    timeout = setTimeout( async () => {
      try {
        await import( "./main.js" )
        console.log( "[CORE HMR]: HMR loaded" )
      } catch ( err ) {
        console.error( `[CORE]: ${err}` )
      }
    }, 200 )
  } )
} else {
  await import( "./main.js" )
}
