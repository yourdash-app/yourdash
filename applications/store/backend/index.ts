/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreApi from "@yourdash/backend/src/core/coreApi.js";
import BackendModule, { YourDashModuleArguments } from "@yourdash/backend/src/core/moduleManager/backendModule.js";
import YourDashApplication, { getAllApplications } from "@yourdash/backend/src/helpers/applications.js";
import { getInstanceLogoBase64 } from "@yourdash/backend/src/helpers/logo.js";
import path from "path";
import { IYourDashStoreApplication } from "@yourdash/shared/apps/store/storeApplication.js";
import { IStoreCategory } from "@yourdash/shared/apps/store/storeCategory.js";
import { type StorePromotedApplication } from "@yourdash/shared/apps/store/storePromotedApplication.js";
import getAllCategories, { getAllApplicationsFromCategory } from "./helpers/categories.js";
import { AUTHENTICATED_IMAGE_TYPE } from "@yourdash/backend/src/core/coreApiImage.js";

const promotedApplications: string[] = ["dash", "store"];

export default class StoreModule extends BackendModule {
  constructor(args: YourDashModuleArguments) {
    super(args);
  }

  public loadEndpoints() {
    super.loadEndpoints();

    this.API.request.get("/app/store/promoted/applications", (_req, res) => {
      Promise.all(
        promotedApplications.map(async (app): Promise<StorePromotedApplication> => {
          const application = await new YourDashApplication(app).read();
          return {
            name: application.getName(),
            backgroundImage: `data:image/png;base64,${(await application.getStoreBackground()).toString("base64")}`,
            icon: `data:image/avif;base64,${(await application.getIcon()).toString("base64")}`,
            displayName: application.getDisplayName(),
            installed: application.isInstalled(),
          };
        }),
      ).then((out) => res.json(out));
    });

    this.API.request.get("/app/store/categories", async (_req, res) => {
      const applications = await getAllApplications();

      const categories: { [key: string]: boolean } = {};

      for (const application of applications) {
        const unreadApplication = new YourDashApplication(application);

        if (!(await unreadApplication.exists())) {
          continue;
        }

        const app = await unreadApplication.read();

        categories[app.getCategory()] = true;
      }

      return res.json(Object.keys(categories));
    });

    this.API.request.get("/app/store/applications", async (req, res) => {
      const { username } = req.headers as { username: string };

      const applications = await getAllApplications();

      return res.json(
        await Promise.all(
          applications.map(async (applicationName) => {
            const unreadApplication = new YourDashApplication(applicationName);

            if (!(await unreadApplication.exists())) {
              return { value: applicationName };
            }

            const application = await unreadApplication.read();

            return {
              value: applicationName,
              displayName: application.getDisplayName() || applicationName,
              icon: coreApi.image.createAuthenticatedImage(username, AUTHENTICATED_IMAGE_TYPE.FILE, await application.getIconPath()),
              installed: application.isInstalled(),
            };
          }),
        ),
      );
    });

    this.API.request.get("/app/store/category/:id", async (req, res) => {
      const { username } = req.headers as { username: string };
      const { id } = req.params;

      if (!id) {
        return res.json({ error: true });
      }

      const categories = await getAllCategories();

      if (!categories.includes(id)) {
        return res.json({ error: `unknown category ${id}` });
      }

      const categoryApplications = await getAllApplicationsFromCategory(id);

      const applicationsOutput: {
        name: string;
        icon: string;
        displayName: string;
      }[] = [];

      await Promise.all(
        categoryApplications.map(async (app) => {
          const application = await new YourDashApplication(app).read();
          applicationsOutput.push({
            name: application.getName(),
            icon: coreApi.image.createAuthenticatedImage(username, AUTHENTICATED_IMAGE_TYPE.FILE, await application.getIconPath()),
            displayName: application.getDisplayName(),
          });
        }),
      );

      return res.json(<IStoreCategory>{
        value: id,
        applications: applicationsOutput,
        icon: `data:image/avif;base64,${getInstanceLogoBase64()}`,
        displayName: id.slice(0, 1).toUpperCase() + id.slice(1),
        promotedApplications,
        bannerImage: `data:image/avif;base64,${getInstanceLogoBase64()}`,
      });
    });

    this.API.request.get("/app/store/application/:id", async (req, res) => {
      const { id } = req.params;

      if (!id) {
        return res.json({ error: true });
      }

      const unreadApplication = new YourDashApplication(id);

      if (!(await unreadApplication.exists())) {
        return res.json({ error: true });
      }

      const application = await unreadApplication.read();

      const response: IYourDashStoreApplication = {
        ...application.getRawApplicationData(),
        icon: `data:image/avif;base64,${(await application.getIcon()).toString("base64")}`,
        installed: application.isInstalled(),
        requiresBackend: await application.requiresBackend(),
      };

      return res.json(response);
    });

    this.API.request.post("/app/store/application/install/:id", async (req, res) => {
      const { id } = req.params;
      const applicationUnread = new YourDashApplication(id);
      if (!(await applicationUnread.exists())) {
        return res.json({ error: true });
      }
      const application = await applicationUnread.read();

      coreApi.globalDb.set("core:installedApplications", [...coreApi.globalDb.get("core:installedApplications"), id, ...application.getDependencies()]);
      await coreApi.moduleManager.loadModule(id, path.join(process.cwd(), `../applications/${id}/backend/`));
      return res.json({ success: true });
    });

    this.API.request.post("/app/store/application/uninstall/:id", (req, res) => {
      const { id } = req.params;
      const application = new YourDashApplication(id);
      if (!application.exists()) {
        return res.json({ error: true });
      }
      coreApi.globalDb.set(
        "core:installedApplications",
        coreApi.globalDb.get("core:installedApplications").filter((app) => app !== id),
      );
      return res.json({ success: true });
    });

    this.API.request.get("/app/store/application/:id/icon", async (req, res) => {
      const { id } = req.params;
      const unreadApplication = new YourDashApplication(id);
      if (!(await unreadApplication.exists())) {
        return res.sendFile(path.resolve(process.cwd(), "./defaults/placeholder_application_icon.png"));
      }
      const application = await unreadApplication.read();
      return res.sendFile(await application.getIconPath());
    });
  }
}
