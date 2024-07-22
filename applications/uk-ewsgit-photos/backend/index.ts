/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

// TODO: generate video thumbnails into a subfolder of the thumbnails cache folder and
//  save a copy of them pre-resized alongside the photos as resizing images is also costly

import { AUTHENTICATED_IMAGE_TYPE } from "@yourdash/backend/src/core/coreImage.js";
import FSError, { FS_ERROR_TYPE } from "@yourdash/backend/src/core/fileSystem/FSError.js";
import FSFile from "@yourdash/backend/src/core/fileSystem/FSFile.js";
import BackendModule, { YourDashModuleArguments } from "@yourdash/backend/src/core/moduleManager/backendModule.js";
import { chunk } from "@yourdash/shared/web/helpers/array.js";
import * as console from "node:console";
import path from "path";
// @ts-ignore
import sharp from "sharp";
import EndpointAlbumMediaPath, { AlbumMediaPath } from "../shared/types/endpoints/album/media/path.js";
import { EndpointAlbumSubPath } from "../shared/types/endpoints/album/sub/path.js";
import { PHOTOS_MEDIA_TYPE } from "../shared/types/mediaType.js";

export default class PhotosBackend extends BackendModule {
  PAGE_SIZE: number;
  THUMBNAIL_CACHE_LOCATION = "/cache/photos/thumbnails";

  constructor(args: YourDashModuleArguments) {
    super(args);
    this.PAGE_SIZE = 24;

    this.api.core.fs.createDirectory(this.THUMBNAIL_CACHE_LOCATION);

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
        const userPhotos: string[] = [];

        this.api.core.log.info("Finding users photos");

        const PHOTOS_FS_PATH = path.join(this.api.core.users.get(u).getFsPath(), "photos");

        // recursively get all photos
        async function getPhotosRecursively(dirPath: string) {
          const dir = await self.api.core.fs.getDirectory(dirPath);

          if (dir instanceof FSError) return;

          for (const p of await dir.getChildFiles()) {
            if (p.getType() === "image") {
              userPhotos.push(p.path);
            }
          }

          for (const d of await dir.getChildDirectories()) {
            await getPhotosRecursively(d.path);
          }
        }

        await getPhotosRecursively(PHOTOS_FS_PATH);

        // hash every photo
        await Promise.all(
          userPhotos.map(async (p) => {
            const fileHash = await ((await self.api.core.fs.getFile(p)) as FSFile).getContentHash();

            // if a hash already exists, flag the conflicting paths and put in array
            if (userHashes.get(u)!.has(fileHash)) {
              console.log(`Duplicate photo detected: ${p}`);

              return;
            }

            userHashes.get(u)!.add(fileHash);
          }),
        );

        // TODO: save conflicts to a database
        //       send push notif to user
      }),
    );
  }

  async generateMediaThumbnails(mediaPath: string): Promise<boolean> {
    const fileRawThumbnail = await this.api.core.fs.getFile(path.join(this.THUMBNAIL_CACHE_LOCATION, `${mediaPath}.raw.webp`));

    if (!(fileRawThumbnail instanceof FSFile)) {
      if (fileRawThumbnail.reason === FS_ERROR_TYPE.DOES_NOT_EXIST) {
        const file = await this.api.core.fs.getFile(mediaPath);

        if (file instanceof FSError) {
          return false;
        }

        switch (file.getType()) {
          case "image":
            try {
              await this.api.core.fs.createDirectory(
                path.join(this.THUMBNAIL_CACHE_LOCATION, mediaPath.replace(path.basename(mediaPath), "")),
              );

              await sharp(file.path)
                .toFormat("webp")
                .toFile(path.join(this.THUMBNAIL_CACHE_LOCATION, `${mediaPath}.raw.webp`));
            } catch (err) {
              console.log(`ERROR With Output Path: ${path.join(this.THUMBNAIL_CACHE_LOCATION, `${mediaPath}.raw.webp`)}`);
            }

            break;
          default:
            console.log(`UNKNOWN TYPE: ${file.getType()}`);
            return false;
        }
      }

      return false;
    }

    // lowres
    await sharp(fileRawThumbnail.path)
      .resize({
        width: 120,
        height: 100,
      })
      .toFormat("webp")
      .toFile(path.join(this.THUMBNAIL_CACHE_LOCATION, `${mediaPath}.lowres.webp`));

    // medres
    await sharp(fileRawThumbnail.path)
      .resize({
        width: 400,
        height: 100,
      })
      .toFormat("webp")
      .toFile(path.join(this.THUMBNAIL_CACHE_LOCATION, `${mediaPath}.medres.webp`));

    // hires
    await sharp(fileRawThumbnail.path)
      .resize({
        width: 512,
        height: 100,
      })
      .toFormat("webp")
      .toFile(path.join(this.THUMBNAIL_CACHE_LOCATION, `${mediaPath}.hires.webp`));

    return true;
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
    //           if (d.getName() === ".yd-thumbnailss") return null;
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
    //     const thumbnailsDirectory = path.join(item.path, ".yd-thumbnailss");
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
    //       .filter((i) => path.basename(i.path) !== ".yd-thumbnailss")
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

    // returns the subAlbums of a given album
    this.api.request.get<EndpointAlbumSubPath | { error: string }>("/album/sub/:page/@/*", async (req, res) => {
      const sessionId = req.headers.sessionid;
      const albumPath = (req.params["0"] as string) || "./photos/";
      const page = Number(req.params.page || "0");
      const user = this.api.getUser(req);

      const albumEntity = await this.api.core.fs.getDirectory(path.join(user.getFsPath(), albumPath));

      if (albumEntity instanceof FSError) {
        // don't send an error, instead send an empty array
        if (albumPath !== "./photos/") return res.json([]);

        await this.api.core.fs.createDirectory(path.join(user.getFsPath(), albumPath));

        return res.json([]);
      }

      const output: { displayName: string; path: string; size: number; thumbnail: string }[] = [];

      const chunks = chunk(await albumEntity.getChildDirectories(), this.PAGE_SIZE);

      if (page >= chunks.length) return res.json([]);

      for (const subAlbum of chunks[page]) {
        let headerImagePath = "./instance_logo.avif";

        for (const subAlbumChild of await subAlbum.getChildFiles()) {
          if (subAlbumChild.getType() === "image") {
            headerImagePath = subAlbumChild.path;
          }
        }

        output.push({
          displayName: path.basename(subAlbum.path),
          path: subAlbum.path.replace(`${user.getFsPath()}`, ""),
          size: (await subAlbum.getChildFiles()).length,
          thumbnail: await this.api.core.image.createResizedAuthenticatedImage(
            user.username,
            sessionId,
            AUTHENTICATED_IMAGE_TYPE.FILE,
            headerImagePath,
            400,
            400,
            "webp",
          ),
        });
      }

      res.json(output);
    });

    this.api.request.get("/media/thumbnail/:res/@/*", async (req, res) => {
      const { res: resolution } = req.params;
      const mediaPath = req.params["0"] as string;

      let thumbnailPath: string;

      // only allow lowres, medres, hires
      switch (resolution) {
        case "lowres":
          thumbnailPath = path.join(this.THUMBNAIL_CACHE_LOCATION, `${mediaPath}.lowres.webp`);
          break;
        case "medres":
          thumbnailPath = path.join(this.THUMBNAIL_CACHE_LOCATION, `${mediaPath}.medres.webp`);
          break;
        case "hires":
          thumbnailPath = path.join(this.THUMBNAIL_CACHE_LOCATION, `${mediaPath}.hires.webp`);
          break;
        default:
          return res.json({
            error: true,
          });
      }

      const file = await this.api.core.fs.getFile(thumbnailPath);

      if (file instanceof FSError) {
        return res.json({
          error: true,
        });
      }

      res.json({
        image: this.api.core.image.createAuthenticatedImage(req.username, req.sessionId, AUTHENTICATED_IMAGE_TYPE.FILE, thumbnailPath),
      });
    });

    this.api.request.get("/media/raw/@/*", async (req, res) => {
      res.json({
        error: "Not implemented",
      });
    });

    this.api.request.get<EndpointAlbumMediaPath>("/album/media/:page/@/*", async (req, res) => {
      const sessionId = req.headers.sessionid;
      const albumPath = (req.params["0"] as string) || "./photos/";
      const page = Number(req.params.page || "0");
      const user = this.api.getUser(req);

      const albumEntity = await this.api.core.fs.getDirectory(path.join(user.getFsPath(), albumPath));

      if (albumEntity instanceof FSError) {
        // don't send an error, instead send an empty array
        if (albumPath !== "./photos/") return res.json([]);

        await this.api.core.fs.createDirectory(path.join(user.getFsPath(), albumPath));

        return res.json([]);
      }

      const output: {
        mediaType: PHOTOS_MEDIA_TYPE;
        path: string;
        resolution: { width: number; height: number };
        metadata?: { people?: string[] };
      }[] = [];

      const chunks = chunk(await albumEntity.getChildFiles(), this.PAGE_SIZE);

      if (page >= chunks.length) return res.json([]);

      for (const albumMedia of chunks[page]) {
        await this.generateMediaThumbnails(albumMedia.path);

        let mediaType: PHOTOS_MEDIA_TYPE;

        switch (albumMedia.getType()) {
          case "image":
            mediaType = PHOTOS_MEDIA_TYPE.Image;
            break;
          case "video":
            mediaType = PHOTOS_MEDIA_TYPE.Video;
            break;
          default:
            mediaType = PHOTOS_MEDIA_TYPE.Unknown;
            break;
        }

        const mediaDimensions = await this.api.core.image.getImageDimensions(
          path.join(this.THUMBNAIL_CACHE_LOCATION, `${albumMedia.path}.raw.webp`),
        );

        output.push(<AlbumMediaPath>{
          path: albumMedia.path.replace(user.getFsPath(), ""),
          resolution: { width: mediaDimensions.width, height: mediaDimensions.height },
          mediaType: mediaType,
          metadata: {
            people: ["TEST_PERSON1", "TEST_PERSON2"],
          },
        });
      }

      res.json(output);
    });
  }
}
