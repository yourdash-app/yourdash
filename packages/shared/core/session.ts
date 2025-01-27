/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export interface IYourDashSession<T extends YOURDASH_SESSION_TYPE = YOURDASH_SESSION_TYPE> {
  sessionId: number;
  type: T;
  sessionToken: string;
  isNodeJS?: boolean;
}

export enum YOURDASH_SESSION_TYPE {
  WEB,
  DESKTOP,
  CLI,
  UNKNOWN,
  NEXTCLOUD_COMPATABILITY,
}
