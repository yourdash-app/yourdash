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
import { z } from "zod";

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

    instance.database.query(`CREATE TABLE IF NOT EXISTS uk_ewsgit_dash_dashboard
                              (
                                  username                  text,
                                  header_welcome_message    text  default 'Hiya, %username%',
                                  header_size               text  default 'medium',
                                  header_style              text  default 'floating',
                                  header_background_blur    float default 0.25,
                                  header_background_opacity float default 0.75,
                                  background_type text default 'image',
                                  background_value text,
                                  background_path text,
                                  content_background_blur    float default 0.25,
                                  content_background_opacity float default 0.75,
                                  content_pages json[] default array[]::json[]
                              );`);

    return this;
  }

  public onLoad(): this {
    instance.request.get(
      "/app/uk-ewsgit-dash/dashboard",
      {
        schema: {
          response: {
            200: z.object({
              header: z.object({
                welcomeMessage: z.string(),
                size: z.union([z.literal("small"), z.literal("medium"), z.literal("large")]),
                style: z.union([z.literal("floating"), z.literal("docked")]),
                background: z.object({
                  blur: z.number(),
                  opacity: z.number(),
                }),
              }),
              background: z.union([
                z.object({
                  type: z.literal("image"),
                  path: z.string(),
                }),
                z.object({
                  type: z.literal("color"),
                  value: z.string(),
                }),
                z.object({
                  type: z.literal("linearGradient"),
                  value: z.string(),
                }),
                z.object({
                  type: z.literal("radialGradient"),
                  value: z.string(),
                }),
              ]),
              content: z.object({
                background: z.object({
                  blur: z.number(),
                  opacity: z.number(),
                }),
                pages: z
                  .object({
                    id: z.string(),
                    data: z.any(),
                    dimensions: z.object({
                      width: z.number(),
                      height: z.number(),
                    }),
                    position: z.object({
                      x: z.number(),
                      y: z.number(),
                    }),
                  })
                  .array(),
              }),
              user: z.object({
                username: z.string(),
                forename: z.string(),
                surname: z.string(),
              }),
            }),
          },
        },
      },
      async (req, res) => {
        const username = instance.requestManager.getRequestUsername();
        const userData = await instance.database.query("SELECT forename, surname FROM users WHERE username = $1", [username]);

        console.log(userData.rows);

        return {
          header: {
            welcomeMessage: `Hiya, %username%`,
            size: "medium",
            style: "floating",
          },
          content: {
            background: {
              // percentage from 0rem to 4rem
              blur: 0.5, // percentage from 0% to 100%
              opacity: 0.5,
            },
            pages: [],
          },
          user: {
            username: username,
            forename: userData.rows[0].forename,
            surname: userData.rows[0].surname,
          },
        };
      },
    );

    return super.onLoad();
  }
}
