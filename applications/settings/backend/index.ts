/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import YourDashPanel from "@yourdash/backend/src/core/helpers/panel.js";
import BackendModule, { YourDashModuleArguments } from "@yourdash/backend/src/core/moduleManager/backendModule.js";
import { readdirSync } from "fs";
import core from "@yourdash/backend/src/core/core.js";
import EndpointSettingCategorySetting from "../shared/types/endpoints/setting/category/setting.js";
import SETTING_TYPE from "../shared/types/settingType.js";

/*
 *   Future settings plans
 *
 *   - each server module can add settings to a settings.json file
 *   - every setting will be put into a category
 *   - the frontend will request a category or list of categories from the server
 *   - the server will then return all settings in that category
 *   - setting shared include: SETTING_TYPE
 * */

export default class SettingsModule extends BackendModule {
  installableApplications: string[] = [];

  constructor(args: YourDashModuleArguments) {
    super(args);

    this.installableApplications = readdirSync("../../applications").filter((appName) => {
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

    return this;
  }

  public loadEndpoints() {
    super.loadEndpoints();

    // legacy endpoints
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
      this.installableApplications.map(async (app) => {
        if (core.globalDb.get<string[]>("core:installedApplications").includes(app)) return;

        core.globalDb.set("core:installedApplications", [
          ...core.globalDb.get<string[]>("core:installedApplications"),
          app,
        ]);

        await this.api.core.restartInstance();
      });

      return res.json({ success: true });
    });

    this.api.request.setNamespace("app::settings");

    this.api.request.get("/setting/:category/:setting", async (req, res) => {
      const { category, setting } = req.params;

      const settingType: SETTING_TYPE = SETTING_TYPE.BOOLEAN;
      const settingValue = (await this.api.getUser(req).getDatabase()).get(`settings:${category}:${setting}`);

      return res.json(<EndpointSettingCategorySetting<SETTING_TYPE>>{
        type: settingType,
        value: settingValue,
      });
    });
  }
}
