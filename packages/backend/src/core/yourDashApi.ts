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
