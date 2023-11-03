/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import chalk from "chalk";

export enum logType {
  INFO, WARNING, ERROR, SUCCESS
}

export default class CoreApiLog {
  logHistory: ( string | Uint8Array )[] = [];
  
  constructor() {
    return this;
  }
  
  private log( level: string, ...message: ( string | Uint8Array )[] ) { // eslint-disable-line @typescript-eslint/no-explicit-any
    this.logHistory.push( ...message );
    
    process.stdout.write( chalk.bold( `${chalk.white( "[" )}${chalk.italic.yellow( level.toUpperCase() ) }${chalk.white( "]" )}` ) )
    
    message.forEach( msg => {
      process.stdout.write( msg );
    } );
    
    process.stdout.write( "\n" );
    
    return this;
  }
  
  info( level: string, ...message: ( string | Uint8Array )[] ) {
    return this.log(
      level,
      chalk.bold( `${chalk.white( "[" )}${chalk.blue( "INFO" )}${chalk.white( "]" )} ` ),
      ...message
    );
  }
  
  success( level: string, ...message: ( string | Uint8Array )[] ) {
    return this.log(
      level,
      chalk.bold( `${chalk.white( "[" )}${chalk.green( "SUCCESS" )}${chalk.white( "]" )} ` ),
      ...message
    );
  }
  
  warning( level: string, ...message: ( string | Uint8Array )[] ) {
    return this.log(
      level,
      chalk.bold( `${chalk.white( "[" )}${chalk.yellow( "WARNING" )}${chalk.white( "]" )} ` ),
      ...message
    );
  }
  
  error( level: string, ...message: ( string | Uint8Array )[] ) {
    return this.log(
      level,
      chalk.bold( `${chalk.white( "[" )}${chalk.red( "ERROR" )}${chalk.white( "]" )} ` ),
      ...message
    );
  }
}
