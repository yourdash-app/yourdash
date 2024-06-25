/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { YourDashUserPermission } from "./userPermissions.js";

export default interface IYourDashUserDatabase {
  username: string;
  "core:user:name": {
    first: string;
    last: string;
  };
  bio?: string;
  url?: string;
  permissions: YourDashUserPermission[];
  version?: number;
}
