/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import YourDashPanel from "@yourdash/backend/src/core/helpers/panel.js";
import BackendModule, { YourDashModuleArguments } from "@yourdash/backend/src/core/moduleManager/backendModule.js";
import { promises as fs } from "fs";
import core from "@yourdash/backend/src/core/core.js";
import path from "path";

export default class SettingsModule extends BackendModule {
  constructor(args: YourDashModuleArguments) {
    super(args);
  }

  public loadEndpoints() {
    super.loadEndpoints();
    this.api.request.post("/app/settings/core/panel/position", async (req, res) => {
      const { username } = req.headers as {
        username: string;
      };
      const { position } = req.body;

      const panel = new YourDashPanel(username);

      await panel.setPanelPosition(position);

      return res.json({
        success: true,
      });
    });

    this.api.request.post("/app/settings/core/panel/quick-shortcuts", async (req, res) => {
      const { username } = req.headers as {
        username: string;
      };
      const { launcher } = req.body;

      const panel = new YourDashPanel(username);

      await panel.setLauncherType(launcher);

      return res.json({ success: true });
    });

    this.api.request.get("/app/settings/developer/install-all-applications", async (req, res) => {
      const installableApplications = (await fs.readdir("../../applications")).filter((appName) => {
        switch (appName) {
          case "package.json":
          case "node_modules":
          case "gulpfile.js":
          case "README.md":
            return false;
          default:
            return true;
        }
      });

      installableApplications.map(async (app) => {
        if (core.globalDb.get("core:installedApplications").includes(app)) return;

        core.globalDb.set("core:installedApplications", [...core.globalDb.get("core:installedApplications"), app]);
        await core.moduleManager.loadModule(app, path.join(process.cwd(), `../../applications/${app}/backend/`));
      });

      return res.json({ success: true });
    });
  }
}
