/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import chalk from "chalk";

export enum LOG_TYPE {
  INFO, WARNING, ERROR, SUCCESS, DEBUG
}

const LOG_META_MAX_LENGTH = 20

export default class CoreApiLog {
  logHistory: { type: LOG_TYPE, level: string, message: ( string | Uint8Array )[] }[] = [];

  constructor() {
    return this;
  }

  private log( type: LOG_TYPE, level: string, ...message: ( string | Uint8Array )[] ) { // eslint-disable-line @typescript-eslint/no-explicit-any
    this.logHistory.push( { type: type, level: level, message: message } );

    process.stdout.write( message[0] );

    process.stdout.write(
      chalk.bold( `${chalk.white( "[" )}${chalk.italic.yellow(
        level
          .toUpperCase()
          .slice( 0, LOG_META_MAX_LENGTH )
          .padEnd( LOG_META_MAX_LENGTH )
      ) }${chalk.white( "]" )} ` )
    )

    message.slice( 1 ).forEach( msg => {
      process.stdout.write( msg );
    } );

    process.stdout.write( "\n" );

    return this;
  }

  info( level: string, ...message: ( string | Uint8Array )[] ) {
    return this.log(
      LOG_TYPE.INFO,
      level,
      chalk.bold( `${chalk.white( "[" )}${chalk.blue( "INF" )}${chalk.white( "]" )}` ),
      ...message
    );
  }

  success( level: string, ...message: ( string | Uint8Array )[] ) {
    return this.log(
      LOG_TYPE.SUCCESS,
      level,
      chalk.bold( `${chalk.white( "[" )}${chalk.green( "SUC" )}${chalk.white( "]" )}` ),
      ...message
    );
  }

  warning( level: string, ...message: ( string | Uint8Array )[] ) {
    return this.log(
      LOG_TYPE.WARNING,
      level,
      chalk.bold( `${chalk.white( "[" )}${chalk.yellow( "WAR" )}${chalk.white( "]" )}` ),
      ...message
    );
  }

  error( level: string, ...message: ( string | Uint8Array )[] ) {
    return this.log(
      LOG_TYPE.ERROR,
      level,
      chalk.bold( `${chalk.white( "[" )}${chalk.red( "ERR" )}${chalk.white( "]" )}` ),
      ...message
    );
  }

  debug( level: string, ...message: ( string | Uint8Array )[] ) {
    return this.log(
      LOG_TYPE.DEBUG,
      level,
      chalk.bold( `${chalk.white( "[" )}${chalk.magenta( "DBG" )}${chalk.white( "]" )}` ),
      ...message
    );
  }
}
