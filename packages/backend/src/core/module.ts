/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Application as ExpressApplication, Request as ExpressRequest } from "express";
import http from "http";
import path from "path";
import coreApi, { CoreApi } from "./core/coreApi.js";
import { LOG_TYPE } from "./core/coreApiLog.js";
import YourDashUser from "./core/user/index.js";
import { WebsocketManager } from "./websocketManager.js";

export interface YourDashModuleArguments {
  moduleName: string,
  exp: ExpressApplication,
  httpServer: http.Server,
  coreApi: CoreApi
}

export default class Module {
  private readonly websocketManager: WebsocketManager;
  private readonly expressApp: ExpressApplication;
  private readonly moduleName: string;
  protected API: {
    websocket: WebsocketManager,
    request: ExpressApplication,
    log( type: LOG_TYPE, ...message: any[] ): void, // eslint-disable-line @typescript-eslint/no-explicit-any
    getPath(): string,
    applicationName: string,
    moduleName: string,
    getUser( req: ExpressRequest ): YourDashUser,
    core: CoreApi
  };
  
  constructor( args: YourDashModuleArguments ) {
    this.expressApp = args.exp;
    this.websocketManager = new WebsocketManager( args.httpServer );
    this.moduleName = args.moduleName;
    this.API = {
      websocket: this.websocketManager,
      request: this.expressApp,
      log( type: LOG_TYPE, ...message: any[] ) { // eslint-disable-line @typescript-eslint/no-explicit-any
        switch( type ) {
        case LOG_TYPE.INFO:
          coreApi.log.info( `app:${this.moduleName}`, ...message );
          return;
        case LOG_TYPE.ERROR:
          coreApi.log.error( `app:${this.moduleName}`, ...message );
          return;
        case LOG_TYPE.SUCCESS:
          coreApi.log.success( `app:${this.moduleName}`, ...message );
          return;
        case LOG_TYPE.WARNING:
          coreApi.log.warning( `app:${this.moduleName}`, ...message );
          return;
        default:
          coreApi.log.info( `app:${this.moduleName}`, ...message );
        }
      },
      getPath() {
        return path.resolve( path.join( process.cwd(), "../applications", this.moduleName ) );
      },
      applicationName: args.moduleName,
      moduleName: args.moduleName,
      getUser( req: ExpressRequest ) {
        const username = req.headers.username as string;
        
        return new YourDashUser( username );
      },
      core: args.coreApi
    }
    
    return this;
  }
}
