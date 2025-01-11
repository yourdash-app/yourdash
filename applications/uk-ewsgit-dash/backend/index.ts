/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

// import { YourDashBackendModule, YourDashModuleArguments } from "@yourdash/backend/src/core/coreApplicationManager.js";
// import type { IWidgetGrid } from "../shared/types/widgetGrid.js";
// import core from "@yourdash/backend/src/core/core.js";
// import DashWidget from "./widget.js";
// import z from "zod";
//
// export default class DashModule extends YourDashBackendModule {
//   widgets: DashWidget<string, object>[];
//
//   constructor(args: YourDashModuleArguments) {
//     super(args);
//
//     this.widgets = [];
//
//     return this;
//   }
//
//   public loadEndpoints() {
//     super.loadEndpoints();
//
//     core.request.get(
//       "/user-full-name",
//       z.object({ first: z.string(), last: z.string() }),
//       async (req, res) => {
//         res.json(
//           (await core.users.get(req.username).getName()) || {
//             first: "Unknown",
//             last: "User",
//           },
//         );
//       },
//       "Get user full name",
//     );
//
//     const WIDGET_PAGES: IWidgetGrid[] = [
//       {
//         widgets: [
//           {
//             widgetType: "applicationShortcut",
//             allowedSize: { default: { width: 1, height: 1 }, min: { width: 1, height: 1 }, max: { width: 1, height: 1 } },
//             position: { x: 0, y: 0 },
//             size: { width: 1, height: 1 },
//             data: {
//               id: "uk-ewsgit-dash-frontend",
//               name: "Dash",
//               icon: "put authenticated image here",
//               url: "/app/a/uk-ewsgit-dash-frontend",
//             },
//           },
//         ],
//       },
//     ];
//
//     core.request.get("/widget/pages", z.object({ pageCount: z.number() }), async (req, res) => {
//       // return the number of widget pages a user has
//
//       return res.json({
//         pageCount: WIDGET_PAGES.length,
//       });
//     });
//
//     core.request.get(
//       "/widgets/:page",
//       z.object({
//         widgets: z
//           .object({
//             position: z.object({ x: z.number(), y: z.number() }),
//             size: z.object({ width: z.number(), height: z.number() }),
//             widgetType: z.string(),
//             allowedSize: z.object({
//               default: z.object({ width: z.number(), height: z.number() }),
//               min: z.object({ width: z.number(), height: z.number() }),
//               max: z.object({ width: z.number(), height: z.number() }),
//             }),
//             data: z.any(),
//           })
//           .array(),
//       }),
//       async (req, res) => {
//         const page = req.params.page as string;
//
//         return res.json(WIDGET_PAGES[Number(page)]);
//       },
//     );
//
//     core.request.get("/api-version", z.object({ version: z.number() }), async (req, res) => {
//       return res.json({ version: 1 });
//     });
//   }
// }

import { YourDashApplication } from "@yourdash/backend/resrc/applications.js";
import instance from "@yourdash/backend/resrc/main.js";

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
      displayName: "Dash",
      description: "The YourDash dashboard application.",
      id: "uk-ewsgit-dash",
    });
  }

  public onLoad(): this {
    instance.request.get("/app/uk-ewsgit-dash/");

    return super.onLoad();
  }
}
