/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import IGridPhoto, { MAX_HEIGHT } from "../shared/gridPhoto.js";
import pth from "path";
import coreApi from "@yourdash/backend/src/core/coreApi.js";
import { IPhoto } from "../shared/photo.js";
import { AUTHENTICATED_IMAGE_TYPE } from "@yourdash/backend/src/core/coreApiImage.js";
import { getDimensions as videoDimensions } from "get-video-dimensions";

export default class Video {
  username: string;
  path: string;

  constructor(username: string, photoPath: string) {
    this.username = username;
    this.path = photoPath;

    return this;
  }

  async getDimensions(): Promise<{ width: number; height: number }> {
    const dimensions = await videoDimensions(this.path);

    return {
      width: dimensions.width || 0,
      height: dimensions.height || 0,
    };
  }

  getRawPhotoUrl(): string {
    return coreApi.image.createAuthenticatedImage(this.username, AUTHENTICATED_IMAGE_TYPE.FILE, pth.resolve(this.path));
  }

  async getVideoUrl(dimensions?: { width: number; height: number }): Promise<string> {
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

  async getIGridVideo() {
    const dimensions = await this.getDimensions();

    const aspectRatio = dimensions.width / dimensions.height;
    const newWidth = MAX_HEIGHT * aspectRatio;

    return {
      dimensions: dimensions,
      imageUrl: await this.getVideoUrl({ width: newWidth, height: MAX_HEIGHT }),
      path: this.path,
      tags: [],
    } as IGridPhoto;
  }

  async getIVideo() {
    return {
      dimensions: await this.getDimensions(),
      imageUrl: await this.getVideoUrl(),
      path: this.path,
      tags: [],
      date: "",
      people: [],
    } as IPhoto;
  }
}
