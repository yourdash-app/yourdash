/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreApi from "@yourdash/backend/src/core/coreApi.js";
import FileSystemFile from "@yourdash/backend/src/core/fileSystem/fileSystemFile.js";
import pth from "path";
import { IPhotoAlbum } from "../shared/photoAlbum.js";

export default class PhotoAlbum {
  path: string;
  username: string;

  constructor(username: string, path: string) {
    this.path = path;
    this.username = username;

    return this;
  }

  async getPhotos(): Promise<string[]> {
    const dir = await coreApi.fs.getDirectory(this.path);

    return ((await dir.getChildren()).filter((child) => child.entityType === "file") as FileSystemFile[])
      .filter((child) => child.getType() === "image")
      .map((child) => child.path);
  }

  async getSubAlbumsPaths(): Promise<string[]> {
    const dir = await coreApi.fs.getDirectory(this.path);

    return (await dir.getChildren()).filter((child) => child.entityType === "directory").map((child) => child.path);
  }

  async getSubAlbums(): Promise<PhotoAlbum[]> {
    const dir = await coreApi.fs.getDirectory(this.path);

    return (await dir.getChildren())
      .filter((child) => child.entityType === "directory")
      .map((child) => new PhotoAlbum(this.username, child.path));
  }

  async getIPhotoAlbum() {
    return {
      path: this.path,
      items: { photos: await this.getPhotos(), subAlbums: await this.getSubAlbumsPaths() },
      label: pth.basename(this.path),
    } as IPhotoAlbum;
  }
}
