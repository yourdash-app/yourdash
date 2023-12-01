/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { yourDashUserPermission } from "./permissions.js";

export default interface IYourDashUserJson {
  username: string,
  "core:user:name": {
    first: string,
    last: string
  },
  bio?: string,
  url?: string,
  permissions: yourDashUserPermission[],
  version?: number
}
