import { __internalGetSessions, SESSION_TOKEN_LENGTH } from "../index.js"
import { YourDashSessionType, YourDashSession } from "../../shared/core/session.js"
import { generateRandomStringOfLength } from "./encryption.js"

export function getSessionsForUser( username: string ) {
  return __internalGetSessions()[username]
}

export function getSessionId( username: string, sessionToken: string ): number | null {
  return __internalGetSessions()[username].find( session => session.sessionToken === sessionToken )?.id || null
}

export function createSession( username: string, type: YourDashSessionType ): YourDashSession {
  const sessionToken = generateRandomStringOfLength( SESSION_TOKEN_LENGTH )

  const newSessionId = __internalGetSessions()[username] ? __internalGetSessions()[username].length + 1 : 0

  const session = {
    type,
    id: newSessionId,
    sessionToken
  }

  __internalGetSessions()[username] ? __internalGetSessions()[username].push( session ) : __internalGetSessions()[username] = [session]

  return session
}
