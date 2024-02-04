/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { promises as fs } from "fs";
import path from "path";
import IPanelApplicationsLauncherApplication from "@yourdash/shared/core/panel/applicationsLauncher/application.js";
import sharp from "sharp";
import YourDashApplication from "../helpers/applications.js";
import YourDashPanel from "./helpers/panel.js";
import { CoreApi } from "./coreApi.js";
import { AUTHENTICATED_IMAGE_TYPE } from "./coreApiAuthenticatedImage.js";

export default class CoreApiPanel {
  private coreApi: CoreApi;

  constructor(coreApi: CoreApi) {
    this.coreApi = coreApi;
  }

  __internal__loadEndpoints() {
    this.coreApi.expressServer.get("/core/panel/applications", async (req, res) => {
      res.set("Cache-Control", "no-store");
      const { username } = req.headers as { username: string };

      return res.json(
        await Promise.all(
          (this.coreApi.globalDb.get("core:installedApplications") || []).map(async (applicationName: string) => {
            const application = await new YourDashApplication(applicationName).read();

            const RESIZED_ICON_PATH = path.join(
              this.coreApi.fs.ROOT_PATH,
              "cache/applications/icons",
              `${application.getName()}`,
              "128.png",
            );

            if (!(await this.coreApi.fs.exists(RESIZED_ICON_PATH))) {
              this.coreApi.log.info("core:panel", `Generating 128x128 icon for ${application.getName()}`);

              await this.coreApi.fs.createDirectory(path.dirname(RESIZED_ICON_PATH));
              await this.coreApi.utils
                .image(await (await this.coreApi.fs.getFile(await application.getIconPath())).read("buffer"))
                .resizeTo(128, 128)
                .toFile(RESIZED_ICON_PATH);
            }

            return {
              name: application.getName(),
              displayName: application.getDisplayName(),
              description: application.getDescription(),
              icon: this.coreApi.authenticatedImage.create(username, AUTHENTICATED_IMAGE_TYPE.FILE, RESIZED_ICON_PATH),
            };
          }),
        ),
      );
    });

    this.coreApi.expressServer.get("/core/panel/quick-shortcuts", async (req, res) => {
      res.set("Cache-Control", "no-store");

      const { username } = req.headers as { username: string };

      const panel = new YourDashPanel(username);

      return res.json(
        await Promise.all(
          (await panel.getQuickShortcuts()).map(async (shortcut) => {
            const application = await new YourDashApplication(shortcut).read();

            const RESIZED_ICON_PATH = path.join(
              this.coreApi.fs.ROOT_PATH,
              "cache/applications/icons",
              `${application.getName()}`,
              "64.png",
            );

            if (!(await this.coreApi.fs.exists(RESIZED_ICON_PATH))) {
              this.coreApi.log.info("core:panel", `Generating 64x64 icon for ${application.getName()}`);

              await this.coreApi.fs.createDirectory(path.dirname(RESIZED_ICON_PATH));
              await this.coreApi.utils
                .image(await (await this.coreApi.fs.getFile(await application.getIconPath())).read("buffer"))
                .resizeTo(64, 64)
                .toFile(RESIZED_ICON_PATH);
            }

            return {
              name: shortcut,
              icon: this.coreApi.authenticatedImage.create(username, AUTHENTICATED_IMAGE_TYPE.FILE, RESIZED_ICON_PATH),
            };
          }),
        ),
      );
    });

    this.coreApi.expressServer.delete("/core/panel/quick-shortcuts/:ind", async (req, res) => {
      res.set("Cache-Control", "");

      const { ind } = req.params;
      const { username } = req.headers as { username: string };

      const panel = new YourDashPanel(username);
      try {
        await panel.removeQuickShortcut(parseInt(ind, 10));
      } catch (e) {
        return res.json({ success: false, error: "Unable to remove shortcut" });
      }

      return res.json({ success: true });
    });

    this.coreApi.expressServer.post("/core/panel/quick-shortcuts/create", async (req, res) => {
      res.set("Cache-Control", "no-store");

      const { username } = req.headers as { username: string };
      const { name } = req.body as { name: string };

      const panel = new YourDashPanel(username);

      await panel.createQuickShortcut(name);

      return res.json({ success: true });
    });

    this.coreApi.expressServer.get("/core/panel/position", async (req, res) => {
      res.set("Cache-Control", "no-store");

      const { username } = req.headers as {
        username: string;
      };

      const panel = new YourDashPanel(username);

      return res.json({ position: await panel.getPanelPosition() });
    });

    this.coreApi.expressServer.get("/core/panel/launcher-type", async (req, res) => {
      res.set("Cache-Control", "no-store");
      const { username } = req.headers as { username: string };

      const panel = new YourDashPanel(username);

      return res.json({ launcher: await panel.getLauncherType() });
    });

    this.coreApi.expressServer.get("/core/panel/logo", (req, res) => {
      const { username } = req.headers as { username: string };

      return res.json({
        small: this.coreApi.authenticatedImage.create(
          username,
          AUTHENTICATED_IMAGE_TYPE.FILE,
          path.join(this.coreApi.fs.ROOT_PATH, "./logo_panel_small.avif"),
        ),
        medium: this.coreApi.authenticatedImage.create(
          username,
          AUTHENTICATED_IMAGE_TYPE.FILE,
          path.join(this.coreApi.fs.ROOT_PATH, "./logo_panel_medium.avif"),
        ),
        large: this.coreApi.authenticatedImage.create(
          username,
          AUTHENTICATED_IMAGE_TYPE.FILE,
          path.join(this.coreApi.fs.ROOT_PATH, "./logo_panel_large.avif"),
        ),
      });
    });

    this.coreApi.expressServer.get("/core/panel/logo", (req, res) => {
      const { username } = req.headers as { username: string };

      return res.json({
        small: this.coreApi.authenticatedImage.create(
          username,
          AUTHENTICATED_IMAGE_TYPE.FILE,
          path.join(this.coreApi.fs.ROOT_PATH, "./logo_panel_small.avif"),
        ),
        medium: this.coreApi.authenticatedImage.create(
          username,
          AUTHENTICATED_IMAGE_TYPE.FILE,
          path.join(this.coreApi.fs.ROOT_PATH, "./logo_panel_medium.avif"),
        ),
        large: this.coreApi.authenticatedImage.create(
          username,
          AUTHENTICATED_IMAGE_TYPE.FILE,
          path.join(this.coreApi.fs.ROOT_PATH, "./logo_panel_large.avif"),
        ),
      });
    });
  }
}
