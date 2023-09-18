import { promises as fs } from "fs";
import path from "path";
import { __internalGetSessionsDoNotUseOutsideOfCore, SESSION_TOKEN_LENGTH } from "../core/sessions.js";
import { YourDashSessionType, type IYourDashSession } from "../../../shared/core/session.js";
import log, { logTypes } from "./log.js";
import { generateRandomStringOfLength } from "./encryption.js";
import YourDashUnreadUser from "./user.js";


export function getSessionsForUser(username: string): IYourDashSession<any>[] {
  return __internalGetSessionsDoNotUseOutsideOfCore()[username];
}

export function getSessionId(username: string, sessionToken: string): number | null {
  return __internalGetSessionsDoNotUseOutsideOfCore()[username].find(session => session.sessionToken === sessionToken)?.id || null;
}

export async function createSession<T extends YourDashSessionType>(
  username: string,
  type: T
): Promise<IYourDashSession<T>> {
  const sessionToken = generateRandomStringOfLength(SESSION_TOKEN_LENGTH);

  const user = new YourDashUnreadUser(username);

  try {
    __internalGetSessionsDoNotUseOutsideOfCore()[username] = JSON.parse((await fs.readFile(path.resolve(
      user.getPath(),
      "./sessions.json"
    ))).toString());
  } catch (_err) { /* empty */ }

  const newSessionId = getSessionsForUser(username) ? getSessionsForUser(username).length + 1 : 1;

  const session: IYourDashSession<T> = {
    type,
    id: newSessionId,
    sessionToken
  };

  if (__internalGetSessionsDoNotUseOutsideOfCore()[username]) {
    __internalGetSessionsDoNotUseOutsideOfCore()[username].push(session);
  } else {
    __internalGetSessionsDoNotUseOutsideOfCore()[username] = [session];
  }

  try {
    await fs.writeFile(
      path.resolve(user.getPath(), "./sessions.json"),
      JSON.stringify(__internalGetSessionsDoNotUseOutsideOfCore()[username])
    );
  } catch (__e) {
    log(logTypes.error, `Unable to write ${ username }/sessions.json`);

    return session;
  }

  return session;
}

export default class YourDashSession<T extends YourDashSessionType> {
  id: number;
  type: T;
  sessionToken: string;
  username: string;

  constructor(username: string, session: IYourDashSession<T>) {
    if (!session) {
      throw new Error("An invalid session was provided to YourDashSession");
    }

    this.id = session.id;
    this.type = session.type;
    this.sessionToken = session.sessionToken;
    this.username = username;
  }

  isOnline(): boolean {
    return false;
  }

  invalidate() {
    __internalGetSessionsDoNotUseOutsideOfCore()[this.username].splice(
      __internalGetSessionsDoNotUseOutsideOfCore()[this.username].findIndex(val => val.id === this.id),
      1
    );

    const user = new YourDashUnreadUser(this.username);
    try {
      fs.writeFile(
        path.resolve(user.getPath(), "./sessions.json"),
        JSON.stringify(__internalGetSessionsDoNotUseOutsideOfCore()[this.username])
      );
    } catch (_err) {
      return;
    }
  }
}
