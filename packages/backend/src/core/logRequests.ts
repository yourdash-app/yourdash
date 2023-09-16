/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import log, { LOG_TYPES } from "../helpers/log.js";
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
        LOG_TYPES.INFO,
        `${ chalk.bgGreen( chalk.black( " GET " ) ) } ${ res.statusCode } ${ req.path }`
      );
      if ( JSON.stringify( req.query ) !== "{}" ) {
        log( LOG_TYPES.INFO, JSON.stringify( req.query ) );
      }
      break;
    case "POST":
      log(
        LOG_TYPES.INFO,
        `${ chalk.bgBlue( chalk.black( " POS " ) ) } ${ res.statusCode } ${ req.path }`
      );
      if ( JSON.stringify( req.query ) !== "{}" ) {
        log( LOG_TYPES.INFO, JSON.stringify( req.query ) );
      }
      break;
    case "DELETE":
      log(
        LOG_TYPES.INFO,
        `${ chalk.bgRed( chalk.black( " DEL " ) ) } ${ res.statusCode } ${ req.path }`
      );
      if ( JSON.stringify( req.query ) !== "{}" ) {
        log( LOG_TYPES.INFO, JSON.stringify( req.query ) );
      }
      break;
    case "OPTIONS":
      if ( options.logOptionsRequests ) {
        log(
          LOG_TYPES.INFO,
          `${ chalk.bgCyan( chalk.black( " OPT " ) ) } ${ res.statusCode } ${ req.path }`
        );
        if ( JSON.stringify( req.query ) !== "{}" ) {
          log( LOG_TYPES.INFO, JSON.stringify( req.query ) );
        }
      }
      break;
    default:
      log( LOG_TYPES.ERROR, `ERROR IN REQUEST LOGGER, UNKNOWN REQUEST TYPE: ${ req.method }` );
    }
    next();
  } );
  
  log( LOG_TYPES.SUCCESS, `Started the requests logger${ options && " (logging options requests is also enabled)" }` );
}
