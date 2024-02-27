/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreApi from "@yourdash/backend/src/core/coreApi.js";
import BackendModule, { YourDashModuleArguments } from "@yourdash/backend/src/core/moduleManager/backendModule.js";
import * as path from "path";

export default class PhotosModule extends BackendModule {
  constructor(args: YourDashModuleArguments) {
    super(args);

    this.API.core.users.addUserCreateListener(async (username) => {
      const userRootFS = coreApi.users.get(username).getFsPath();

      await coreApi.fs.createDirectory(path.join(userRootFS, "Photos"));
    });

    this.API.request.get("/app/photos/photo/:reqPath", async (req, res) => {
      const { reqPath } = req.params;

      const files = await coreApi.fs.getDirectory(reqPath);

      return res.json(
        await Promise.all(
          (await files.getChildren()).map(async (f) => {
            const item = await coreApi.fs.get(f);

            if (item.entityType === "directory") {
              return {
                name: item.getName(),
                path: item.path,
                type: "directory",
              };
            }

            return {
              name: item.getName(),
              path: item.path,
              type: "file",
            };
          }),
        ),
      );
    });

    this.API.request.get("/app/photos/categories", async (req, res) => {
      const { username } = req.headers as { username: string };

      const userFsPath = coreApi.users.get(username).getFsPath();
      const photosDirectory = await coreApi.fs.getDirectory(path.join(userFsPath, "Photos"));
      const photosDirectoryChildren = await photosDirectory.getChildren();
      const categories = (
        await Promise.all(
          photosDirectoryChildren.map(async (fsEntityPath) => {
            const fsEntity = await photosDirectory.getChild(fsEntityPath);
            if (fsEntity.entityType === "directory") {
              return fsEntity.getName();
            }

            return "";
          }),
        )
      ).filter((x) => x !== "");

      return res.json(categories);
    });

    this.API.request.get("/app/photos/category/:categoryPath", async (req, res) => {
      const { categoryPath } = req.params;
      const { username } = req.headers as { username: string };

      const userFsPath = coreApi.users.get(username).getFsPath();
      const photosDirectory = await coreApi.fs.getDirectory(path.join(userFsPath, "Photos"));

      if (await (await photosDirectory.getChild(categoryPath)).doesExist()) {
        const categoryFsEntity = await photosDirectory.getChild(categoryPath);

        if (!(await categoryFsEntity.doesExist()) || categoryFsEntity.entityType !== "directory") return res.json([]);

        return res.json(await categoryFsEntity.getChildren());
      }
    });
  }
}
