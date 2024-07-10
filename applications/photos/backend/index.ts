/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

// TODO: generate video thumbnails into a subfolder of the thumbnails cache folder and
//  save a copy of them pre-resized alongside the photos as resizing images is also costly

import { AUTHENTICATED_IMAGE_TYPE } from "@yourdash/backend/src/core/coreImage.js";
import * as console from "node:console";
import path from "path";
import FileSystemDirectory from "@yourdash/backend/src/core/fileSystem/fileSystemDirectory.js";
import BackendModule, { YourDashModuleArguments } from "@yourdash/backend/src/core/moduleManager/backendModule.js";
import FileSystemFile from "@yourdash/backend/src/core/fileSystem/fileSystemFile.js";

export default class PhotosBackend extends BackendModule {
  constructor(args: YourDashModuleArguments) {
    super(args);

    this.api.core.users.getAllUsers().then((users) => {
      users.forEach((u) => {
        const userFsPath = this.api.core.users.get(u).getFsPath();

        this.api.core.fs.doesExist(path.join()).then((exists) => {
          if (!exists) {
            this.api.core.fs.createDirectory(path.join(userFsPath, "photos")).then(() => {
              this.api.core.log.info("app/photos", `Created user photos directory: ${userFsPath}/photos`);
            });
          }
        });
      });
    });

    return this;
  }

  async deDuplicatePhotos() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const userHashes: Map<string, Set<string>> = new Map();

    const users = await this.api.core.users.getAllUsers();

    await Promise.all(
      users.map(async (u) => {
        userHashes.set(u, new Set());

        // get user's photos
        let usersPhotos: string[];

        this.api.core.log.info("Finding users photos");

        const PHOTOS_FS_PATH = path.join(this.api.core.users.get(u).getFsPath(), "photos");

        // recursively get all photos
        async function getPhotosRecursively(dirPath: string) {
          const dir = (await self.api.core.fs.getDirectory(dirPath)) as FileSystemDirectory;

          if (dir.isNull()) return;

          for (const p of await dir.getChildFiles()) {
            if (p.getType() === "image") {
              usersPhotos.push(p.path);
            }
          }

          for (const d of await dir.getChildDirectories()) {
            await getPhotosRecursively(d.path);
          }
        }

        await getPhotosRecursively(PHOTOS_FS_PATH);

        // hash every photo
        await Promise.all(
          usersPhotos.map(async (p) => {
            const fileHash = await ((await self.api.core.fs.getFile(p)) as FileSystemFile).getContentHash();

            // if a hash already exists, flag the conflicting paths and put in array
            if (userHashes.get(u).has(fileHash)) {
              console.log(`Duplicate photo detected: ${p}`);

              return;
            }

            userHashes.get(u).add(fileHash);
          }),
        );

        // TODO: save conflicts to a database
        //       send push notif to user
      }),
    );
  }

  public loadEndpoints() {
    super.loadEndpoints();

    this.api.request.setNamespace("app/photos");

    // this.api.request.get("/media/album/subAlbums/@/*", async (req, res) => {
    //   const itemPath = req.params["0"] as string;
    //   const user = this.api.getUser(req);
    //
    //   const item = await this.api.core.fs.get(path.join(user.getFsPath(), itemPath));
    //
    //   if (item.entityType !== FILESYSTEM_ENTITY_TYPE.DIRECTORY)
    //     return res.status(400).json({ error: "The path supplied is not a directory." });
    //
    //   item.getChildDirectories().then((dirs) => {
    //     return res.json(
    //       dirs
    //         .map((d) => {
    //           if (d.getName() === ".yd-thumbnails") return null;
    //
    //           return {
    //             path: d.path.replace(user.getFsPath(), ""),
    //             displayName: d.getName(),
    //           };
    //         })
    //         .filter((d) => d !== null),
    //     );
    //   });
    // });
    //
    // // return dimensions of each image and video with their fs path
    // this.api.request.get(
    //   "/media/album/:page/@/*",
    //   async (req, res) => {
    //     const { sessionid } = req.headers;
    //     const itemPath = req.params["0"] as string;
    //     const page = Number(req.params.page);
    //     const user = this.api.getUser(req);
    //
    //     if (page < 0) return res.json({ error: "a valid page must be provided" });
    //
    //     const item = await this.api.core.fs.get(path.join(user.getFsPath(), itemPath));
    //
    //     if (!(await item.doesExist())) {
    //       return res.json({
    //         error: true,
    //       });
    //     }
    //
    //     if (item.entityType !== FILESYSTEM_ENTITY_TYPE.DIRECTORY) {
    //       return res.json({ error: "The path supplied is not a directory." });
    //     }
    //
    //     const thumbnailsDirectory = path.join(item.path, ".yd-thumbnails");
    //
    //     if (!(await this.api.core.fs.doesExist(thumbnailsDirectory))) {
    //       await this.api.core.fs.createDirectory(thumbnailsDirectory);
    //       this.api.core.log.success("app/photos", `Created thumbnails directory: ${thumbnailsDirectory}`);
    //     }
    //
    //     const PAGE_SIZE = 64;
    //
    //     return res.json(
    //       (
    //         await Promise.all(
    //           chunk(await item.getChildren(), PAGE_SIZE)?.[page]?.map(async (child) => {
    //             let childType: MEDIA_TYPE;
    //
    //             if (child.entityType === FILESYSTEM_ENTITY_TYPE.FILE) {
    //               const c = child as unknown as FileSystemFile;
    //               switch (c.getType()) {
    //                 case "image":
    //                   childType = MEDIA_TYPE.IMAGE;
    //                   break;
    //                 case "video":
    //                   childType = MEDIA_TYPE.VIDEO;
    //                   break;
    //                 default:
    //                   return undefined;
    //               }
    //             }
    //
    //             const childPath = child.path;
    //             const childThumbnailPath = path.join(thumbnailsDirectory, path.basename(childPath)) + ".webp";
    //
    //             switch (childType) {
    //               case MEDIA_TYPE.VIDEO: {
    //                 // if a thumbnail already exists, return it
    //                 if (await this.api.core.fs.doesExist(childThumbnailPath)) {
    //                   // Error could occur here
    //                   const dimensions = (await core.image.getImageDimensions(childThumbnailPath)) || {
    //                     width: 0,
    //                     height: 0,
    //                   };
    //
    //                   if (dimensions.width === 0 || dimensions.height === 0) {
    //                     this.api.core.log.error(
    //                       "app/photos",
    //                       `Failed to get dimensions for video pre-generated thumbnail: ${childThumbnailPath}`,
    //                     );
    //                   }
    //
    //                   return <MediaAlbumLargeGridItem<MEDIA_TYPE.VIDEO>>{
    //                     type: MEDIA_TYPE.VIDEO,
    //                     path: childPath.replace(user.getFsPath(), ""),
    //                     mediaUrl: this.api.core.image.createAuthenticatedImage(
    //                       user.username,
    //                       sessionid,
    //                       AUTHENTICATED_IMAGE_TYPE.FILE,
    //                       childThumbnailPath,
    //                     ),
    //                     metadata: {
    //                       width: dimensions.width || 400,
    //                       height: dimensions.height || 400,
    //                     },
    //                   };
    //                 }
    //
    //                 // create the thumbnail
    //                 this.api.core.log.info("app/photos", "creating video thumb for " + childPath);
    //
    //                 const thumbnailPath = (await timeMethod(() => this.api.core.video.createThumbnail(childPath), "createVideoThumbnail"))
    //                   .callbackResult;
    //
    //                 const dimensions = (await core.image.getImageDimensions(thumbnailPath)) || { width: 0, height: 0 };
    //
    //                 const resizedThumbnailPath = await this.api.core.image.resizeTo(
    //                   thumbnailPath,
    //                   320 * (dimensions.width / dimensions.height) || 200,
    //                   320,
    //                   "webp",
    //                 );
    //
    //                 // remove the original thumbnail
    //                 await this.api.core.fs.removePath(thumbnailPath);
    //
    //                 // copy the thumbnail to the thumbnails subdirectory
    //                 await this.api.core.fs.copy(resizedThumbnailPath, childThumbnailPath);
    //
    //                 // remove the resized thumbnail
    //                 await this.api.core.fs.removePath(resizedThumbnailPath);
    //
    //                 return <MediaAlbumLargeGridItem<MEDIA_TYPE.VIDEO>>{
    //                   type: MEDIA_TYPE.VIDEO,
    //                   path: childPath.replace(user.getFsPath(), ""),
    //                   mediaUrl: this.api.core.image.createAuthenticatedImage(
    //                     user.username,
    //                     sessionid,
    //                     AUTHENTICATED_IMAGE_TYPE.FILE,
    //                     childThumbnailPath,
    //                   ),
    //                   metadata: {
    //                     width: dimensions.width || 400,
    //                     height: dimensions.height || 400,
    //                   },
    //                 };
    //               }
    //               case MEDIA_TYPE.IMAGE: {
    //                 // use cached thumbnails if they exist
    //                 if (await this.api.core.fs.doesExist(childThumbnailPath)) {
    //                   const dimensions = (await core.image.getImageDimensions(childPath)) || { width: 0, height: 0 };
    //
    //                   return <MediaAlbumLargeGridItem<MEDIA_TYPE.IMAGE>>{
    //                     type: MEDIA_TYPE.IMAGE,
    //                     path: childPath.replace(user.getFsPath(), ""),
    //                     mediaUrl: await this.api.core.image.createResizedAuthenticatedImage(
    //                       user.username,
    //                       sessionid,
    //                       AUTHENTICATED_IMAGE_TYPE.FILE,
    //                       childThumbnailPath,
    //                       320 * (dimensions.width / dimensions.height) || 200,
    //                       320,
    //                       "webp",
    //                     ),
    //                     metadata: {
    //                       width: dimensions.width || 400,
    //                       height: dimensions.height || 400,
    //                     },
    //                   };
    //                 }
    //
    //                 console.log("creating image thumb for " + childPath);
    //
    //                 const imageDimensions = (await core.image.getImageDimensions(childPath)) || { width: 0, height: 0 };
    //                 console.log(childPath);
    //
    //                 // create the thumbnail from the video's first frame
    //                 const thumbnail: string | null = (
    //                   await timeMethod(
    //                     () =>
    //                       this.api.core.image.resizeTo(
    //                         childPath,
    //                         320 * (imageDimensions.width / imageDimensions.height) || 200,
    //                         320,
    //                         "webp",
    //                       ),
    //                     "createResizedAuthenticatedImage",
    //                   )
    //                 ).callbackResult;
    //
    //                 if (!thumbnail) {
    //                   return <MediaAlbumLargeGridItem<MEDIA_TYPE.IMAGE>>{
    //                     type: MEDIA_TYPE.IMAGE,
    //                     path: childPath.replace(user.getFsPath(), ""),
    //                     mediaUrl: this.api.core.image.createAuthenticatedImage(
    //                       user.username,
    //                       sessionid,
    //                       AUTHENTICATED_IMAGE_TYPE.FILE,
    //                       "defaults/default_avatar.avif",
    //                     ),
    //                     metadata: {
    //                       width: imageDimensions.width || 400,
    //                       height: imageDimensions.height || 400,
    //                     },
    //                   };
    //                 }
    //
    //                 // copy the thumbnail to the thumbnails subdirectory
    //                 await this.api.core.fs.copy(thumbnail, childThumbnailPath);
    //
    //                 // remove the original thumbnail
    //                 await this.api.core.fs.removePath(thumbnail);
    //
    //                 return <MediaAlbumLargeGridItem<MEDIA_TYPE.IMAGE>>{
    //                   type: MEDIA_TYPE.IMAGE,
    //                   path: childPath.replace(user.getFsPath(), ""),
    //                   mediaUrl: this.api.core.image.createAuthenticatedImage(
    //                     user.username,
    //                     sessionid,
    //                     AUTHENTICATED_IMAGE_TYPE.FILE,
    //                     childThumbnailPath,
    //                   ),
    //                   metadata: {
    //                     width: imageDimensions.width || 400,
    //                     height: imageDimensions.height || 400,
    //                   },
    //                 };
    //               }
    //             }
    //           }),
    //         )
    //       ).filter((i) => i !== undefined && i !== null),
    //     );
    //   },
    //   { debugTimer: true },
    // );
    //
    // this.api.request.get("/album/@/*", async (req, res) => {
    //   const albumPath = req.params["0"] as string;
    //
    //   const user = this.api.getUser(req);
    //
    //   const albumDirectory = await this.api.core.fs.get(path.join(user.getFsPath(), albumPath));
    //
    //   if (!(await albumDirectory?.doesExist())) return res.json({ error: "Not found" });
    //
    //   if (albumDirectory?.entityType !== FILESYSTEM_ENTITY_TYPE.DIRECTORY) return res.json({ error: "Not a directory" });
    //
    //   return res.json(
    //     (await albumDirectory.getChildren())
    //       .filter((child) => child.entityType === FILESYSTEM_ENTITY_TYPE.DIRECTORY)
    //       .filter((i) => path.basename(i.path) !== ".yd-thumbnails")
    //       .map((child) => {
    //         return child.path.replace(user.getFsPath(), "");
    //       }),
    //   );
    // });
    //
    // this.api.request.get("/media/raw/@/*", async (req, res) => {
    //   const { sessionid } = req.headers;
    //   const itemPath = req.params["0"] as string;
    //   const user = this.api.getUser(req);
    //
    //   const item = await this.api.core.fs.get(path.join(user.getFsPath(), itemPath));
    //
    //   if (!(await item.doesExist())) return res.json({ error: true });
    //
    //   if (item.entityType !== FILESYSTEM_ENTITY_TYPE.FILE) return res.json({ error: "The path supplied is not a file." });
    //
    //   let itemType: MEDIA_TYPE;
    //
    //   if (item.entityType === FILESYSTEM_ENTITY_TYPE.FILE) {
    //     const c = item as unknown as FileSystemFile;
    //     switch (c.getType()) {
    //       case "image":
    //         itemType = MEDIA_TYPE.IMAGE;
    //         break;
    //       case "video":
    //         itemType = MEDIA_TYPE.VIDEO;
    //         break;
    //       default:
    //         return res.json({ error: true });
    //     }
    //   }
    //
    //   switch (itemType) {
    //     case MEDIA_TYPE.VIDEO: {
    //       const dimensions = await core.video.getVideoDimensions(item.path);
    //
    //       return res.json(<EndpointMediaRaw>{
    //         type: MEDIA_TYPE.VIDEO,
    //         path: item.path.replace(user.getFsPath(), ""),
    //         mediaUrl: this.api.core.video.createAuthenticatedVideo(user.username, sessionid, AUTHENTICATED_VIDEO_TYPE.FILE, item.path),
    //         metadata: {
    //           width: dimensions.width || 400,
    //           height: dimensions.height || 400,
    //         },
    //       });
    //     }
    //     case MEDIA_TYPE.IMAGE: {
    //       const dimensions = (await core.image.getImageDimensions(item.path)) || { width: 0, height: 0 };
    //
    //       return res.json(<EndpointMediaRaw>{
    //         type: MEDIA_TYPE.IMAGE,
    //         path: item.path.replace(user.getFsPath(), ""),
    //         mediaUrl: this.api.core.image.createAuthenticatedImage(user.username, sessionid, AUTHENTICATED_IMAGE_TYPE.FILE, item.path),
    //         metadata: {
    //           width: dimensions.width || 400,
    //           height: dimensions.height || 400,
    //         },
    //       });
    //     }
    //   }
    // });

    this.api.request.get("/album/@/*", async (req, res) => {
      const sessionId = req.sessionId;
      const albumPath = req.params["0"] as string;
      const user = this.api.getUser(req);

      res.json({
        error: "Not implemented",
      });
    });

    this.api.request.get("/album/sub/@/*", async (req, res) => {
      const sessionId = req.headers.sessionid;
      const albumPath = (req.params["0"] as string) || "./photos/";
      const user = this.api.getUser(req);

      const albumEntity = (await this.api.core.fs.getDirectory(path.join(user.getFsPath(), albumPath))) as FileSystemDirectory;

      if (albumEntity === null) {
        if (albumPath !== "./photos/") return res.json({ error: "Not found" });

        await this.api.core.fs.createDirectory(path.join(user.getFsPath(), albumPath));

        return res.json({
          displayName: "Photos",
          path: albumPath,
          size: 0,
          thumbnail: this.api.core.image.createAuthenticatedImage(
            user.username,
            sessionId,
            AUTHENTICATED_IMAGE_TYPE.FILE,
            "./instance_logo.avif",
          ),
        });
      }

      let headerImagePath = "./instance_logo.avif";

      for (const entity of await albumEntity.getChildFiles()) {
        if (entity.getType() === "image") {
          headerImagePath = entity.path;
          break;
        }
      }

      res.json({
        displayName: path.basename(albumPath),
        path: albumPath,
        size: (await albumEntity.getChildren()).length,
        thumbnail: this.api.core.image.createAuthenticatedImage(user.username, sessionId, AUTHENTICATED_IMAGE_TYPE.FILE, headerImagePath),
      });
    });

    this.api.request.get("/media/thumbnail/:size/@/*", async (req, res) => {
      res.json({
        error: "Not implemented",
      });
    });

    this.api.request.get("/media/raw/@/*", async (req, res) => {
      res.json({
        error: "Not implemented",
      });
    });

    this.api.request.get("/album/media/:page/@/*", async (req, res) => {
      res.json({
        error: "Not implemented",
      });
    });
  }
}
