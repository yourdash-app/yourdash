/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { type IYourDashSession } from "shared/core/session.js";

const Session: {
  [ key: string ]: IYourDashSession<any>[]
} = {};

function __internalGetSessionsDoNotUseOutsideOfCore() {
  return Session;
}

const SESSION_TOKEN_LENGTH = 128;

export { SESSION_TOKEN_LENGTH, __internalGetSessionsDoNotUseOutsideOfCore };
