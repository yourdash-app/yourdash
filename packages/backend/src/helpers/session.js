import { promises as fs } from "fs";
import path from "path";
import { __internalGetSessionsDoNotUseOutsideOfCore, SESSION_TOKEN_LENGTH } from "../core/session.js";
import log, { logType } from "./log.js";
import { generateRandomStringOfLength } from "./encryption.js";
import YourDashUser from "../core/user/index.js";
export function getSessionsForUser(username) {
    return __internalGetSessionsDoNotUseOutsideOfCore()[username];
}
export function getSessionId(username, sessionToken) {
    return __internalGetSessionsDoNotUseOutsideOfCore()[username].find(session => session.sessionToken === sessionToken)?.id || null;
}
export async function createSession(username, type) {
    const sessionToken = generateRandomStringOfLength(SESSION_TOKEN_LENGTH);
    const user = new YourDashUser(username);
    try {
        __internalGetSessionsDoNotUseOutsideOfCore()[username] =
            JSON.parse((await fs.readFile(path.join(user.path, "core/sessions.json"))).toString());
    }
    catch (_err) { }
    const newSessionId = getSessionsForUser(username) ? getSessionsForUser(username).length + 1 : 1;
    const session = {
        type,
        id: newSessionId,
        sessionToken
    };
    if (__internalGetSessionsDoNotUseOutsideOfCore()[username]) {
        __internalGetSessionsDoNotUseOutsideOfCore()[username].push(session);
    }
    else {
        __internalGetSessionsDoNotUseOutsideOfCore()[username] = [session];
    }
    try {
        await fs.writeFile(path.join(user.path, "core/sessions.json"), JSON.stringify(__internalGetSessionsDoNotUseOutsideOfCore()[username]));
    }
    catch (__e) {
        log(logType.ERROR, `Unable to write ${username}/core/sessions.json`);
        return session;
    }
    return session;
}
export default class YourDashSession {
    id;
    type;
    sessionToken;
    username;
    constructor(username, session) {
        if (!session) {
            throw new Error("An invalid session was provided to YourDashSession");
        }
        this.id = session.id;
        this.type = session.type;
        this.sessionToken = session.sessionToken;
        this.username = username;
    }
    isOnline() {
        return false;
    }
    invalidate() {
        __internalGetSessionsDoNotUseOutsideOfCore()[this.username].splice(__internalGetSessionsDoNotUseOutsideOfCore()[this.username].findIndex(val => val.id === this.id), 1);
        const user = new YourDashUser(this.username);
        try {
            fs.writeFile(path.join(user.path, "core/sessions.json"), JSON.stringify(__internalGetSessionsDoNotUseOutsideOfCore()[this.username]));
        }
        catch (_err) {
            return;
        }
    }
}
//# sourceMappingURL=session.js.map