/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import StoreBackendModule from "@yourdash/applications/store/backend/index.js";
import core from "@yourdash/backend/src/core/core.js";
import YourDashPanel from "@yourdash/backend/src/core/helpers/panel.js";
import BackendModule, { YourDashModuleArguments } from "@yourdash/backend/src/core/moduleManager/backendModule.js";
import { readdirSync, readFileSync } from "fs";
import path from "path";
import SettingsCategory from "../shared/types/category.js";
import EndpointSettingsCategory from "../shared/types/endpoints/setting/category.js";
import EndpointSettingCategorySetting from "../shared/types/endpoints/setting/category/setting.js";
import ISetting from "../shared/types/setting.js";
import SETTING_TYPE from "../shared/types/settingType.js";

/*
 *   Future settings plans
 *
 *   - each server module can add settings to a settings.json file
 *   - every setting will be put into a category
 *   - the frontend will request a category or list of categories from the server
 *   - the server will then return all settings in that category
 */

export default class SettingsModule extends BackendModule {
  installableApplications: string[] = [];
  settingsCategories: { [category: string]: SettingsCategory } = {};

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

  public async loadEndpoints() {
    super.loadEndpoints();

    // get installed applications
    const installedApplications = this.api.core.moduleManager.getModule<StoreBackendModule>("store")?.getInstalledApplications();

    if (installedApplications === undefined) {
      return;
    }

    // rework this to create an object with an array for each category with an array of all it's settings
    this.settingsCategories = {};

    (
      await Promise.all(
        installedApplications.map(async (application) => {
          let applicationSettingsFile: string;

          try {
            applicationSettingsFile =
              readFileSync(path.join(process.cwd(), "../../applications/" + application + "/settings.json")).toString() || "[]";

            if (applicationSettingsFile == "[]") {
              return undefined;
            }
          } catch (err) {
            return undefined;
          }

          return JSON.parse(applicationSettingsFile) as ISetting<SETTING_TYPE>[];
        }),
      )
    )
      .flat() // array of all categories
      .map(async (setting) => {
        // validate setting
        if (setting === undefined) {
          return undefined;
        }
        if (setting.category === undefined) {
          return undefined;
        }
        if (setting.id === undefined) {
          return undefined;
        }
        if (setting.type === undefined) {
          return undefined;
        }
        // noinspection PointlessBooleanExpressionJS
        if (setting.value === undefined) {
          return undefined;
        }
        if (setting.type === SETTING_TYPE.BOOLEAN && typeof setting.value !== "boolean") {
          this.api.core.log.error(
            "app/settings",
            `Setting '${setting.id}' has the type '${typeof setting.value}' but it's default value is expected to be of type 'boolean'`,
          );
          return undefined;
        }
        if (setting.type === SETTING_TYPE.STRING && typeof setting.value !== "string") {
          this.api.core.log.error(
            "app/settings",
            `Setting '${setting.id}' has the type '${typeof setting.value}' but it's default value is expected to be of type 'string'`,
          );
          return undefined;
        }
        if (setting.type === SETTING_TYPE.DATE && typeof setting.value !== "number") {
          this.api.core.log.error(
            "app/settings",
            `Setting '${setting.id}' has the type '${typeof setting.value}' but it's default value is expected to be of type 'number' (unix epoch time)`,
          );
          return undefined;
        }
        if (setting.type === SETTING_TYPE.INT && typeof setting.value !== "number" && !setting.type.toString().includes(".")) {
          this.api.core.log.error(
            "app/settings",
            `Setting '${setting.id}' has the type '${typeof setting.value}' but it's default value is expected to be of type 'number' (must contain a decimal)`,
          );
          return undefined;
        }
        if (setting.type === SETTING_TYPE.FILE && typeof setting.value !== "string") {
          this.api.core.log.error(
            "app/settings",
            `Setting '${setting.id}' has the type '${typeof setting.value}' but it's default value is expected to be of type 'string'`,
          );
          return undefined;
        }
        if (
          setting.type === SETTING_TYPE.COLOR &&
          typeof setting.value !== "string" &&
          (!setting.type.toString().includes("#") || !(setting.type.toString().includes("rgb(") && setting.type.toString().includes(")")))
        ) {
          this.api.core.log.error(
            "app/settings",
            `Setting '${setting.id}' has the type '${typeof setting.value}' but it's default value is expected to be of type 'string' (css 'hex', 'rgb' or 'rgba')`,
          );
          return undefined;
        }

        // TODO: finish settings default value checks

        if (!this.settingsCategories[setting.category]) {
          this.settingsCategories[setting.category] = {
            settings: {},
            id: setting.category,
            description: "Settings category descriptions are not yet implemented!",
            displayName: setting.category,
          };
        }

        this.settingsCategories[setting.category].settings[setting.id] = setting;
      });

    this.api.core.log.info("app/settings", "Loaded settings from all applications.");

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
        if (core.globalDb.get<string[]>("core:installedApplications")?.includes(app)) return;

        core.globalDb.set("core:installedApplications", [...(core.globalDb.get<string[]>("core:installedApplications") || []), app]);

        this.api.core.restartInstance();
      });

      return res.json({ success: true });
    });

    this.api.request.setNamespace("app/settings");

    this.api.request.get("/cat/:categoryid", async (req, res) => {
      const { categoryid } = req.params;

      return res.json(
        <EndpointSettingsCategory>this.settingsCategories[categoryid] || {
          displayName: "Unknown Category",
          id: "unknown",
          // UNUSED but possible future idea
          icon: "",
          description: "This category does not exist.",
          settings: {},
        },
      );
    });

    this.api.request.get("/setting/:category/:setting", async (req, res) => {
      const { category, setting } = req.params;

      const settingType: SETTING_TYPE = SETTING_TYPE.BOOLEAN;
      const settingValue = (await this.api.getUser(req).getDatabase()).get(`settings:${category}:${setting}`) || undefined;

      return res.json(<EndpointSettingCategorySetting<SETTING_TYPE>>{
        type: settingType,
        value: settingValue,
      });
    });
  }
}
