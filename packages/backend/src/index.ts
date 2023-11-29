/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { exec } from "child_process";
import minimist from "minimist";
import chalk from "chalk";

function getTerminalWidth(): number {
  return process.stdout.columns || 80
}

function centerTerminalOutputOnLine( string: string ): string {
  const TERMINAL_WIDTH = getTerminalWidth()
  const STRING_LENGTH = string.length
  const LINE_SIZE = ( TERMINAL_WIDTH - ( STRING_LENGTH + 12 ) ) / 2

  let output = ""

  for ( let i = 0; i < LINE_SIZE; i++ )
    output += "-"

  output += ` ${string} `

  for ( let i = 0; i < LINE_SIZE; i++ )
    output += "-"

  return output
}

console.log( centerTerminalOutputOnLine( chalk.whiteBright( "YourDash CLI v0.0.1" ) ) );

// eslint-disable-next-line no-magic-numbers
const args = minimist( process.argv.slice( 2 ) );

console.log( `Starting with arguments: ${ JSON.stringify( args ) }` );

// noinspection JSDeprecatedSymbols
if ( !args.dev && args.compile ) {
  const childProcess = exec( "yarn run compile-all" );

  childProcess.stdout.on( "data", ( data: string ) => {
    if ( data.toString() === "$ tsc\n" ) {
      return;
    }
    if ( data.toString() === "\x1Bc" ) {
      return;
    }
    if ( data.toString() === "" ) {
      return;
    }

    console.log( `[${ chalk.bold.blue( "TSC" ) }]: ${ data.toString().replaceAll( "\n", "" ).replaceAll( "\x1Bc", "" ).replaceAll( "error", `${ chalk.bold.redBright( "ERROR" ) }` ) }` );
  } );

  childProcess.stderr.on( "data", data => {
    if ( data.toString() === "$ tsc\n" ) {
      return;
    }
    if ( data.toString() === "\x1Bc" ) {
      return;
    }
    if ( data.toString() === "" ) {
      return;
    }

    console.log( `[${ chalk.bold.blue( "TSC ERROR" ) }]: ${
      data.toString()
        .replaceAll( "\n", "" )
        .replaceAll( "\x1Bc", "" )
        .replaceAll( "error", `${ chalk.bold.redBright( "ERROR" ) }` )
    }` );
  } );

  process.on( "exit", () => {
    console.log( `${ chalk.yellow.bold( "CORE" ) }: Server about to exit!` );

    if ( childProcess && !childProcess.killed ) {
      console.log( `${ chalk.yellow.bold( "CORE" ) }: Killing child process [ ${ childProcess.pid } ] (${ chalk.bold.blue( "TSC" ) })` );
      childProcess.kill();
    }
  } );
}

function startDevServer() {
  const COMPILE_COMMAND = "tsc --watch"
  const DEV_COMMAND = `nodemon ./src/main.js -- ${ args.debug ? "--inspect-brk " : "" }--color=full ${ process.argv.slice( 2 ).join( " " ) }`
  console.log( `[${ chalk.hex( "#fc6f45" ).bold( "DEV" ) }]: ${DEV_COMMAND}` );

  const compileProcess = exec( COMPILE_COMMAND );
  const devProcess = exec( DEV_COMMAND );

  compileProcess.stdout.on( "data", ( data: string ) => {
    if ( data.toString() === "$ tsc\n" ) {
      return;
    }
    if ( data.toString() === "\x1Bc" ) {
      return;
    }
    if ( data.toString() === "" ) {
      return;
    }

    console.log( `[${ chalk.bold.blue( "TSC" ) }]: ${ data.toString().replaceAll( "\n", "" ).replaceAll( "\x1Bc", "" ) }` );
  } );

  compileProcess.stderr.on( "data", data => {
    if ( data.toString() === "$ tsc\n" ) {
      return;
    }
    if ( data.toString() === "\x1Bc" ) {
      return;
    }
    if ( data.toString() === "" ) {
      return;
    }

    console.log( `[${ chalk.bold.blue( "TSC ERROR" ) }]: ${
      data.toString()
        .replaceAll( "\n", "" )
        .replaceAll( "\x1Bc", "" )
        .replaceAll( "error", `${ chalk.bold.redBright( "ERROR" ) }` )
    }` );
  } );

  compileProcess.on( "exit", code => {
    console.log( `hot compilation process exited with code ${ code }, will not auto-restart!` );
  } )

  devProcess.on( "exit", code => {
    console.log( `application process exited with code ${ code }, will not auto-restart!` );
  } );

  devProcess.stdout.on( "data", data => {
    // remove all messages from nodemon
    if ( data.toString().includes( "[nodemon]" ) ) {
      return;
    }

    if ( data.toString().includes( "Shutting down... ( restart should occur automatically )" ) ) {
      devProcess.stdin.write( "rs" )
    }

    process.stdout.write( data );

    if ( data.toString().startsWith( "---DEV_CLEAR---" ) ) {
      console.clear()
    }
  } );

  devProcess.stderr.on( "data", data => {
    if ( data.toString().indexOf(
      "warning From Yarn 1.0 onwards, scripts don't require \"--\" for options to be forwarded. In a future version, any explicit \"--\" will be forwarded as-is to the scripts." ) !==
         -1 ) {
      return;
    }

    process.stdout.write( data );
  } );

  process.stdin.on( "data", chunk => {
    devProcess.stdin.write( chunk );
  } );

  process.stdin.on( "end", () => {
    devProcess.stdin.end();
  } );
}

if ( args.dev ) {
  startDevServer();
} else {
  await import( "./main.js" );
}
