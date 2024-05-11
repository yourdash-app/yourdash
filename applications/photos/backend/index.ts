/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import BackendModule, { YourDashModuleArguments } from "@yourdash/backend/src/core/moduleManager/backendModule.js";
import path from "path";
import { MediaAlbumLargeGridItem } from "../shared/types/endpoints/media/album/large-grid.js";
import { MEDIA_TYPE } from "../shared/types/mediaType.js";
import { AUTHENTICATED_IMAGE_TYPE } from "@yourdash/backend/src/core/coreImage.js";
import { FILESYSTEM_ENTITY_TYPE } from "@yourdash/backend/src/core/fileSystem/fileSystemEntity.js";
import core from "@yourdash/backend/src/core/core.js";
import { AUTHENTICATED_VIDEO_TYPE } from "@yourdash/backend/src/core/coreVideo.js";
import FileSystemFile from "@yourdash/backend/src/core/fileSystem/fileSystemFile.js";

export default class PhotosBackend extends BackendModule {
  constructor(args: YourDashModuleArguments) {
    super(args);
  }

  public loadEndpoints() {
    super.loadEndpoints();

    this.api.request.setNamespace("app::photos");

    this.api.request.get("/album/@/*", async (req, res) => {
      const albumPath = req.params["0"] as string;

      const user = this.api.getUser(req);

      const albumDirectory = await this.api.core.fs.get(path.join(user.getFsPath(), albumPath));

      if (!(await albumDirectory?.doesExist())) return res.json({ error: "Not found" });

      if (albumDirectory?.entityType !== FILESYSTEM_ENTITY_TYPE.DIRECTORY)
        return res.json({ error: "Not a directory" });

      return res.json(
        (await albumDirectory.getChildren())
          .filter((child) => child.entityType === FILESYSTEM_ENTITY_TYPE.DIRECTORY)
          .map((child) => child.path.replace(user.getFsPath(), "")),
      );
    });

    this.api.request.get("/media/album/large-grid/@/*", async (req, res) => {
      const itemPath = req.params["0"] as string;
      const user = this.api.getUser(req);

      const item = await this.api.core.fs.get(path.join(user.getFsPath(), itemPath));

      if (!(await item.doesExist())) return res.json({ error: true });

      if (item.entityType !== FILESYSTEM_ENTITY_TYPE.DIRECTORY) return res.json({ error: true });

      return res.json(
        await Promise.all(
          (await item.getChildren()).map(async (child) => {
            let childType: MEDIA_TYPE;

            if (child.entityType === FILESYSTEM_ENTITY_TYPE.DIRECTORY) {
              childType = MEDIA_TYPE.ALBUM;
            }

            if (child.entityType === FILESYSTEM_ENTITY_TYPE.FILE) {
              const c = child as unknown as FileSystemFile;
              switch (c.getType()) {
                case "image":
                  childType = MEDIA_TYPE.IMAGE;
                  break;
                case "video":
                  childType = MEDIA_TYPE.VIDEO;
                  break;
                default:
                  return undefined;
              }
            }

            switch (childType) {
              case MEDIA_TYPE.VIDEO:
                return <MediaAlbumLargeGridItem<MEDIA_TYPE.VIDEO>>{
                  type: MEDIA_TYPE.VIDEO,
                  path: child.path.replace(user.getFsPath(), ""),
                  mediaUrl: this.api.core.video.createAuthenticatedVideo(
                    user.username,
                    AUTHENTICATED_VIDEO_TYPE.FILE,
                    child.path,
                  ),
                  metadata: {
                    width: (await core.video.getVideoDimensions(child.path)).width,
                    height: (await core.video.getVideoDimensions(child.path)).height,
                  },
                };
              case MEDIA_TYPE.IMAGE:
                return <MediaAlbumLargeGridItem<MEDIA_TYPE.IMAGE>>{
                  type: MEDIA_TYPE.IMAGE,
                  path: child.path.replace(user.getFsPath(), ""),
                  mediaUrl: await this.api.core.image.createResizedAuthenticatedImage(
                    user.username,
                    AUTHENTICATED_IMAGE_TYPE.FILE,
                    child.path,
                    256,
                    512,
                    "webp",
                  ),
                  metadata: {
                    width: (await core.image.getImageDimensions(child.path)).width,
                    height: (await core.image.getImageDimensions(child.path)).height,
                  },
                };
              case MEDIA_TYPE.ALBUM:
                return <MediaAlbumLargeGridItem<MEDIA_TYPE.ALBUM>>{
                  type: MEDIA_TYPE.ALBUM,
                  path: child.path.replace(user.getFsPath(), ""),
                };
            }
          }),
        ),
      );
    });

    // this.API.request.get(`${this.rootPath}/albums`, async (req, res) => {
    //   const { username } = req.headers as { username: string };
    //
    //   const userFsPath = core.users.get(username).getFsPath();
    //   const album = new PhotoAlbum(username, path.join(userFsPath, "Photos"));
    //
    //   return res.json(await album.getSubAlbumsPaths());
    // });
    //
    // this.API.request.get(`${this.rootPath}/album/*`, async (req, res) => {
    //   const albumPath = req.params["0"] as string;
    //   const { username } = req.headers as { username: string };
    //   const album = new PhotoAlbum(username, albumPath);
    //
    //   return res.json(await album.getIPhotoAlbum());
    // });
    //
    // this.API.request.get(`${this.rootPath}/grid-photo/*`, async (req, res) => {
    //   const photoPath = req.params["0"] as string;
    //   const { username } = req.headers as { username: string };
    //
    //   const photo = new Photo(username, photoPath);
    //
    //   return res.json(await photo.getIGridPhoto());
    // });
    //
    // this.API.request.get(`${this.rootPath}/grid-video/*`, async (req, res) => {
    //   const videoPath = req.params["0"] as string;
    //   const { username } = req.headers as { username: string };
    //
    //   const video = new Video(username, videoPath);
    //
    //   return res.json(await video.getIGridVideo());
    // });
    //
    // this.API.request.get(`${this.rootPath}/grid-photos/:photoAmount/*`, async (req, res) => {
    //   const photoPath = req.params["0"].split(";.;") as string[];
    //   const photoAmount = Number(req.params.photoAmount);
    //   const { username } = req.headers as { username: string };
    //
    //   const photos = [];
    //   for (let i = 0; i < photoAmount; i++) {
    //     if (photoPath[i] === undefined) {
    //       break;
    //     }
    //
    //     const photo = new Photo(username, photoPath[i]);
    //     photos.push(await photo.getIGridPhoto());
    //   }
    //
    //   return res.json(await Promise.all(photos));
    // });
    //
    // this.API.request.get(`${this.rootPath}/grid-videos/:videoAmount/*`, async (req, res) => {
    //   const videoPath = req.params["0"].split(";.;") as string[];
    //   const videoAmount = Number(req.params.videoAmount);
    //   const { username } = req.headers as { username: string };
    //
    //   const videos = [];
    //   for (let i = 0; i < videoAmount; i++) {
    //     if (videoPath[i] === undefined) {
    //       break;
    //     }
    //
    //     const video = new Video(username, videoPath[i]);
    //     videos.push(await video.getIGridVideo());
    //   }
    //
    //   return res.json(await Promise.all(videos));
    // });
    //
    // this.API.request.get(`${this.rootPath}/photo/*`, async (req, res) => {
    //   const photoPath = req.params["0"] as string;
    //   const { username } = req.headers as { username: string };
    //
    //   const photo = new Photo(username, photoPath);
    //
    //   try {
    //     return res.json(await photo.getIPhoto());
    //   } catch (e) {
    //     return res.json({ error: e });
    //   }
    // });
    //
    // this.API.request.get(`${this.rootPath}/video/*`, async (req, res) => {
    //   const videoPath = req.params["0"] as string;
    //   const { username } = req.headers as { username: string };
    //
    //   const video = new Video(username, videoPath);
    //
    //   try {
    //     return res.json(await video.getIVideo());
    //   } catch (e) {
    //     return res.json({ error: e });
    //   }
    // });
    //
    // // FIXME: allow access without authentication
    // this.API.request.get(`${this.rootPath}/download-photo/*`, async (req, res) => {
    //   const photoPath = req.params["0"] as string;
    //   const { username } = req.headers as { username: string };
    //
    //   const photo = new Photo(username, photoPath);
    //
    //   res.setHeader("Content-Disposition", `attachment; filename="${pth.basename(photoPath)}"`);
    //
    //   return res.json(await photo.getIPhoto());
    // });

    // this.API.request.get("/app/photos/photo/*", async (req, res) => {
    //   const reqPath = req.params["0"] as string;
    //   const { username } = req.headers as { username: string };
    //
    //   const userFsPath = core.users.get(username).getFsPath();
    //   const file = await core.fs.get(path.join(userFsPath, "Photos", reqPath));
    //
    //   if (!(await file?.doesExist()) || file === null) {
    //     console.log(path.join(userFsPath, "Photos", reqPath));
    //     console.log("Unknown dir");
    //     return res.json({ error: true });
    //   }
    //
    //   if (file.entityType === "directory") {
    //     return res.json({
    //       error: true,
    //     });
    //   }
    //
    //   if (file.getType() !== "image") {
    //     return res.json({ error: true });
    //   }
    //
    //   const imSize = imageSize(file.path);
    //
    //   return res.json({
    //     fileName: file.getName(),
    //     date: new Date((await file.getMetadata()).birthtime).toString(),
    //     dimensions: {
    //       width: imSize.width,
    //       height: imSize.height,
    //     },
    //     url: this.API.core.image.createAuthenticatedImage(username, AUTHENTICATED_IMAGE_TYPE.FILE, file.path),
    //   } as IPhoto);
    // });
    //
    // this.API.request.get("/app/photos/categories", async (req, res) => {
    //   const { username } = req.headers as { username: string };
    //
    //   const userFsPath = core.users.get(username).getFsPath();
    //   const photosDirectory = await core.fs.getDirectory(path.join(userFsPath, "Photos"));
    //
    //   if (!(await photosDirectory?.doesExist()) || photosDirectory === null) {
    //     return res.json([]);
    //   }
    //
    //   const photosDirectoryChildren = await photosDirectory.getChildren();
    //   const categories = (
    //     await Promise.all(
    //       photosDirectoryChildren.map(async (fsEntityPath) => {
    //         const fsEntity = await photosDirectory.getChild(fsEntityPath);
    //         if (fsEntity.entityType === "directory") {
    //           return fsEntity.getName();
    //         }
    //
    //         return "";
    //       }),
    //     )
    //   ).filter((x) => x !== "");
    //
    //   return res.json(categories);
    // });
    //
    // this.API.request.get("/app/photos/category/:categoryPath", async (req, res) => {
    //   const { categoryPath } = req.params;
    //   const { username } = req.headers as { username: string };
    //
    //   const userFsPath = core.users.get(username).getFsPath();
    //   const photosDirectory = await core.fs.getDirectory(path.join(userFsPath, "Photos"));
    //
    //   if (await (await photosDirectory.getChild(categoryPath)).doesExist()) {
    //     const categoryFsEntity = await photosDirectory.getChild(categoryPath);
    //
    //     if (!(await categoryFsEntity.doesExist()) || categoryFsEntity.entityType !== "directory") {
    //       return res.json([]);
    //     }
    //
    //     return res.json((await categoryFsEntity.getChildren()).map((c) => path.join(categoryPath, c)));
    //   }
    // });
  }
}
