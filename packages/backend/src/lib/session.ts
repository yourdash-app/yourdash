/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import path from "path";
import core from "../core/core.js";
import { YOURDASH_USER_SESSION_TOKEN_LENGTH } from "../core/coreUsers.js";
import FSError from "../core/fileSystem/FSError.js";
import YourDashUser from "../core/user/index.js";
import { IYourDashSession, YOURDASH_SESSION_TYPE } from "@yourdash/shared/core/session.js";
import { generateRandomStringOfLength } from "./encryption.js";

export function getSessionsForUser(username: string): IYourDashSession[] {
  // eslint-disable-line @typescript-eslint/no-explicit-any
  return core.users.__internal__getSessionsDoNotUseOutsideOfCore()[username];
}

export function getSessionId(username: string, sessionToken: string): number | null {
  return (
    core.users.__internal__getSessionsDoNotUseOutsideOfCore()[username].find((session) => session.sessionToken === sessionToken)
      ?.sessionId || null
  );
}

export async function loadSessionsForUser(username: string) {
  const user = new YourDashUser(username);

  try {
    console.log(`loading user sessions from ${path.join(user.path, "core/sessions.json")}`);

    const sessionsFile = await core.fs.getFile(path.join(user.path, "core/sessions.json"));

    if (sessionsFile instanceof FSError) {
      return;
    }

    core.users.__internal__getSessionsDoNotUseOutsideOfCore()[username] = (await sessionsFile.read("json")) as [];
  } catch (err) {
    core.log.error("create_session", `unable to read /users/${username}/core/sessions.json`, err);
  }
}

export async function createSession<T extends YOURDASH_SESSION_TYPE>(
  username: string,
  type: T,
  useToken?: string,
): Promise<IYourDashSession<T>> {
  const sessionToken = useToken || generateRandomStringOfLength(YOURDASH_USER_SESSION_TOKEN_LENGTH);

  const user = new YourDashUser(username);

  await loadSessionsForUser(username);

  const newSessionId = getSessionsForUser(username) ? getSessionsForUser(username).length + 1 : 1;

  const session: IYourDashSession<T> = {
    type: type,
    sessionId: newSessionId,
    sessionToken: sessionToken,
  };

  if (core.users.__internal__getSessionsDoNotUseOutsideOfCore()[username]) {
    core.users.__internal__getSessionsDoNotUseOutsideOfCore()[username].push(session);
  } else {
    core.users.__internal__getSessionsDoNotUseOutsideOfCore()[username] = [session];
  }

  try {
    await (
      await core.fs.getFile(path.join(user.path, "core/sessions.json"))
    ).write(JSON.stringify(core.users.__internal__getSessionsDoNotUseOutsideOfCore()[username]));
  } catch (__e) {
    core.log.error("session_manager", `Unable to write /users/${username}/core/sessions.json`);

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

  // TODO: implement online validation
  isOnline(): boolean {
    return false;
  }

  async invalidate() {
    core.users.__internal__getSessionsDoNotUseOutsideOfCore()[this.username].splice(
      core.users.__internal__getSessionsDoNotUseOutsideOfCore()[this.username].findIndex((val) => val.sessionId === this.sessionId),
      1,
    );

    const user = new YourDashUser(this.username);
    try {
      await (
        await core.fs.getFile(path.join(user.path, "core/sessions.json"))
      ).write(JSON.stringify(core.users.__internal__getSessionsDoNotUseOutsideOfCore()[this.username]));
    } catch (_err) {
      return;
    }
  }
}
