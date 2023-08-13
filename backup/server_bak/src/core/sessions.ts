import { type IYourDashSession } from "../../../shared/core/session.js";

const SESSIONS: {
  [ key: string ]: IYourDashSession<any>[]
} = {};

function __internalGetSessionsDoNotUseOutsideOfCore() {
  return SESSIONS;
}

const SESSION_TOKEN_LENGTH = 128;

export { SESSION_TOKEN_LENGTH, __internalGetSessionsDoNotUseOutsideOfCore };
