/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { type IYourDashSession } from "shared/core/session.js";

const SESSIONS: {
  [ key: string ]: IYourDashSession<any>[]
} = {};

function __internalGetSessionsDoNotUseOutsideOfCore() {
  return SESSIONS;
}

const SESSION_TOKEN_LENGTH = 128;

export { SESSION_TOKEN_LENGTH, __internalGetSessionsDoNotUseOutsideOfCore };
