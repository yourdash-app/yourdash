/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { imageSize } from "image-size";
import IGridPhoto, { MAX_HEIGHT } from "../shared/gridPhoto.js";
import { AUTHENTICATED_IMAGE_TYPE } from "@yourdash/backend/src/core/coreApiAuthenticatedImage.js";
import pth from "path";
import coreApi from "@yourdash/backend/src/core/coreApi.js";

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
    return coreApi.authenticatedImage.create(this.username, AUTHENTICATED_IMAGE_TYPE.FILE, pth.resolve(this.path));
  }

  async getPhotoUrl(dimensions?: { width: number; height: number }): Promise<string> {
    if (!dimensions) {
      return coreApi.authenticatedImage.create(this.username, AUTHENTICATED_IMAGE_TYPE.FILE, pth.resolve(this.path));
    }

    console.time(`photo+${this.path}-get-photo`);
    const resizedImage = await coreApi.image.resizeTo(
      pth.resolve(this.path),
      dimensions.width,
      dimensions.height,
      "webp",
    );
    console.timeEnd(`photo+${this.path}-get-photo`);

    return coreApi.authenticatedImage.create(this.username, AUTHENTICATED_IMAGE_TYPE.FILE, resizedImage);
  }

  async getIGridPhoto() {
    const dimensions = this.getDimensions();

    const aspectRatio = dimensions.width / dimensions.height;
    const newWidth = MAX_HEIGHT * aspectRatio;

    return {
      dimensions: dimensions,
      imageUrl: await this.getPhotoUrl({ width: newWidth, height: MAX_HEIGHT }),
      path: this.path,
      tags: [],
    } as IGridPhoto;
  }
}
