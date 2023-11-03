/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { promises as fs } from "fs";
import path from "path";
import { type IYourDashSession, YOURDASH_SESSION_TYPE } from "shared/core/session.js";
import coreApi from "../core/core/coreApi.js";
import YourDashUser from "../core/core/user/index.js";
import { __internalGetSessionsDoNotUseOutsideOfCore, SESSION_TOKEN_LENGTH } from "../core/session.js";
import { generateRandomStringOfLength } from "./encryption.js";

export function getSessionsForUser( username: string ): IYourDashSession<any>[] { // eslint-disable-line @typescript-eslint/no-explicit-any
  return __internalGetSessionsDoNotUseOutsideOfCore()[username];
}

export function getSessionId( username: string, sessionToken: string ): number | null {
  return __internalGetSessionsDoNotUseOutsideOfCore()[username].find( session => session.sessionToken === sessionToken )?.id || null;
}

export async function createSession<T extends YOURDASH_SESSION_TYPE>(
  username: string,
  type: T
): Promise<IYourDashSession<T>> {
  const sessionToken = generateRandomStringOfLength( SESSION_TOKEN_LENGTH );

  const user = new YourDashUser( username );

  try {
    __internalGetSessionsDoNotUseOutsideOfCore()[username] =
      JSON.parse( ( await fs.readFile( path.join( user.path, "core/sessions.json" ) ) ).toString() );
  } catch ( _err ) { /* empty */ }

  const newSessionId = getSessionsForUser( username ) ? getSessionsForUser( username ).length + 1 : 1;

  const session: IYourDashSession<T> = {
    type,
    id: newSessionId,
    sessionToken
  };

  if ( __internalGetSessionsDoNotUseOutsideOfCore()[username] ) {
    __internalGetSessionsDoNotUseOutsideOfCore()[username].push( session );
  } else {
    __internalGetSessionsDoNotUseOutsideOfCore()[username] = [session];
  }

  try {
    await fs.writeFile(
      path.join( user.path, "core/sessions.json" ),
      JSON.stringify( __internalGetSessionsDoNotUseOutsideOfCore()[username] )
    );
  } catch ( __e ) {
    coreApi.log.error( `Unable to write ${ username }/core/sessions.json` );

    return session;
  }

  return session;
}

export default class YourDashSession<T extends YOURDASH_SESSION_TYPE> {
  id: number;
  type: T;
  sessionToken: string;
  username: string;

  constructor( username: string, session: IYourDashSession<T> ) {
    if ( !session ) {
      throw new Error( "An invalid session was provided to YourDashSession" );
    }

    this.id = session.id;
    this.type = session.type;
    this.sessionToken = session.sessionToken;
    this.username = username;
  }

  isOnline(): boolean {
    return false;
  }

  async invalidate() {
    __internalGetSessionsDoNotUseOutsideOfCore()[this.username].splice(
      __internalGetSessionsDoNotUseOutsideOfCore()[this.username].findIndex( val => val.id === this.id ),
      1
    );

    const user = new YourDashUser( this.username );
    try {
      await fs.writeFile(
        path.join( user.path, "core/sessions.json" ),
        JSON.stringify( __internalGetSessionsDoNotUseOutsideOfCore()[this.username] )
      );
    } catch ( _err ) {
      return;
    }
  }
}
