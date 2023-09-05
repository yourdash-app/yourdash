import { Socket as SocketIoSocket } from "socket.io";

import { IYourDashSession, YourDashSessionType } from "../../../shared/core/session.js";
import { ACTIVE_SOCKET_IO_SOCKETS, socketIo } from "../main.js";

import log from "./log.js";

export function executeCommand(
  username: string,
  session: IYourDashSession<YourDashSessionType.desktop>,
  command: string
): Promise<any> {
  return new Promise( resolve => {
    const socket = getSocketFromSession( username, session );
    socket.emit( "execute-command", command, data => {
      resolve( data );
    } );
  } );
}

export function getSocketFromSession(
  username: string,
  session: IYourDashSession<YourDashSessionType.desktop>
): SocketIoSocket | undefined {
  if ( !session || !username ) {
    return undefined;
  }

  const connection = ACTIVE_SOCKET_IO_SOCKETS[username]?.find( sock => sock.id === session.id.toString() ) || undefined;

  if ( !connection ) {
    return undefined;
  }

  return ACTIVE_SOCKET_IO_SOCKETS[username]?.find( sock => sock.id === session.id.toString() )?.socket || undefined;
}

export class PersonalServerAcceleratorCommunication {
  socketConnection: SocketIoSocket;

  constructor( username: string, session: IYourDashSession<YourDashSessionType.desktop> ) {
    if ( !session ) {
      return undefined;
    }

    this.socketConnection = getSocketFromSession( username, session );

    return this;
  }

  listenFor( path: string, callBack: ( data: any ) => void ) {
    this.socketConnection.on( path, callBack );
  }

  emit( path: string, data: any ) {
    this.socketConnection.emit( path, data );
  }
}
