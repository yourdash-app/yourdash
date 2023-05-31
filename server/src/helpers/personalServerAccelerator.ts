import { IYourDashSession, YourDashSessionType } from "../../../shared/core/session.js"
import { activeSockets, io } from "../main.js"

export function executeCommand( session: IYourDashSession<YourDashSessionType.desktop>, command: string ): Promise<any> {
  return new Promise( resolve => {
    const socket = io.to( activeSockets.get( { id: session.id.toString(), token: session.sessionToken } ) )
    socket.emit( "execute-command", command, data => {
      resolve( data )
    } )
  } )
}

export function getSocketFromSession( session: IYourDashSession<YourDashSessionType.desktop> ) {
  return io.to( activeSockets.get( { id: session.id.toString(), token: session.sessionToken } ) )
}
