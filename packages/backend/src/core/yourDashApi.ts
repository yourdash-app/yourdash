/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Server as SocketIOServer } from "socket.io";
import { Application as ExpressApplication } from "express";
import log, { LOG_TYPES } from "../helpers/log.js";
import * as http from "http";

class YourDashWebsocketManager {
  servers: {
    [ app: string ]: {
      server: SocketIOServer,
      connections: {
        [ socket: string ]: string[],
      }[]
    }
  };
  
  httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
  
  constructor( app: ExpressApplication, httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> ) {
    this.servers = {};
    this.httpServer = httpServer;
  }
  
  _selfDestruct() {
    Object.keys( this.servers ).map( async appName => {
      if ( ( await this.servers[appName].server.fetchSockets() ).length === 0 ) {
        this.servers[appName].server.close();
        delete this.servers[appName];
        log( LOG_TYPES.INFO, `[YourDashWebsocketManager] ${ appName } was closed as it has no clients connected.` );
      } else {
        log( LOG_TYPES.INFO, `[YourDashWebsocketManager] ${ appName } is connected with ${ Object.keys( this.servers[appName].server.fetchSockets() ).length } clients.` );
      }
    } );
  }
  
  createServer( appName: string ) {
    const server = new SocketIOServer(
      this.httpServer,
      {
        path: `/core/app/${ appName }/`,
        cors: { origin: "*" }
      }
    );
    
    this.servers[appName] = {
      server,
      connections: []
    };
    
    log( LOG_TYPES.INFO, `[YourDashWebsocketManager] ${ appName } was created.` );
    
    return server;
  }
  
  getServer( appName: string ) {
    return this.servers[appName];
  }
  
  closeServer( appName: string ) {
    this.servers[appName].server.close();
  }
}

export default class YourDashApi {
  websocket: YourDashWebsocketManager;
  
  constructor( app: ExpressApplication, httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> ) {
    this.websocket = new YourDashWebsocketManager( app, httpServer );
    return this;
  }
}
