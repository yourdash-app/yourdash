/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export enum YOURDASH_USER_PERMISSIONS {
  WriteFiles,
  ReadFiles,
  DeleteFiles,
  Administrator
}

type yourDashUserPermission = YOURDASH_USER_PERMISSIONS | string;

export type { yourDashUserPermission }
