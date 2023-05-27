import minimist from "minimist"
import hmr from "./helpers/hmr.js"
import { IYourDashSession } from "../../shared/core/session.js"
import { exec } from "child_process"
import path from "path"
import chalk from "chalk"
import { enableHotReload, hotRequire } from "@hediet/node-reload"

console.log( `-------------------------\n     ${ chalk.whiteBright( "YourDash v0.0.1" ) }     \n-------------------------`
)

const args = minimist( process.argv.slice( 2 ) )

console.log( `Starting with arguments: ${ JSON.stringify( args ) }` )

export { args }

const SESSIONS: { [ user: string ]: IYourDashSession<any>[] } = {}

export function __internalGetSessions(): { [ user: string ]: IYourDashSession<any>[] } {
  return SESSIONS
}

if ( args.dev || args.compile ) {
  const childProcess = exec( "yarn run compile" )
  
  childProcess.stdout.on( "data", data => {
    console.log( `[${ chalk.bold.blue( "TSC" ) }]: ${ data.toString().replaceAll( "\n", "" ).replaceAll( "\x1Bc", "" ) }` )
  } )
  
  process.on( "exit", code => {
    console.log( "[CORE]: Server about to exit!" )
    
    if ( childProcess && !childProcess.killed ) {
      console.log( `[CORE]: Killing child process [ ${ childProcess.pid } ] (${ chalk.bold.blue( "TSC" ) })` )
      childProcess.kill()
    }
  } )
}

if ( args.dev ) {
  enableHotReload( { loggingEnabled: true, entryModule: module } )
  
  hotRequire<typeof import( "./main.js" )>( module, "./dep", current => {
    console.log( `[${ chalk.hex( "#cd5f2a" ).bold( "HMR" ) }]: ${ module.path } changed` )
  } )
} else {
  await import(
    `file://${ path.resolve(
      process.cwd(),
      "./src/main.js"
    ).replaceAll( "\\", "/" ) }`
    )
}
