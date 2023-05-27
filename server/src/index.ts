import minimist from "minimist"
import chalk from "chalk"
import { exec } from "child_process"
import { IYourDashSession } from "../../shared/core/session.js"

console.log( `-------------------------\n     ${chalk.whiteBright( "YourDash v0.0.1" )}     \n-------------------------` )

const args = minimist( process.argv.slice( 2 ) )

console.log( `Starting with arguments: ${JSON.stringify( args )}` )

if ( args.dev || args.compile ) {
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
    console.log( `[${chalk.bold.blue( "TSC" )}]: ${data.toString().replaceAll( "\n", "" ).replaceAll( "\x1Bc", "" )}` )
  } )

  process.on( "exit", code => {
    console.log( `[${chalk.yellow.bold( "CORE" )}]: Server about to exit!` )

    if ( childProcess && !childProcess.killed ) {
      console.log( `[${chalk.yellow.bold( "CORE" )}]: Killing child process [ ${childProcess.pid} ] (${chalk.bold.blue( "TSC" )})` )
      childProcess.kill()
    }
  } )
}

if ( args.dev ) {
  const childProcess = exec( `yarn run nodemon-start -- ${process.argv.slice( 2 ).toString()}` )

  childProcess.stdout.on( "data", data => {
    if ( data.toString().indexOf( "2.0.22" ) !== -1 ) {
      return
    }
    if ( data.toString().indexOf( "watching path" ) !== -1 ) {
      return
    }
    if ( data.toString().indexOf( "watching extensions" ) !== -1 ) {
      return
    }
    if ( data.toString().indexOf( "$ nodemon ./src/main.js\n" ) !== -1 ) {
      return
    }
    console.log( `${data.toString().replaceAll( "\n", " " ).replaceAll( "\x1Bc", "" ).replaceAll( "[nodemon]", `${chalk.reset( "[" )}${chalk.magenta.bold( "HMR" )}]:` )}` )
  } )

  process.on( "exit", code => {
    console.log( `[${chalk.yellow.bold( "CORE" )}]: Server about to exit!` )

    if ( childProcess && !childProcess.killed ) {
      console.log( `[${chalk.yellow.bold( "CORE" )}]: Killing child process [ ${childProcess.pid} ] (${chalk.magenta.bold( "HMR" )})` )
      childProcess.kill()
    }
  } )
} else {
  await import( "./main.js" )
}
