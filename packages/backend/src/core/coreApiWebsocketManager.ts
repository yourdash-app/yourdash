/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Server as SocketIOServer } from "socket.io"
import { CoreApi } from "./coreApi.js";

export default class CoreApiWebsocketManager {
  coreApi: CoreApi;
  servers: {
    [ path: string ]: {
      server: SocketIOServer,
      connections: {
        [ socket: string ]: string[],
      }[]
    }
  };

  constructor( coreApi: CoreApi ) {
    this.servers = {};
    this.coreApi = coreApi
  }

  _selfDestruct() {
    Object.keys( this.servers ).map( async path => {
      if ( ( await this.servers[ path ].server.fetchSockets() ).length === 0 ) {
        this.servers[ path ].server.close();
        delete this.servers[ path ];
        this.coreApi.log.info( "websocket_manager", `${ path } was closed as it has no clients connected.` );
      } else {
        this.coreApi.log.info( "websocket_manager", `${ path } is connected with ${ Object.keys( this.servers[ path ].server.fetchSockets() ).length } clients.` );
      }
    } );
  }

  createServer( path: string ) {
    const server = new SocketIOServer(
      this.coreApi.httpServer,
      {
        path: `${ path }/websocket-manager/websocket`,
        cors: { origin: "*" }
      }
    );

    this.servers[ path ] = {
      server,
      connections: []
    };

    this.coreApi.log.info( "websocket_manager", `${ path } was created.` );

    return server;
  }

  getServer( appName: string ) {
    return this.servers[ appName ];
  }

  closeServer( appName: string ) {
    this.servers[ appName ].server.close();
  }
}
