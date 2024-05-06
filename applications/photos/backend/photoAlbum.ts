/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import core from "@yourdash/backend/src/core/core.js";
import FileSystemFile from "@yourdash/backend/src/core/fileSystem/fileSystemFile.js";
import pth from "path";
import { IPhotoAlbum } from "../shared/photoAlbum.js";
import { AUTHENTICATED_IMAGE_TYPE } from "@yourdash/backend/src/core/coreImage.js";

export default class PhotoAlbum {
  path: string;
  username: string;

  constructor(username: string, path: string) {
    this.path = path;
    this.username = username;

    return this;
  }

  async getPhotos(): Promise<string[]> {
    const dir = await core.fs.getDirectory(this.path);

    if (dir === null || !(await dir.doesExist())) {
      return [];
    }

    return ((await dir.getChildren()).filter((child) => child.entityType === "file") as FileSystemFile[])
      .filter((child) => child.getType() === "image")
      .map((child) => child.path);
  }

  async getVideos(): Promise<string[]> {
    const dir = await core.fs.getDirectory(this.path);

    if (dir === null || !(await dir.doesExist())) {
      return [];
    }

    return ((await dir.getChildren()).filter((child) => child.entityType === "file") as FileSystemFile[])
      .filter((child) => child.getType() === "video")
      .map((child) => child.path);
  }

  async getCoverPhoto(): Promise<string | undefined> {
    const coverPhotoPath = (await this.getPhotos())[0];
    const coverPhotoFsEntity = await core.fs.getFile(coverPhotoPath);
    if (coverPhotoFsEntity === null || !(await coverPhotoFsEntity.doesExist())) {
      return undefined;
    }

    return await core.image.createResizedAuthenticatedImage(
      this.username,
      AUTHENTICATED_IMAGE_TYPE.FILE,
      coverPhotoPath,
      256,
      256,
      "webp",
    );
  }

  async getSubAlbumsPaths(): Promise<string[]> {
    const dir = await core.fs.getDirectory(this.path);

    if (dir === null || !(await dir.doesExist())) {
      return [];
    }

    return (await dir.getChildren()).filter((child) => child.entityType === "directory").map((child) => child.path);
  }

  async getSubAlbums(): Promise<PhotoAlbum[]> {
    const dir = await core.fs.getDirectory(this.path);

    return (await dir.getChildren())
      .filter((child) => child.entityType === "directory")
      .map((child) => new PhotoAlbum(this.username, child.path));
  }

  async getIPhotoAlbum() {
    return {
      path: this.path,
      items: {
        photos: await this.getPhotos(),
        videos: await this.getVideos(),
        subAlbums: await Promise.all(
          (await this.getSubAlbums()).map(async (subAlbum) => {
            return {
              path: subAlbum.path,
              displayName: pth.basename(subAlbum.path) || "SERVER ERROR",
              coverPhoto: (await subAlbum.getCoverPhoto()) || "",
            };
          }),
        ),
      },
      label: pth.basename(this.path),
    } as IPhotoAlbum;
  }
}
