/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

// import core from "@yourdash/backend/src/core/core.js";
// import { YourDashBackendModule, YourDashModuleArguments } from "@yourdash/backend/src/core/coreApplicationManager.js";
// import { AUTHENTICATED_IMAGE_TYPE } from "@yourdash/backend/src/core/coreImage.js";
// import YourDashPanel, { YourDashPanelPosition } from "@yourdash/backend/src/core/helpers/panel.js";
// import { readdirSync, readFileSync } from "fs";
// import path from "path";
// import z from "zod";
// import SettingsCategory from "../shared/types/category.js";
// import EndpointSettingsCategory from "../shared/types/endpoints/setting/category.js";
// import EndpointSettingCategorySetting from "../shared/types/endpoints/setting/category/setting.js";
// import ISetting from "../shared/types/setting.js";
// import SETTING_TYPE from "../shared/types/settingType.js";

// /*
//  *   Future settings plans
//  *
//  *   - each server module can add settings to a settings.json file
//  *   - every setting will be put into a category
//  *   - the frontend will request a category or list of categories from the server
//  *   - the server will then return all settings in that category
//  */

// export default class SettingsModule extends YourDashBackendModule {
//   installableApplications: string[] = [];
//   settingsCategories: { [category: string]: SettingsCategory } = {};

//   constructor(args: YourDashModuleArguments) {
//     super(args);

//     this.installableApplications = readdirSync("../../applications").filter((appName) => {
//       switch (appName) {
//         case "package.json":
//         case "node_modules":
//         case "gulpfile.js":
//         case "README.md":
//           return false;
//         default:
//           return true;
//       }
//     });

//     return this;
//   }

//   public loadEndpoints() {
//     super.loadEndpoints();

//     // get installed applications
//     const installedApplications = core.applicationManager.getInstalledApplications();

//     if (installedApplications === undefined) {
//       return;
//     }

//     // rework this to create an object with an array for each category with an array of all it's settings
//     this.settingsCategories = {};

//     Promise.all(
//       installedApplications.map(async (application) => {
//         let applicationSettingsFile: string;

//         try {
//           applicationSettingsFile =
//             readFileSync(path.join(process.cwd(), "../../applications/" + application + "/settings.json")).toString() || "[]";

//           if (applicationSettingsFile == "[]") {
//             return undefined;
//           }
//         } catch (err) {
//           return undefined;
//         }

//         return JSON.parse(applicationSettingsFile) as ISetting<SETTING_TYPE>[];
//       }),
//     ).then((a) =>
//       a
//         .flat() // array of all categories
//         .map(async (setting) => {
//           // validate setting
//           if (setting === undefined) {
//             return undefined;
//           }
//           if (setting.category === undefined) {
//             return undefined;
//           }
//           if (setting.id === undefined) {
//             return undefined;
//           }
//           if (setting.type === undefined) {
//             return undefined;
//           }
//           // noinspection PointlessBooleanExpressionJS
//           if (setting.value === undefined) {
//             return undefined;
//           }
//           if (setting.type === SETTING_TYPE.BOOLEAN && typeof setting.value !== "boolean") {
//             this.api.log.error(
//               `Setting '${setting.id}' has the type '${typeof setting.value}' but it's default value is expected to be of type 'boolean'`,
//             );
//             return undefined;
//           }
//           if (setting.type === SETTING_TYPE.STRING && typeof setting.value !== "string") {
//             this.api.log.error(
//               `Setting '${setting.id}' has the type '${typeof setting.value}' but it's default value is expected to be of type 'string'`,
//             );
//             return undefined;
//           }
//           if (setting.type === SETTING_TYPE.DATE && typeof setting.value !== "number") {
//             this.api.log.error(
//               `Setting '${setting.id}' has the type '${typeof setting.value}' but it's default value is expected to be of type 'number' (unix epoch time)`,
//             );
//             return undefined;
//           }
//           if (setting.type === SETTING_TYPE.INT && typeof setting.value !== "number" && !setting.type.toString().includes(".")) {
//             this.api.log.error(
//               `Setting '${setting.id}' has the type '${typeof setting.value}' but it's default value is expected to be of type 'number' (must contain a decimal)`,
//             );
//             return undefined;
//           }
//           if (setting.type === SETTING_TYPE.FILE && typeof setting.value !== "string") {
//             this.api.log.error(
//               `Setting '${setting.id}' has the type '${typeof setting.value}' but it's default value is expected to be of type 'string'`,
//             );
//             return undefined;
//           }
//           if (
//             setting.type === SETTING_TYPE.COLOR &&
//             typeof setting.value !== "string" &&
//             (!setting.type.toString().includes("#") || !(setting.type.toString().includes("rgb(") && setting.type.toString().includes(")")))
//           ) {
//             this.api.log.error(
//               `Setting '${setting.id}' has the type '${typeof setting.value}' but it's default value is expected to be of type 'string' (css 'hex', 'rgb' or 'rgba')`,
//             );
//             return undefined;
//           }

//           // TODO: finish settings default value checks

//           if (!this.settingsCategories[setting.category]) {
//             this.settingsCategories[setting.category] = {
//               settings: {},
//               id: setting.category,
//               description: "Settings category descriptions are not yet implemented!",
//               displayName: setting.category,
//             };
//           }

//           this.settingsCategories[setting.category].settings[setting.id] = setting;
//         }),
//     );

//     this.api.log.info("Loaded settings from all applications.");

//     // legacy endpoints
//     core.request.post(
//       "/core/panel/position",
//       z.object({ position: z.nativeEnum(YourDashPanelPosition) }),
//       z.object({ success: z.boolean() }),
//       async (req, res) => {
//         const { username } = req.headers as {
//           username: string;
//         };
//         const { position } = req.body;

//         const panel = new YourDashPanel(username);

//         await panel.setPanelPosition(position);

//         return res.json({
//           success: true,
//         });
//       },
//     );

//     core.request.get("/developer/install-all-applications", z.object({ success: z.boolean() }), async (req, res) => {
//       this.installableApplications.map(async (app) => {
//         if (core.globalDb.get<string[]>("core:installedApplications")?.includes(app)) {
//           return;
//         }

//         core.globalDb.set("core:installedApplications", [...(core.globalDb.get<string[]>("core:installedApplications") || []), app]);

//         this.api.core.restartInstance();
//       });

//       return res.json({ success: true });
//     });

//     core.request.get(
//       "/cat/:categoryid",
//       z.object({
//         displayName: z.string(),
//         id: z.string(),
//         icon: z.string().optional(),
//         description: z.string().optional(),
//         settings: z.object({}),
//       }),
//       async (req, res) => {
//         const { categoryid } = req.params;

//         return res.json(
//           <EndpointSettingsCategory>this.settingsCategories[categoryid] || {
//             displayName: "Unknown Category",
//             id: "unknown", // UNUSED but possible future idea
//             icon: "",
//             description: "This category does not exist.",
//             settings: {},
//           },
//         );
//       },
//     );

//     core.request.get("/setting/:category/:setting", z.object({ type: z.nativeEnum(SETTING_TYPE), value: z.any() }), async (req, res) => {
//       const { category, setting } = req.params;

//       const settingType: SETTING_TYPE = SETTING_TYPE.BOOLEAN;
//       const settingValue = (await core.users.get(req.username).getDatabase()).get(`settings:${category}:${setting}`) || undefined;

//       return res.json(<EndpointSettingCategorySetting<SETTING_TYPE>>{
//         type: settingType,
//         value: settingValue,
//       });
//     });

//     // core.request.get(
//     //   "/applications/installedApplications",
//     //   z.object({
//     //     applications: z.object({
//     //       loaded: z
//     //         .object({
//     //           id: z.string(),
//     //           modules: z.object({
//     //             loaded: z.string().array(),
//     //             unloaded: z.string().array(),
//     //             length: z.number(),
//     //           }),
//     //         })
//     //         .array(),
//     //       unloaded: z
//     //         .object({
//     //           id: z.string(),
//     //           modules: z.object({
//     //             loaded: z.string().array(),
//     //             unloaded: z.string().array(),
//     //             length: z.number(),
//     //           }),
//     //         })
//     //         .array(),
//     //       length: z.number(),
//     //     }),
//     //   }),
//     //   async (req, res) => {
//     //     const loadedApplications: ISettingsInstalledApplication[] = [];
//     //     const unloadedApplications: ISettingsInstalledApplication[] = [];
//     //
//     //     const loadedApplicationIds = core.applicationManager.loadedApplications;
//     //
//     //     return res.json({
//     //       applications: {
//     //         loaded: loadedApplications,
//     //         unloaded: unloadedApplications,
//     //         length: loadedApplications.length + unloadedApplications.length,
//     //       },
//     //     });
//     //   },
//     // );

//     // wallpaper manager

//     core.request.get(
//       "/current/wallpaper",
//       z.object({ dimensions: z.object({ width: z.number(), height: z.number() }), thumbnail: z.string() }),
//       async (req, res) => {
//         let wallpaperPath = path.join(core.users.get(req.username).getPath(), "core/wallpaper.avif");

//         let thumbnail = await core.fs.generateThumbnail(wallpaperPath, { width: 480, height: 280 });

//         return res.json({
//           dimensions: await core.image.getImageDimensions(wallpaperPath),
//           thumbnail: core.image.createAuthenticatedImage(req.username, req.sessionId, AUTHENTICATED_IMAGE_TYPE.FILE, thumbnail),
//         });
//       },
//     );
//   }
// }

import { YourDashApplication } from "@yourdash/backend/resrc/applications.js";

export default class Application extends YourDashApplication {
  constructor() {
    super({
      version: {
        major: 1,
        minor: 0,
      },
      configVersion: 1,
      credits: {
        authors: [{ name: "Ewsgit", site: "https://ewsgit.uk" }],
      },
      frontend: {
        entryPoint: "../web/index.tsx",
      },
      displayName: "Settings",
      description: "The YourDash settings application.",
      id: "uk-ewsgit-settings",
    });
  }

  public onLoad(): this {
    return super.onLoad();
  }
}
