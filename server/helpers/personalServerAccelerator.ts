import { IYourDashSession, YourDashSessionType } from "../../shared/core/session.js"
import { activeSockets, io } from "./../index.js"

export function executeCommand( session: IYourDashSession<YourDashSessionType.desktop>, command: string ): Promise<any> {
  return new Promise( resolve => {
    const socket = io.to( activeSockets.get( session.sessionToken ) )
    socket.emit( "execute-command", command, data => {
      resolve( data )
    } )
  } )
}
