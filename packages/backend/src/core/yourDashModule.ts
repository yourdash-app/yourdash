/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Application as ExpressApplication } from "express";
import log, { logType } from "../helpers/log.js";
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
  
  constructor( args: YourDashModuleArguments ) {
    this.expressApp = args.exp;
    this.websocketManager = new WebsocketManager( args.httpServer );
    this.moduleName = args.moduleName;
    
    return this;
  }
  
  protected API() {
    return {
      websocket: this.websocketManager,
      request: this.expressApp,
      log( type: logType, ...message: any[] ) {
        log( type, [ `[${ this.moduleName }]`, ...message ] );
      },
      getPath() {
        return path.resolve( path.join( process.cwd(), "../applications", this.moduleName ) );
      }
    }
  }
}
