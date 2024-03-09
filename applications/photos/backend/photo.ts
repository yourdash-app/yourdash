/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { imageSize } from "image-size";
import IGridPhoto from "../shared/types/gridPhoto.js";
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

  getPhotoUrl(): string {
    return coreApi.authenticatedImage.create(this.username, AUTHENTICATED_IMAGE_TYPE.FILE, pth.resolve(this.path));
  }

  getIGridPhoto() {
    return {
      dimensions: this.getDimensions(),
      imageUrl: this.getPhotoUrl(),
      path: this.path,
      tags: [],
    } as IGridPhoto;
  }
}
