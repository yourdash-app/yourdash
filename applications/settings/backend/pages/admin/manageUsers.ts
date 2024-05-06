/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import BackendModule from "@yourdash/backend/src/core/moduleManager/backendModule.js";
import core from "@yourdash/backend/src/core/core.js";
import { YOURDASH_USER_PERMISSIONS } from "@yourdash/backend/src/core/user/userPermissions.js";

export default function manageUsers(api: BackendModule["api"]) {
  api.request.usePath(`/app/${api.applicationName}/admin/manage-users`, async (req, res, next) => {
    const user = api.getUser(req);

    if (await user.hasPermission(YOURDASH_USER_PERMISSIONS.Administrator)) {
      return next();
    }

    return res.json({
      error: true,
      message: "Unauthorized request",
    });
  });

  api.request.post(`/app/${api.applicationName}/admin/manage-users/users`, async (req, res) => {
    return res.json({
      users: await core.users.getAllUsers(),
    });
  });
}
