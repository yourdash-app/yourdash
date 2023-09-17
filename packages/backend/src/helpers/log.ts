/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import chalk from "chalk";
import globalDatabase from "./globalDatabase.js";

export enum logType {
  INFO,
  WARNING,
  ERROR,
  SUCCESS
}

export const LOG_HISTORY: {
  type: string,
  message: any[]
}[] = [];

/**
 * Logs a message with the specified type.
 * @param {logType} type - The type of log message.
 * @param {...any} message - The message(s) to log.
 * @returns {void}
 */
export default function log( type: logType, ...message: any[] ) {
  const logParams = [];
  
  if ( globalDatabase.get( "settings:log_should_log_time" ) ) {
    const date = new Date();
    
    logParams.push( `${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() < 10
      ? `${ date.getSeconds() }0`
      : date.getSeconds()
    } ` );
  }
  
  switch ( type ) {
  case logType.INFO:
    logParams.push( chalk.blue( "INFO    " ) );
    break;
  case logType.WARNING:
    logParams.push( chalk.yellow( "WARN    " ) );
    break;
  case logType.ERROR:
    logParams.push( chalk.red( "ERROR   " ) );
    break;
  case logType.SUCCESS:
    logParams.push( chalk.green( "SUCCESS " ) );
    break;
  default:
    break;
  }
  
  logParams.push( ...message );
  
  LOG_HISTORY.push( {
    type: ( type === logType.INFO
      ? "INFO"
      : type === logType.WARNING
        ? "WARN"
        : type === logType.ERROR
          ? "ERROR"
          : type === logType.SUCCESS ? "SUCCESS" : "UNKNOWN" ),
    // eslint-disable-next-line no-control-regex
    message: logParams.slice( 1 ).map( msg => msg?.replace?.( /\x1b\[[0-9;]*m/g, "" ) || "LOGGING ERROR" )
  } );
  
  if ( type === logType.ERROR ) {
    logParams.push( "\n" + new Error().stack )
  }
  
  // @ts-ignore
  console.log( ...logParams );
}
