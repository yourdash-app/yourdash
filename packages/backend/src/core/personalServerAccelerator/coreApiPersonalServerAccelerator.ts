/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import * as socketIo from "socket.io";
import YourDashSession from "../../helpers/session.js";
import { CoreApi } from "../coreApi.js";
import { YOURDASH_SESSION_TYPE } from "../../../../shared/core/session.js";
import PersonalServerAcceleratorConnection from "./personalServerAcceleratorConnection.js";

export default class CoreApiPersonalServerAccelerator {
  private readonly coreApi: CoreApi
  private openSocketConnections: Map<`${string}-${number | string}` /* `[username]-[sessionId]` */, PersonalServerAcceleratorConnection> = new Map();
  readonly socketIoServer: socketIo.Server;

  constructor( coreApi: CoreApi ) {
    this.coreApi = coreApi;

    this.socketIoServer = new socketIo.Server( this.coreApi.httpServer );

    this.socketIoServer.on( "connection", ( socket: socketIo.Socket<any, any, any> ) => { // eslint-disable-line @typescript-eslint/no-explicit-any

      const handshakeUsername = socket.handshake.query.username as string;

      // Check that all required parameters are present
      if ( !handshakeUsername || !socket.handshake.query.sessionToken || !socket.handshake.query.sessionId ) {
        this.coreApi.log.error( "core:psa-backend", "Closing connection! Missing required parameters!" );

        socket.disconnect( true );
        return;
      }

      const session = this.coreApi.users.get( handshakeUsername ).getLoginSessionByToken( socket.handshake.query.sessionToken as string );

      if ( session.type !== YOURDASH_SESSION_TYPE.desktop )
        return socket.disconnect( true )

      // Add a new socket to the activeSockets
      this.openSocketConnections.set(
        `${handshakeUsername}-${socket.handshake.query.sessionId }`,
        new PersonalServerAcceleratorConnection(
          handshakeUsername,
          session as YourDashSession<YOURDASH_SESSION_TYPE.desktop>,
          socket,
          this
        )
      )

      socket.on( "execute-command-response", ( output: never ) => {
        this.coreApi.log.info( output );
      } );

      socket.on( "disconnect", () => {
        this.__internal__removeSocketConnection( this.openSocketConnections.get( `${handshakeUsername}-${socket.handshake.query.sessionId }` ) );

        this.coreApi.log.info( "[PSA-BACKEND]: Closing PSA connection" );
      } );

      return;
    } );

    // handle socket.io session authentication
    this.socketIoServer.use( async ( socket: socketIo.Socket, next ) => {
      const {
        username,
        sessionToken
      } = socket.handshake.query as { username?: string, sessionToken?: string };

      if ( !username || !sessionToken ) {
        return socket.disconnect();
      }

      if ( !coreApi.users.__internal__getSessionsDoNotUseOutsideOfCore()[ username ] ) {
        try {
          const user = this.coreApi.users.get( username );
          coreApi.users.__internal__getSessionsDoNotUseOutsideOfCore()[ username ] = ( await user.getAllLoginSessions() ) || [];
        } catch ( _err ) {
          return socket.disconnect();
        }
      }

      if ( coreApi.users.__internal__getSessionsDoNotUseOutsideOfCore()[ username ].find( ( session ) => session.sessionToken === sessionToken ) ) {
        return next();
      }

      return socket.disconnect();
    } );

    return this
  }

  __internal__removeSocketConnection( connection: PersonalServerAcceleratorConnection ) {
    this.openSocketConnections.delete( `${connection.username}-${connection.session.id}` );
  }

  getSocketConnection( username: string, sessionId: string ): PersonalServerAcceleratorConnection | undefined {
    return this.openSocketConnections.get( `${username}-${sessionId}` );
  }

  getAllSocketConnectionsForUser( username: string ) {
    return Array.from( this.openSocketConnections.values() ).filter( connection => connection.username === username );
  }
}
