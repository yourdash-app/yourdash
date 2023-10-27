/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Application as ExpressApplication, Request as ExpressRequest } from "express";
import log, { logType } from "../helpers/log.js";
import YourDashUser from "./user/index.js";
import { WebsocketManager } from "./websocketManager.js";
import path from "path";
import http from "http";

export interface YourDashModuleArguments {
  moduleName: string,
  exp: ExpressApplication,
  httpServer: http.Server
}

export default class YourDashModule {
  private readonly websocketManager: WebsocketManager;
  private readonly expressApp: ExpressApplication;
  private readonly moduleName: string;
  // @ts-ignore
  protected API: {
    websocket: WebsocketManager,
    request: ExpressApplication,
    log( type: logType, ...message: any[] ): void, // eslint-disable-line @typescript-eslint/no-explicit-any
    getPath(): string,
    applicationName: string,
    moduleName: string,
    getUser( req: ExpressRequest ): YourDashUser
  } = {}
  
  constructor( args: YourDashModuleArguments ) {
    this.expressApp = args.exp;
    this.websocketManager = new WebsocketManager( args.httpServer );
    this.moduleName = args.moduleName;
    this.API = {
      websocket: this.websocketManager,
      request: this.expressApp,
      log( type: logType, ...message: any[] ) { // eslint-disable-line @typescript-eslint/no-explicit-any
        log( type, `app:${this.moduleName}`, ...message );
      },
      getPath() {
        return path.resolve( path.join( process.cwd(), "../applications", this.moduleName ) );
      },
      applicationName: args.moduleName,
      moduleName: args.moduleName,
      getUser( req: ExpressRequest ) {
        const username = req.headers.username as string;
        
        return new YourDashUser( username );
      }
    }
    
    return this;
  }
}
