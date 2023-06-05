import minimist from "minimist"
import chalk from "chalk"
import { exec } from "child_process"

console.log(
  `-------------------------\n     ${ chalk.whiteBright(
    "YourDash v0.0.1"
  ) }     \n-------------------------`
)

const args = minimist( process.argv.slice( 2 ) )

console.log( `Starting with arguments: ${ JSON.stringify( args ) }` )

if ( !args.dev && args.compile ) {
  const childProcess = exec( "yarn run compile" )

  childProcess.stdout.on( "data", data => {
    if ( data.toString() === "$ tsc\n" ) {
      return
    }
    if ( data.toString() === "\x1Bc" ) {
      return
    }
    if ( data.toString() === "" ) {
      return
    }
    console.log(
      `[${ chalk.bold.blue( "TSC" ) }]: ${ data
        .toString()
        .replaceAll( "\n", "" )
        .replaceAll( "\x1Bc", "" ) }`
    )
  } )

  childProcess.stderr.on( "data", data => {
    if ( data.toString() === "$ tsc\n" ) {
      return
    }
    if ( data.toString() === "\x1Bc" ) {
      return
    }
    if ( data.toString() === "" ) {
      return
    }
    console.log(
      `[${ chalk.bold.blue( "TSC ERROR" ) }]: ${ data
        .toString()
        .replaceAll( "\n", "" )
        .replaceAll( "\x1Bc", "" ) }`
    )
  } )

  process.on( "exit", code => {
    console.log( `[${ chalk.yellow.bold( "CORE" ) }]: Server about to exit!` )

    if ( childProcess && !childProcess.killed ) {
      console.log(
        `[${ chalk.yellow.bold( "CORE" ) }]: Killing child process [ ${
          childProcess.pid
        } ] (${ chalk.bold.blue( "TSC" ) })`
      )
      childProcess.kill()
    }
  } )
}

if ( args.dev ) {
  console.log( `[${chalk.hex( "#fc6f45" ).bold( "DEV" )}]: starting server \"node ./src/main.js --color=full ${ process.argv.slice( 2 ).join( " " ) }\"` )

  const childProcess = exec(
    `npx tsc-watch --project . --onSuccess \"node${args.debug && " --inspect"} ./src/main.js --color=full ${ process.argv.slice( 2 ).join( " " ) }\"`
  )

  childProcess.stdout.on( "data", data => {
    if ( data.toString().indexOf( "Found 0 errors. Watching for file changes." ) !== -1 ) {
      return
    }
    if ( data.toString().indexOf( "Starting compilation in watch mode..." ) !== -1 ) {
      return
    }
    if ( data.toString() === "\n" ) {
      return
    }
    if ( data.toString().indexOf( "restarting due to changes..." ) !== -1 ) {
      return process.stdout.write(
        `${ chalk.reset( "[" ) }${ chalk.magenta.bold(
          "HMR"
        ) }]: ----------------------------------------------------------------------------------------------------\n${ chalk.reset(
          ""
        ) }`
      )
    }

    let output = data

    if ( output.indexOf( "[nodemon]" ) !== -1 ) {
      output = output.replaceAll( "\x1Bc", "" )

      output = output.replaceAll(
        "[nodemon] ",
        `${ chalk.reset( "[" ) }${ chalk.magenta.bold( "HMR" ) }]: `
      )

      output = output.replaceAll( "\n", "" )
    }

    process.stdout.write( output )
  } )

  childProcess.stderr.on( "data", data => {
    if (
      data
        .toString()
        .indexOf(
          "warning From Yarn 1.0 onwards, scripts don't require \"--\" for options to be forwarded. In a future version, any explicit \"--\" will be forwarded as-is to the scripts."
        ) !== -1
    ) {
      return
    }

    let output = data

    if ( output.indexOf( "[nodemon]" ) !== -1 ) {
      output = output.replaceAll( "\x1Bc", "" )

      output = output.replaceAll(
        "[nodemon] ",
        `${ chalk.reset( "[" ) }${ chalk.magenta.bold( "HMR ERROR" ) }]: `
      )

      output = output.replaceAll( "\n", "" )
    }

    process.stdout.write( output )
  } )

  process.on( "exit", exitCode => {
    console.log(
      `[${ chalk.yellow.bold(
        "CORE"
      ) }]: Server about to exit!\nexit code: ${ exitCode }`
    )

    if ( childProcess && !childProcess.killed ) {
      console.log(
        `[${ chalk.yellow.bold( "CORE" ) }]: Killing child process [ ${
          childProcess.pid
        } ] (${ chalk.magenta.bold( "HMR" ) })`
      )
      childProcess.kill()
      console.log( childProcess.pid )
      if ( childProcess && !childProcess.killed ) {
        console.log( "WARNING: HMR process still running!" )
      }
    }
  } )
} else {
  await import( "./main.js" )
}
