/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import log, { logType } from "../helpers/log.js";
import chalk from "chalk";
import { Application as ExpressApplication } from "express";

export default function startRequestLogger(
  app: ExpressApplication,
  options: {
    logOptionsRequests?: boolean
  }
) {
  app.use( ( req, res, next ) => {
    switch ( req.method ) {
    case "GET":
      log(
        logType.INFO,
        "core:request_get",
        `${ chalk.bgGreen( chalk.black( " GET " ) ) } ${ res.statusCode } ${ req.path }`
      );
      if ( JSON.stringify( req.query ) !== "{}" ) {
        log( logType.INFO, JSON.stringify( req.query ) );
      }
      break;
    case "POST":
      log(
        logType.INFO,
        "core:request_post",
        `${ chalk.bgBlue( chalk.black( " POS " ) ) } ${ res.statusCode } ${ req.path }`
      );
      if ( JSON.stringify( req.query ) !== "{}" ) {
        log( logType.INFO, JSON.stringify( req.query ) );
      }
      break;
    case "DELETE":
      log(
        logType.INFO,
        "core:request_delete",
        `${ chalk.bgRed( chalk.black( " DEL " ) ) } ${ res.statusCode } ${ req.path }`
      );
      if ( JSON.stringify( req.query ) !== "{}" ) {
        log( logType.INFO, JSON.stringify( req.query ) );
      }
      break;
    case "OPTIONS":
      if ( options.logOptionsRequests ) {
        log(
          logType.INFO,
          "core:request_options",
          `${ chalk.bgCyan( chalk.black( " OPT " ) ) } ${ res.statusCode } ${ req.path }`
        );
        if ( JSON.stringify( req.query ) !== "{}" ) {
          log( logType.INFO, JSON.stringify( req.query ) );
        }
      }
      break;
    default:
      log( logType.ERROR, "core:requests", `ERROR IN REQUEST LOGGER, UNKNOWN REQUEST TYPE: ${ req.method }` );
    }
    next();
  } );
  
  log( logType.SUCCESS, "core:requests", `Started the requests logger${ options && " (logging options requests is also enabled)" }` );
}
