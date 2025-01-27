/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

// import { promises as fs } from "fs";
// import path from "path";
// import { YourDashBackendModule, YourDashModuleArguments } from "@yourdash/backend/src/core/coreApplicationManager.js";
// import core from "@yourdash/backend/src/core/core.js";
// import { z } from "zod";

// export default class FilesModule extends YourDashBackendModule {
//   constructor(args: YourDashModuleArguments) {
//     super(args);
//   }

//   public loadEndpoints() {
//     super.loadEndpoints();

//     core.request.setNamespace(`app/${this.api.moduleId}`);

//     core.request.get(`/`, z.object({ message: z.string() }), async (req, res) => {
//       return res.json({ message: `Hello world from ${this.api.moduleId}! 👋` });
//     });

//     core.request.get([`/list/dir/@/:path`, `/list/dir/@/`], z.object({ contents: z.string().array() }), async (req, res) => {
//       // path
//       const p = req.params.path || "/";

//       const user = core.users.get(req.username);

//       try {
//         const contents = await fs.readdir(path.join(user.path, "fs", p));

//         return res.json({
//           contents: contents,
//         });
//       } catch (_err) {
//         return res.json({
//           contents: [],
//         });
//       }
//     });

//     core.request.get(
//       "/tabView/home",
//       z.object({
//         recentFiles: z.object({}).array(),
//         sharedFiles: z.object({}).array(),
//         commonStorageLocations: z
//           .object({
//             path: z.string(),
//             baseName: z.string(),
//           })
//           .array(),
//         connections: z
//           .object({
//             serviceName: z.string(),
//             description: z.string(),
//             url: z.string(),
//             quota: z.object({ max: z.number(), usage: z.number(), unit: z.string() }),
//             id: z.string(),
//             serviceLogo: z.string().or(z.unknown()),
//           })
//           .array(),
//       }),
//       async (req, res) => {
//         return res.json({
//           recentFiles: [],
//           sharedFiles: [],
//           commonStorageLocations: [
//             {
//               path: "/",
//               baseName: "Home Directory",
//             },
//           ],
//           connections: [
//             {
//               serviceName: "Google Drive",
//               description: "Google cloud storage platform",
//               url: "https://drive.google.com",
//               quota: { max: 5, usage: Math.random() * 5, unit: "GB" },
//               id: "1000",
//               serviceLogo: undefined,
//             },
//             {
//               serviceName: "Google Drive 2",
//               description: "Google cloud storage platform",
//               url: "https://drive.google.com",
//               quota: { max: 5, usage: Math.random() * 5, unit: "GB" },
//               id: "1000",
//               serviceLogo: undefined,
//             },
//             {
//               serviceName: "Google Drive 3",
//               description: "Google cloud storage platform",
//               url: "https://drive.google.com",
//               quota: { max: 5, usage: Math.random() * 5, unit: "GB" },
//               id: "1000",
//               serviceLogo: undefined,
//             },
//           ],
//         });
//       },
//     );
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
      displayName: "Files",
      description: "The YourDash File Manager",
      id: "uk-ewsgit-files",
    });
  }

  public onLoad(): this {
    instance.request.get(
      "/app/uk-ewsgit-files/tabView/home",
      {
        schema: {
          response: {
            200: z.object({
              recentFiles: z.object({}).array(),
              sharedFiles: z.object({}).array(),
              commonStorageLocations: z
                .object({
                  path: z.string(),
                  baseName: z.string(),
                })
                .array(),
              connections: z
                .object({
                  serviceName: z.string(),
                  description: z.string(),
                  url: z.string(),
                  quota: z.object({ max: z.number(), usage: z.number(), unit: z.string() }),
                  id: z.string(),
                  serviceLogo: z.string().or(z.unknown()),
                })
                .array(),
            }),
          },
        },
      },
      async (req, res) => {
        return {
          recentFiles: [],
          sharedFiles: [],
          commonStorageLocations: [
            {
              path: "/",
              baseName: "Home Directory",
            },
          ],
          connections: [
            {
              serviceName: "Google Drive",
              description: "Google cloud storage platform",
              url: "https://drive.google.com",
              quota: { max: 5, usage: Math.random() * 5, unit: "GB" },
              id: "1000",
              serviceLogo: undefined,
            },
            {
              serviceName: "Google Drive 2",
              description: "Google cloud storage platform",
              url: "https://drive.google.com",
              quota: { max: 5, usage: Math.random() * 5, unit: "GB" },
              id: "1000",
              serviceLogo: undefined,
            },
            {
              serviceName: "Google Drive 3",
              description: "Google cloud storage platform",
              url: "https://drive.google.com",
              quota: { max: 5, usage: Math.random() * 5, unit: "GB" },
              id: "1000",
              serviceLogo: undefined,
            },
          ],
        };
      },
    );

    return super.onLoad();
  }
}
