/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import chalk from "chalk";
import { Application as ExpressApplication } from "express";
import coreApi from "./core/coreApi.js";

export default function startRequestLogger( app: ExpressApplication, options: {
  logOptionsRequests?: boolean
} ) {
  app.use( ( req, res, next ) => {
    switch ( req.method ) {
    case "GET":
      coreApi.log.info( "core:request_get", `${ chalk.bgGreen( chalk.black( " GET " ) ) } ${ res.statusCode } ${ req.path }` );
      if ( JSON.stringify( req.query ) !== "{}" ) {
        coreApi.log.info( JSON.stringify( req.query ) );
      }
      break;
    case "POST":
      coreApi.log.info( "core:request_post", `${ chalk.bgBlue( chalk.black( " POS " ) ) } ${ res.statusCode } ${ req.path }` );
      if ( JSON.stringify( req.query ) !== "{}" ) {
        coreApi.log.info( JSON.stringify( req.query ) );
      }
      break;
    case "DELETE":
      coreApi.log.info( "core:request_delete", `${ chalk.bgRed( chalk.black( " DEL " ) ) } ${ res.statusCode } ${ req.path }` );
      if ( JSON.stringify( req.query ) !== "{}" ) {
        coreApi.log.info( JSON.stringify( req.query ) );
      }
      break;
    case "OPTIONS":
      if ( options.logOptionsRequests ) {
        coreApi.log.info( "core:request_options", `${ chalk.bgCyan( chalk.black( " OPT " ) ) } ${ res.statusCode } ${ req.path }` );
        if ( JSON.stringify( req.query ) !== "{}" ) {
          coreApi.log.info( JSON.stringify( req.query ) );
        }
      }
      break;
    default:
      coreApi.log.error( "core:requests", `ERROR IN REQUEST LOGGER, UNKNOWN REQUEST TYPE: ${ req.method }` );
    }
    next();
  } );
  
  coreApi.log.success( "core:requests", `Started the requests logger${ options && " (logging options requests is also enabled)" }` );
}
