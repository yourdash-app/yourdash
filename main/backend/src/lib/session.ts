/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { promises as fs } from "fs";
import path from "path";
import core from "../core/core.js";
import { YOURDASH_USER_SESSION_TOKEN_LENGTH } from "../core/coreUsers.js";
import YourDashUser from "../core/user/index.js";
import { IYourDashSession, YOURDASH_SESSION_TYPE } from "@yourdash/shared/core/session.js";
import { generateRandomStringOfLength } from "./encryption.js";

export function getSessionsForUser(username: string): IYourDashSession[] {
  // eslint-disable-line @typescript-eslint/no-explicit-any
  return core.users.__internal__getSessionsDoNotUseOutsideOfCore()[username];
}

export function getSessionId(username: string, sessionToken: string): number | null {
  return (
    core.users
      .__internal__getSessionsDoNotUseOutsideOfCore()
      [username].find((session) => session.sessionToken === sessionToken)?.sessionId || null
  );
}

export async function createSession<T extends YOURDASH_SESSION_TYPE>(
  username: string,
  type: T,
): Promise<IYourDashSession<T>> {
  const sessionToken = generateRandomStringOfLength(YOURDASH_USER_SESSION_TOKEN_LENGTH);

  const user = new YourDashUser(username);

  try {
    core.users.__internal__getSessionsDoNotUseOutsideOfCore()[username] = JSON.parse(
      (await fs.readFile(path.join(user.path, "core/sessions.json"))).toString(),
    );
  } catch (_err) {
    /* empty */
  }

  const newSessionId = getSessionsForUser(username) ? getSessionsForUser(username).length + 1 : 1;

  const session: IYourDashSession<T> = {
    type,
    sessionId: newSessionId,
    sessionToken,
  };

  if (core.users.__internal__getSessionsDoNotUseOutsideOfCore()[username]) {
    core.users.__internal__getSessionsDoNotUseOutsideOfCore()[username].push(session);
  } else {
    core.users.__internal__getSessionsDoNotUseOutsideOfCore()[username] = [session];
  }

  try {
    await fs.writeFile(
      path.join(user.path, "core/sessions.json"),
      JSON.stringify(core.users.__internal__getSessionsDoNotUseOutsideOfCore()[username]),
    );
  } catch (__e) {
    core.log.error(`Unable to write ${username}/core/sessions.json`);

    return session;
  }

  return session;
}

export default class YourDashSession<T extends YOURDASH_SESSION_TYPE> {
  sessionId: number;
  type: T;
  sessionToken: string;
  username: string;

  constructor(username: string, session: IYourDashSession<T>) {
    if (!session) {
      throw new Error("An invalid session was provided to YourDashSession");
    }

    this.sessionId = session.sessionId;
    this.type = session.type;
    this.sessionToken = session.sessionToken;
    this.username = username;
  }

  isOnline(): boolean {
    return false;
  }

  async invalidate() {
    core.users.__internal__getSessionsDoNotUseOutsideOfCore()[this.username].splice(
      core.users
        .__internal__getSessionsDoNotUseOutsideOfCore()
        [this.username].findIndex((val) => val.sessionId === this.sessionId),
      1,
    );

    const user = new YourDashUser(this.username);
    try {
      await fs.writeFile(
        path.join(user.path, "core/sessions.json"),
        JSON.stringify(core.users.__internal__getSessionsDoNotUseOutsideOfCore()[this.username]),
      );
    } catch (_err) {
      return;
    }
  }
}
