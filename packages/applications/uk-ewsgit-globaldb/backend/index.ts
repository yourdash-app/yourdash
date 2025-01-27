/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import YourDashUser from "@yourdash/backend/src/core/user/index.js";
import { YOURDASH_USER_PERMISSIONS } from "@yourdash/backend/src/core/user/userPermissions.js";
import path from "path";
import BackendModule, { YourDashModuleArguments } from "@yourdash/backend/src/core/moduleManager/backendModule.js";
import core from "@yourdash/backend/src/core/core.js";

export default class GlobalDbModule extends BackendModule {
  constructor(args: YourDashModuleArguments) {
    super(args);
  }

  public loadEndpoints() {
    super.loadEndpoints();

    this.api.request.get("/app/global_db/db", async (req, res) => {
      const { username } = req.headers as {
        username: string;
      };

      const user = new YourDashUser(username);

      if (await user.hasPermission(YOURDASH_USER_PERMISSIONS.Administrator)) {
        return res.json({
          db: core.globalDb.keys,
        });
      }

      return res.json({
        error: true,
      });
    });

    this.api.request.post("/app/global_db/db", async (req, res) => {
      const { username } = req.headers as {
        username: string;
      };

      const keys = req.body;

      const user = new YourDashUser(username);

      if (await user.hasPermission(YOURDASH_USER_PERMISSIONS.Administrator)) {
        core.globalDb.merge(keys);

        return res.json({
          success: true,
        });
      }

      return res.json({ error: true });
    });

    this.api.request.post("/app/global_db/db/force-write", async (req, res) => {
      const { username } = req.headers as {
        username: string;
      };

      const keys = req.body;

      const user = new YourDashUser(username);

      if (await user.hasPermission(YOURDASH_USER_PERMISSIONS.Administrator)) {
        core.globalDb.merge(keys);
        await core.globalDb.writeToDisk(path.join(core.fs.ROOT_PATH, "./globalDatabase.json"));

        return res.json({
          success: true,
        });
      }

      return res.json({ error: true });
    });
  }
}
