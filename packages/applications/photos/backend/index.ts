/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreApi from "@yourdash/backend/src/core/coreApi.js";
import FileSystemDirectory from "@yourdash/backend/src/core/fileSystem/fileSystemDirectory.js";
import BackendModule, { YourDashModuleArguments } from "@yourdash/backend/src/core/moduleManager/backendModule.js";

export default class PhotosModule extends BackendModule {
  constructor(args: YourDashModuleArguments) {
    super(args);

    this.API.request.get("/app/photos/:path", async (req, res) => {
      const { path } = req.params;

      const files = await coreApi.fs.getDirectory(path);

      return res.json(
        (await files.getChildren()).map((f) => {
          const item = await coreApi.fs.get(f);

          if (item.type) {
            return {
              name: item.getName(),
              path: item.path,
              type: "directory",
            };
          }

          return {
            name: item.getName(),
            path: item.path,
            type: item.(),
          };
        }),
      );
    });
  }
}
