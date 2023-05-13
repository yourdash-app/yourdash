#!/usr/bin/env node

/*
 * YourDash Server CLI
 * © 2023 Ewsgit
 *
 * Licensed under the MIT License
 */

import chalk from "chalk"
import parseArguments from "./parseArguments.js"

const args = parseArguments( process.argv )

const CLI_VERSION_NUMBER = 0.1

const ALLOWED_ARGUMENTS: string[] = [
  "-v",
  "--version",
  "--user"
]

if ( Object.keys( args ).filter( arg => ALLOWED_ARGUMENTS.includes( arg ) ).length === 0 ) {
  console.log( chalk.red( `Unknown arguments: ${ Object.keys( args ) }` ) )
  // eslint-disable-next-line no-process-exit
  process.exit( 1 )
}

if ( args["-v"] || args["--version"] ) {
  console.log( `${ chalk.bold.whiteBright( "YourDash" ) } ${ chalk.bold.white( `CLI v${ CLI_VERSION_NUMBER }` ) } © 2023 Ewsgit` )
}

if ( args["--user"] ) {
  const username = args["--user"]
  console.log( username )
}
