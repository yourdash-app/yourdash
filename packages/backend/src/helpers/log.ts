/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import chalk from "chalk";
import { logType } from "../core/core/coreApiLog.js";
import globalDatabase from "./globalDatabase.js";

export const LOG_HISTORY: {
  type: string, level: string, message: never[]
}[] = [];

/**
 * Logs a message with the specified type.
 * @param {logType} type - The type of log message.
 * @param {string} level - The level to log to.
 * @param {...any} message - The message(s) to log.
 * @returns {void}
 */
export default function log( type: logType, level: string, ...message: unknown[] ): void {
  const logParams = [];
  
  if ( globalDatabase.get( "settings:log_should_log_time" ) ) {
    const date = new Date();
    
    logParams.push( `${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() < 10 ? `${ date.getSeconds() }0` : date.getSeconds() } ` );
  }
  
  logParams.push( `[${ level }]` );
  
  switch ( type ) {
  case logType.INFO:
    logParams.push( chalk.blue( "INFO" ) );
    break;
  case logType.WARNING:
    logParams.push( chalk.yellow( "WARN" ) );
    break;
  case logType.ERROR:
    logParams.push( chalk.red( "ERROR" ) );
    break;
  case logType.SUCCESS:
    logParams.push( chalk.green( "SUCCESS" ) );
    break;
  default:
    break;
  }
  
  if ( type === logType.ERROR ) {
    let stackTrace = new Error( message.toString() ).stack.slice( 7 );
    const stackArray = stackTrace.split( "\n" );
    stackArray.splice( 1, 1 );
    stackTrace = stackArray.join( "\n" );
    logParams.push( stackTrace );
  } else {
    logParams.push( ...message );
    
    LOG_HISTORY.push( {
      type: type === logType.INFO ? "INFO" : type === logType.WARNING ? "WARN" : type === logType.SUCCESS ? "SUCCESS" : "UNKNOWN",
      level: level.toLowerCase(),
      message: logParams.slice( 1 ).map( msg => msg?.replace?.( /\x1b\[[0-9;]*m/g, "" ) || "LOGGING ERROR" ) as never
    } );
  }
  
  // @ts-ignore
  console.log( ...logParams );
}
