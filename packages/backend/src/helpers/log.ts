/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import chalk from "chalk";
import globalDatabase from "./globalDatabase.js";

export enum logTypes {
  info, warn, error, success
}

export const logHistory: {
  type: string,
  message: any[]
}[] = [];

/**
 * Logs a message with the specified type.
 * @param {logTypes} type - The type of log message.
 * @param {...any} message - The message(s) to log.
 * @returns {void}
 */
export default function log( type: logTypes, ...message: any[] ) {
  const logParams = [];
  
  if ( globalDatabase.get( "settings:log_should_log_time" ) ) {
    const date = new Date();
    
    logParams.push( `${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() < 10
      ? `${ date.getSeconds() }0`
      : date.getSeconds()
    } ` );
  }
  
  switch ( type ) {
  case logTypes.info:
    logParams.push( chalk.blue( "INFO    " ) );
    break;
  case logTypes.warn:
    logParams.push( chalk.yellow( "WARN    " ) );
    break;
  case logTypes.error:
    logParams.push( chalk.red( "ERROR   " ) );
    break;
  case logTypes.success:
    logParams.push( chalk.green( "SUCCESS " ) );
    break;
  default:
    break;
  }
  
  logParams.push( ...message );
  
  logHistory.push( {
    type: ( type === logTypes.info
      ? "INFO"
      : type === logTypes.warn
        ? "WARN"
        : type === logTypes.error
          ? "ERROR"
          : type === logTypes.success ? "SUCCESS" : "UNKNOWN" ),
    // eslint-disable-next-line no-control-regex
    message: logParams.slice( 1 ).map( msg => msg?.replace?.( /\x1b\[[0-9;]*m/g, "" ) || "LOGGING ERROR" )
  } );
  
  // @ts-ignore
  console.log( ...logParams );
}
