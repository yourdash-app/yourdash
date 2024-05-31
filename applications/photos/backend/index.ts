/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

// TODO: generate video thumbnails into a subfolder of the thumbnails cache folder and
//  save a copy of them pre-resized alongside the photos as resizing images is also costly

import core from "@yourdash/backend/src/core/core.js";
import { AUTHENTICATED_IMAGE_TYPE } from "@yourdash/backend/src/core/coreImage.js";
import { FILESYSTEM_ENTITY_TYPE } from "@yourdash/backend/src/core/fileSystem/fileSystemEntity.js";
import FileSystemFile from "@yourdash/backend/src/core/fileSystem/fileSystemFile.js";
import BackendModule, { YourDashModuleArguments } from "@yourdash/backend/src/core/moduleManager/backendModule.js";
import { chunk } from "@yourdash/shared/web/helpers/array.js";
import path from "path";
import { MediaAlbumLargeGridItem } from "../shared/types/endpoints/media/album/large-grid.js";
import EndpointMediaRaw from "../shared/types/endpoints/media/album/raw.js";
import { MEDIA_TYPE } from "../shared/types/mediaType.js";
import { AUTHENTICATED_VIDEO_TYPE } from "@yourdash/backend/src/core/coreVideo.js";
import timeMethod from "@yourdash/backend/src/lib/time.js";

export default class PhotosBackend extends BackendModule {
  constructor(args: YourDashModuleArguments) {
    super(args);

    this.api.core.users.getAllUsers().then((users) => {
      users.forEach((u) => {
        const userFsPath = this.api.core.users.get(u).getFsPath();

        this.api.core.fs.doesExist(path.join()).then((exists) => {
          if (!exists) {
            this.api.core.fs.createDirectory(path.join(userFsPath, "photos")).then(() => {});
          }
        });
      });
    });

    return this;
  }

  public loadEndpoints() {
    super.loadEndpoints();

    this.api.request.setNamespace("app::photos");

    this.api.request.get(
      "/media/album/large-grid/:page/@/*",
      async (req, res) => {
        const { sessionid } = req.headers;
        const itemPath = req.params["0"] as string;
        const page = Number(req.params.page);
        const user = this.api.getUser(req);

        if (typeof page !== "number" || page < 0) return res.json({ error: "a page must be provided" });

        const item = await this.api.core.fs.get(path.join(user.getFsPath(), itemPath));

        if (!(await item.doesExist())) return res.json({ error: true });

        if (item.entityType !== FILESYSTEM_ENTITY_TYPE.DIRECTORY)
          return res.json({ error: "The path supplied is not a directory." });

        const thumbnailsDirectory = path.join(item.path, ".yd-thumbnails");

        if (!(await this.api.core.fs.doesExist(thumbnailsDirectory))) {
          await this.api.core.fs.createDirectory(thumbnailsDirectory);
          this.api.core.log.success("app:photos", `Created thumbnails directory: ${thumbnailsDirectory}`);
        }

        const PAGE_SIZE = 64;

        return res.json(
          (
            await Promise.all(
              chunk(await item.getChildren(), PAGE_SIZE)?.[page]?.map(async (child) => {
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

                const childPath = child.path;
                const childThumbnailPath = path.join(thumbnailsDirectory, path.basename(childPath)) + ".webp";

                switch (childType) {
                  case MEDIA_TYPE.VIDEO: {
                    // if a thumbnail already exists, return it
                    if (await this.api.core.fs.doesExist(childThumbnailPath)) {
                      // Error could occur here
                      const dimensions = await core.image.getImageDimensions(childThumbnailPath);

                      if (dimensions.width === 0 || dimensions.height === 0) {
                        this.api.core.log.error(
                          "app:photos",
                          `Failed to get dimensions for video pre-generated thumbnail: ${childThumbnailPath}`,
                        );
                      }

                      return <MediaAlbumLargeGridItem<MEDIA_TYPE.VIDEO>>{
                        type: MEDIA_TYPE.VIDEO,
                        path: childPath.replace(user.getFsPath(), ""),
                        mediaUrl: this.api.core.image.createAuthenticatedImage(
                          user.username,
                          sessionid,
                          AUTHENTICATED_IMAGE_TYPE.FILE,
                          childThumbnailPath,
                        ),
                        metadata: {
                          width: dimensions.width || 400,
                          height: dimensions.height || 400,
                        },
                      };
                    }

                    // create the thumbnail
                    this.api.core.log.info("app:photos", "creating video thumb for " + childPath);

                    const thumbnailPath = (
                      await timeMethod(() => this.api.core.video.createThumbnail(childPath), "createVideoThumbnail")
                    ).callbackResult;

                    const dimensions = await core.image.getImageDimensions(thumbnailPath);

                    const resizedThumbnailPath = await this.api.core.image.resizeTo(
                      thumbnailPath,
                      320 * (dimensions.width / dimensions.height) || 200,
                      320,
                      "webp",
                    );

                    // remove the original thumbnail
                    await this.api.core.fs.removePath(thumbnailPath);

                    // copy the thumbnail to the thumbnails subdirectory
                    await this.api.core.fs.copy(resizedThumbnailPath, childThumbnailPath);

                    // remove the resized thumbnail
                    await this.api.core.fs.removePath(resizedThumbnailPath);

                    return <MediaAlbumLargeGridItem<MEDIA_TYPE.VIDEO>>{
                      type: MEDIA_TYPE.VIDEO,
                      path: childPath.replace(user.getFsPath(), ""),
                      mediaUrl: this.api.core.image.createAuthenticatedImage(
                        user.username,
                        sessionid,
                        AUTHENTICATED_IMAGE_TYPE.FILE,
                        childThumbnailPath,
                      ),
                      metadata: {
                        width: dimensions.width || 400,
                        height: dimensions.height || 400,
                      },
                    };
                  }
                  case MEDIA_TYPE.IMAGE: {
                    // use cached thumbnails if they exist
                    if (await this.api.core.fs.doesExist(childThumbnailPath)) {
                      const dimensions = await core.image.getImageDimensions(childPath);

                      return <MediaAlbumLargeGridItem<MEDIA_TYPE.IMAGE>>{
                        type: MEDIA_TYPE.IMAGE,
                        path: childPath.replace(user.getFsPath(), ""),
                        mediaUrl: await this.api.core.image.createResizedAuthenticatedImage(
                          user.username,
                          sessionid,
                          AUTHENTICATED_IMAGE_TYPE.FILE,
                          childThumbnailPath,
                          320 * (dimensions.width / dimensions.height) || 200,
                          320,
                          "webp",
                        ),
                        metadata: {
                          width: dimensions.width || 400,
                          height: dimensions.height || 400,
                        },
                      };
                    }

                    console.log("creating image thumb for " + childPath);

                    const imageDimensions = await core.image.getImageDimensions(childPath);
                    console.log(childPath);

                    // create the thumbnail from the video's first frame
                    const thumbnail: string | null = (
                      await timeMethod(
                        () =>
                          this.api.core.image.resizeTo(
                            childPath,
                            320 * (imageDimensions.width / imageDimensions.height) || 200,
                            320,
                            "webp",
                          ),
                        "createResizedAuthenticatedImage",
                      )
                    ).callbackResult;

                    if (!thumbnail) {
                      return <MediaAlbumLargeGridItem<MEDIA_TYPE.IMAGE>>{
                        type: MEDIA_TYPE.IMAGE,
                        path: childPath.replace(user.getFsPath(), ""),
                        mediaUrl: this.api.core.image.createAuthenticatedImage(
                          user.username,
                          sessionid,
                          AUTHENTICATED_IMAGE_TYPE.FILE,
                          "defaults/default_avatar.avif",
                        ),
                        metadata: {
                          width: imageDimensions.width || 400,
                          height: imageDimensions.height || 400,
                        },
                      };
                    }

                    // copy the thumbnail to the thumbnails subdirectory
                    await this.api.core.fs.copy(thumbnail, childThumbnailPath);

                    // remove the original thumbnail
                    await this.api.core.fs.removePath(thumbnail);

                    return <MediaAlbumLargeGridItem<MEDIA_TYPE.IMAGE>>{
                      type: MEDIA_TYPE.IMAGE,
                      path: childPath.replace(user.getFsPath(), ""),
                      mediaUrl: this.api.core.image.createAuthenticatedImage(
                        user.username,
                        sessionid,
                        AUTHENTICATED_IMAGE_TYPE.FILE,
                        childThumbnailPath,
                      ),
                      metadata: {
                        width: imageDimensions.width || 400,
                        height: imageDimensions.height || 400,
                      },
                    };
                  }
                  case MEDIA_TYPE.ALBUM: {
                    if (path.basename(childPath) === ".yd-thumbnails") {
                      return undefined;
                    }

                    return <MediaAlbumLargeGridItem<MEDIA_TYPE.ALBUM>>{
                      type: MEDIA_TYPE.ALBUM,
                      path: childPath.replace(user.getFsPath(), ""),
                    };
                  }
                }
              }),
            )
          ).filter((i) => i !== undefined && i !== null),
        );
      },
      { debugTimer: true },
    );

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
          .filter((i) => path.basename(i.path) !== ".yd-thumbnails")
          .map((child) => {
            return child.path.replace(user.getFsPath(), "");
          }),
      );
    });

    this.api.request.get("/media/raw/@/*", async (req, res) => {
      const { sessionid } = req.headers;
      const itemPath = req.params["0"] as string;
      const user = this.api.getUser(req);

      const item = await this.api.core.fs.get(path.join(user.getFsPath(), itemPath));

      if (!(await item.doesExist())) return res.json({ error: true });

      if (item.entityType !== FILESYSTEM_ENTITY_TYPE.FILE)
        return res.json({ error: "The path supplied is not a file." });

      let itemType: MEDIA_TYPE;

      if (item.entityType === FILESYSTEM_ENTITY_TYPE.FILE) {
        const c = item as unknown as FileSystemFile;
        switch (c.getType()) {
          case "image":
            itemType = MEDIA_TYPE.IMAGE;
            break;
          case "video":
            itemType = MEDIA_TYPE.VIDEO;
            break;
          default:
            return res.json({ error: true });
        }
      }

      switch (itemType) {
        case MEDIA_TYPE.VIDEO: {
          const dimensions = await core.video.getVideoDimensions(item.path);

          return res.json(<EndpointMediaRaw>{
            type: MEDIA_TYPE.VIDEO,
            path: item.path.replace(user.getFsPath(), ""),
            mediaUrl: this.api.core.video.createAuthenticatedVideo(
              user.username,
              sessionid,
              AUTHENTICATED_VIDEO_TYPE.FILE,
              item.path,
            ),
            metadata: {
              width: dimensions.width || 400,
              height: dimensions.height || 400,
            },
          });
        }
        case MEDIA_TYPE.IMAGE: {
          const dimensions = await core.image.getImageDimensions(item.path);

          return res.json(<EndpointMediaRaw>{
            type: MEDIA_TYPE.IMAGE,
            path: item.path.replace(user.getFsPath(), ""),
            mediaUrl: this.api.core.image.createAuthenticatedImage(
              user.username,
              sessionid,
              AUTHENTICATED_IMAGE_TYPE.FILE,
              item.path,
            ),
            metadata: {
              width: dimensions.width || 400,
              height: dimensions.height || 400,
            },
          });
        }
      }
    });
  }
}
