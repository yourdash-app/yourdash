/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { imageSize } from "image-size";
import pth from "path";
import coreApi from "@yourdash/backend/src/core/coreApi.js";
import IGridItem, { MAX_HEIGHT } from "../shared/grid.js";
import { AUTHENTICATED_IMAGE_TYPE } from "@yourdash/backend/src/core/coreApiImage.js";
import IMedia from "../shared/media.js";

export default class Photo {
  username: string;
  path: string;

  constructor(username: string, photoPath: string) {
    this.username = username;
    this.path = photoPath;

    return this;
  }

  getDimensions(): { width: number; height: number } {
    const dimensions = imageSize(this.path);

    return {
      width: dimensions.width || 0,
      height: dimensions.height || 0,
    };
  }

  getRawPhotoUrl(): string {
    return coreApi.image.createAuthenticatedImage(this.username, AUTHENTICATED_IMAGE_TYPE.FILE, pth.resolve(this.path));
  }

  async getPhotoUrl(dimensions?: { width: number; height: number }): Promise<string> {
    if (!dimensions) {
      return coreApi.image.createAuthenticatedImage(
        this.username,
        AUTHENTICATED_IMAGE_TYPE.FILE,
        pth.resolve(this.path),
      );
    }

    return coreApi.image.createResizedAuthenticatedImage(
      this.username,
      AUTHENTICATED_IMAGE_TYPE.FILE,
      this.path,
      dimensions.width,
      dimensions.height,
      "webp",
    );
  }

  async getIGridPhoto() {
    const dimensions = this.getDimensions();

    const aspectRatio = dimensions.width / dimensions.height;
    const newWidth = MAX_HEIGHT * aspectRatio;

    return {
      dimensions: dimensions,
      itemUrl: await this.getPhotoUrl({ width: newWidth, height: MAX_HEIGHT }),
      path: this.path,
      tags: [],
      type: "image",
    } as IGridItem;
  }

  async getIPhoto() {
    return {
      dimensions: this.getDimensions(),
      itemUrl: await this.getPhotoUrl(),
      path: this.path,
      tags: [],
      date: "",
      people: [],
      type: "image",
    } as IMedia;
  }
}
