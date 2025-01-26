/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

// import core from "@yourdash/backend/src/core/core.js";
// import { YourDashBackendModule, YourDashModuleArguments } from "@yourdash/backend/src/core/coreApplicationManager.js";
// import randomIndexOf from "@yourdash/shared/lib/randomIndexOf.js";
// import EndpointHomeApplicationCategories from "../shared/types/endpoints/home/applicationCategories.js";
// import { EndpointStoreHomePromotedApplications } from "../shared/types/endpoints/home/promotedApplications.js";
// import { z } from "zod";

// export default class StoreModule extends YourDashBackendModule {
//   private applicationCategories: { [categoryId: string]: { applications: string[]; modules: string[]; displayName: string; id: string } };

//   constructor(args: YourDashModuleArguments) {
//     super(args);

//     this.applicationCategories = {};

//     return this;
//   }

//   public loadEndpoints() {
//     super.loadEndpoints();

//     core.request.get(
//       "/home/promotedApplications",
//       z
//         .object({
//           displayName: z.string(),
//           bannerBackground: z.string(),
//           developer: z.string(),
//           icon: z.string(),
//           id: z.string(),
//           tags: z.string().array(),
//           description: z.string(),
//         })
//         .array(),
//       async (req, res) => {
//         return res.json([
//           {
//             displayName: "displayName",
//             bannerBackground: "bannerBackground",
//             developer: "developer inc",
//             icon: "/assets/productLogos/yourdash.svg",
//             id: "com-example-test",
//             tags: ["development", "stupidity"],
//             description: "Hello world from application description",
//           },
//           {
//             displayName: "displayName2",
//             bannerBackground: "bannerBackground",
//             developer: "developer inc",
//             icon: "/assets/productLogos/yourdash.svg",
//             id: "com-example-test2",
//             tags: ["development", "stupidity"],
//             description: "Hello world from application description2",
//           },
//           {
//             displayName: "displayName3",
//             bannerBackground: "bannerBackground",
//             developer: "developer inc",
//             icon: "/assets/productLogos/yourdash.svg",
//             id: "com-example-test3",
//             tags: ["development", "stupidity"],
//             description: "Hello world from application description3",
//           },
//           {
//             displayName: "displayName4",
//             bannerBackground: "bannerBackground",
//             developer: "developer inc",
//             icon: "/assets/productLogos/yourdash.svg",
//             id: "com-example-test4",
//             tags: ["development", "stupidity"],
//             description: "Hello world from application description4",
//           },
//           {
//             displayName: "displayName5",
//             bannerBackground: "bannerBackground",
//             developer: "developer inc",
//             icon: "/assets/productLogos/yourdash.svg",
//             id: "com-example-test5",
//             tags: ["development", "stupidity"],
//             description: "Hello world from application description5",
//           },
//         ] satisfies EndpointStoreHomePromotedApplications);
//       },
//     );

//     core.request.get(
//       "/home/applicationCategories",
//       z
//         .object({
//           id: z.string(),
//           displayName: z.string(),
//           description: z.string(),
//           moduleCount: z.number(),
//           applicationCount: z.number(),
//           backgroundImage: z.string(),
//         })
//         .array(),
//       async (req, res) => {
//         const categories = Object.entries(this.applicationCategories);
//         // array of random css background images
//         const backgrounds: string[] = ["orange"];

//         return res.json([
//           {
//             id: "categoryId",
//             displayName: "Category Display Name",
//             description: "This is the categoryDescription",
//             moduleCount: 69,
//             applicationCount: 69,
//             backgroundImage: randomIndexOf(backgrounds),
//           },
//         ] satisfies EndpointHomeApplicationCategories);
//       },
//     );

//     core.request.get(
//       "/home/category/:categoryId",
//       z
//         .object({
//           applications: z.string().array(),
//           displayName: z.string(),
//         })
//         .or(z.object({ error: z.string() })),
//       async (req, res) => {
//         const categoryId = req.params.categoryId;

//         if (!this.applicationCategories[categoryId]) return res.status(404).json({ error: "Unknown category" });

//         return res.json({
//           applications: this.applicationCategories[categoryId].applications,
//           displayName: this.applicationCategories[categoryId].displayName,
//         });
//       },
//     );

//     core.request.get(
//       "/home/application/:applicationId",
//       z.object({
//         description: z.string(),
//         displayName: z.string(),
//         developer: z.string(),
//         id: z.string(),
//         moduleCount: z.number(),
//       }),
//       async (req, res) => {
//         const applicationId = req.params.applicationId;

//         return res.json({
//           description: "Sample application description",
//           displayName: "Sample Display Name",
//           developer: "ewsgit.uk",
//           id: applicationId,
//           moduleCount: 2,
//         });
//       },
//     );

//     core.request.get(
//       "/wallpaper/current",
//       z.object({
//         dimensions: z.object({ width: z.number(), height: z.number() }),
//         path: z.string(),
//         previewThumbnail: z.string(),
//       }),
//       async (req, res) => {
//         return res.json({
//           dimensions: {
//             width: 1920,
//             height: 1080,
//           },
//           path: "wallpaper.png",
//           previewThumbnail: "wallpaper.png",
//         });
//       },
//     );

//     core.request.get(
//       "/wallpapers/",
//       z.object({ dimensions: z.object({ width: z.number(), height: z.number() }), path: z.string(), previewThumbnail: z.string() }).array(),
//       async (req, res) => {
//         return res.json([
//           {
//             dimensions: {
//               width: 1920,
//               height: 1080,
//             },
//             path: "wallpaper.png",
//             previewThumbnail: "wallpaper.png",
//           },
//         ]);
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
      displayName: "Store",
      description: "Install and manage applications within YourDash.",
      id: "uk-ewsgit-store",
    });
  }

  public onLoad(): this {
    return super.onLoad();
  }
}
