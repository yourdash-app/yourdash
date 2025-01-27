/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import IPanelApplicationsLauncherFrontendModule from "@yourdash/shared/core/panel/applicationsLauncher/application.js";
import path from "path";
import { AUTHENTICATED_IMAGE_TYPE } from "./coreImage.js";
import YourDashPanel, { YourDashPanelLauncherType, YourDashPanelPosition } from "./helpers/panel.js";
import { Core } from "./core.js";
import { EndpointCorePanelQuickShortcuts } from "@yourdash/shared/endpoints/core/panel/quickShortcuts.js";
import z from "zod";

export default class CorePanel {
  private core: Core;

  constructor(core: Core) {
    this.core = core;
  }

  __internal__loadEndpoints() {
    this.core.request.get(
      "/core/panel/applications",
      z
        .object({
          id: z.string(),
          displayName: z.string(),
          description: z.string(),
          type: z.string(),
          url: z.string().optional(),
          icon: z.string(),
        })
        .array(),
      async (req, res) => {
        res.set("Cache-Control", "no-store");
        const { username, sessionid } = req.headers;

        return res.json(
          (
            await Promise.all(
              [
                ...this.core.applicationManager.loadedModules.officialFrontend.map((mod) => {
                  return { ...mod, moduleType: "officialFrontend" };
                }),
                ...this.core.applicationManager.loadedModules.frontend.map((mod) => {
                  return { ...mod, moduleType: "frontend" };
                }),
              ].map(async (module) => {
                const RESIZED_ICON_PATH = path.join("cache/modules/icons", `${module.config.id}`, "128.png");

                if (!(await this.core.fs.doesExist(RESIZED_ICON_PATH))) {
                  this.core.log.info("core:panel", `Generating 128x128 icon for ${module.config.id}`);

                  await this.core.fs.createDirectory(path.dirname(RESIZED_ICON_PATH));

                  const resizedIconPath = await this.core.image.resizeTo(
                    this.core.applicationManager.getModuleIcon(module.moduleType as "officialFrontend" | "frontend", module.config.id),
                    128,
                    128,
                    "webp",
                  );

                  await this.core.fs.copy(resizedIconPath, RESIZED_ICON_PATH);
                }

                return {
                  id: module.config.id,
                  displayName: module.config.displayName,
                  description: module.config.description,
                  type: module.moduleType as "officialFrontend" | "frontend",
                  url: this.core.isDevMode
                    ? // @ts-ignore
                      module.config?.devUrl || `/app/a/${module.config.id}`
                    : // @ts-ignore
                      module.config?.url || `/app/a/${module.config.id}`,
                  icon: this.core.image.createAuthenticatedImage(username, sessionid, AUTHENTICATED_IMAGE_TYPE.FILE, RESIZED_ICON_PATH),
                };
              }),
            )
          ).filter((x) => {
            return x !== undefined;
          }),
        );
      },
    );

    this.core.request.get(
      "/core/panel/quick-shortcuts",
      z
        .object({ name: z.string(), module: z.object({ id: z.string(), moduleType: z.string() }), icon: z.string(), url: z.string() })
        .array(),
      async (req, res) => {
        res.set("Cache-Control", "no-store");

        const { username, sessionid } = req.headers;

        const panel = new YourDashPanel(username);

        return res.json(
          (
            await Promise.all(
              (await panel.getQuickShortcuts()).map(async (shortcut) => {
                const module = this.core.applicationManager.loadedModules[shortcut.moduleType]?.find(
                  (mod) => mod.config.id === shortcut.id,
                );

                if (!module) {
                  return;
                }

                const RESIZED_ICON_PATH = path.join("cache/modules/icons", `${module.config.id}`, "64.png");

                if (!(await this.core.fs.doesExist(RESIZED_ICON_PATH))) {
                  this.core.log.info("core:panel", `Generating 64x64 icon for ${module.config.id}`);

                  await this.core.fs.createDirectory(path.dirname(RESIZED_ICON_PATH));

                  const resizedIconPath = await this.core.image.resizeTo(
                    this.core.applicationManager.getModuleIcon(shortcut.moduleType, shortcut.id),
                    64,
                    64,
                    "webp",
                  );

                  await this.core.fs.copy(resizedIconPath, RESIZED_ICON_PATH);
                  await this.core.fs.removePath(resizedIconPath);
                }

                let isOfficialFrontend: "frontend" | "officialFrontend" = "officialFrontend";

                // @ts-ignore
                if (module.config.url || module.config.devUrl) {
                  isOfficialFrontend = "frontend";
                }

                return {
                  name: module?.config.displayName || "Undefined name",
                  module: shortcut,
                  icon: this.core.image.createAuthenticatedImage(username, sessionid, AUTHENTICATED_IMAGE_TYPE.FILE, RESIZED_ICON_PATH),
                  // @ts-ignore
                  url: (isOfficialFrontend === "officialFrontend"
                    ? `/app/a/${module.config.id}`
                    : this.core.isDevMode
                      ? // @ts-ignore
                        module?.config?.devUrl! || ""
                      : // @ts-ignore
                        module?.config?.url! || "") as string,
                };
              }),
            )
          ).filter((x) => x !== undefined),
        );
      },
    );

    this.core.request.delete(
      "/core/panel/quick-shortcuts/:ind",
      z.object({ success: z.literal(true) }).or(z.object({ success: z.literal(false), error: z.string() })),
      async (req, res) => {
        res.set("Cache-Control", "");

        const { ind } = req.params;
        const { username } = req.headers;

        const panel = new YourDashPanel(username);
        try {
          await panel.removeQuickShortcut(parseInt(ind, 10));
        } catch (e) {
          return res.json({ success: false, error: "Unable to remove shortcut" });
        }

        return res.json({ success: true });
      },
    );

    this.core.request.post(
      "/core/panel/quick-shortcuts/create",
      z.object({ id: z.string(), moduleType: z.literal("frontend").or(z.literal("officialFrontend")) }),
      z.object({ success: z.boolean() }),
      async (req, res) => {
        const { username } = req.headers;
        const { id, moduleType } = req.body as { id: string; moduleType: "frontend" | "officialFrontend" };

        const panel = new YourDashPanel(username);

        await panel.createQuickShortcut({ id: id, moduleType: moduleType });

        return res.json({ success: true });
      },
    );

    this.core.request.get("/core/panel/position", z.object({ position: z.nativeEnum(YourDashPanelPosition) }), async (req, res) => {
      res.set("Cache-Control", "no-store");

      const { username } = req.headers as {
        username: string;
      };

      const panel = new YourDashPanel(username);

      return res.json({ position: await panel.getPanelPosition() });
    });

    this.core.request.get(
      "/core/panel/launcher-type",
      z.object({ launcher: z.nativeEnum(YourDashPanelLauncherType) }),
      async (req, res) => {
        res.set("Cache-Control", "no-store");
        const { username } = req.headers;

        const panel = new YourDashPanel(username);

        return res.json({ launcher: await panel.getLauncherType() });
      },
    );

    this.core.request.get("/core/panel/logo", z.object({ small: z.string(), medium: z.string(), large: z.string() }), async (req, res) => {
      const { username, sessionid } = req.headers;

      return res.json({
        small: this.core.image.createAuthenticatedImage(
          username,
          sessionid,
          AUTHENTICATED_IMAGE_TYPE.FILE,
          path.join("./logo_panel_small.avif"),
        ),
        medium: this.core.image.createAuthenticatedImage(
          username,
          sessionid,
          AUTHENTICATED_IMAGE_TYPE.FILE,
          path.join("./logo_panel_medium.avif"),
        ),
        large: this.core.image.createAuthenticatedImage(
          username,
          sessionid,
          AUTHENTICATED_IMAGE_TYPE.FILE,
          path.join("./logo_panel_large.avif"),
        ),
      });
    });
  }
}
