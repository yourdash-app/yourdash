/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { promises as fs } from "fs";
import path from "path";
import { YourDashBackendModule, YourDashModuleArguments } from "@yourdash/backend/src/core/coreApplicationManager.js";
import core from "@yourdash/backend/src/core/core.js";
import EndpointTabViewHome from "../shared/types/endpoints/tabView/home.js";

export default class FilesModule extends YourDashBackendModule {
  constructor(args: YourDashModuleArguments) {
    super(args);
  }

  public loadEndpoints() {
    super.loadEndpoints();

    core.request.setNamespace(`app/${this.api.moduleId}`);

    core.request.get(`/`, async (req, res) => {
      return res.json({ message: `Hello world from ${this.api.moduleId}! 👋` });
    });

    core.request.get(`/list/dir/@/`, async (req, res) => {
      // path
      const p = "/";

      const user = core.users.get(req.username);

      try {
        const contents = await fs.readdir(path.join(user.path, "fs", p));

        return res.json({
          contents: contents,
        });
      } catch (_err) {
        return res.json({
          contents: [],
        });
      }
    });

    core.request.get(`/list/dir/@/:path`, async (req, res) => {
      // path
      const p = req.params.path;

      const user = core.users.get(req.username);

      try {
        const contents = await fs.readdir(path.join(user.path, "fs", p));

        return res.json({
          contents: contents,
        });
      } catch (_err) {
        return res.json({
          contents: [],
        });
      }
    });

    core.request.get("/tabView/home", async (req, res) => {
      return res.json({
        recentFiles: [],
        sharedFiles: [],
        connections: [
          {
            serviceName: "Google Drive",
            description: "Google cloud storage platform",
            url: "https://drive.google.com",
            quota: { max: 5, usage: Math.random() * 5, unit: "GB" },
            id: "1000",
            serviceLogo: undefined,
          },
        ],
      } satisfies EndpointTabViewHome);
    });
  }
}
