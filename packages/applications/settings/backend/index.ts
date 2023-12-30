/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import YourDashPanel from "backend/src/core/helpers/panel.js";
import BackendModule, { YourDashModuleArguments } from "backend/src/core/moduleManager/backendModule.js";
import { promises as fs } from "fs";
import coreApi from "backend/src/core/coreApi.js"
import path from "path"

export default class SettingsModule extends BackendModule {
  constructor(args: YourDashModuleArguments) {
    super(args);

    this.API.request.post("/app/settings/core/panel/position", async (req, res) => {
      const { username } = req.headers as {
        username: string
      };
      const { position } = req.body;

      const panel = new YourDashPanel(username);

      await panel.setPanelPosition(position);

      return res.json({
        success: true
      });
    });

    this.API.request.post("/app/settings/core/panel/quick-shortcuts", async (req, res) => {
      const { username } = req.headers as {
        username: string
      };
      const { launcher } = req.body;

      const panel = new YourDashPanel(username);

      await panel.setLauncherType(launcher);

      return res.json({ success: true });
    });

    this.API.request.get("/app/settings/developer/install-all-applications", async (req, res) => {
      const installableApplications = (await fs.readdir("../applications")).filter(appName => {
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

      installableApplications.map(async app => {
        if (coreApi.globalDb.get("core:installedApplications").includes(app))
          return;

        coreApi.globalDb.set("core:installedApplications", [ ...coreApi.globalDb.get("core:installedApplications"), app ]);
        await coreApi.moduleManager.loadModule(app, path.join(process.cwd(), `../applications/${app}/backend/`));
      })

      return res.json({ success: true });
    })
  }
}
