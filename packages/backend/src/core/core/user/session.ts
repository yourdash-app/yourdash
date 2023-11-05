/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export interface IYourDashSession<T extends YOURDASH_SESSION_TYPE> {
  id: number,
  type: T,
  sessionToken: string
}

export enum YOURDASH_SESSION_TYPE {
  web,
  desktop,
  cli,
  external
}
