/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import crypto from "crypto";
import { promises as fs } from "fs";
import pth from "path";
import path from "path";
import { CoreApi } from "./coreApi.js";
import { AUTHENTICATED_IMAGE_TYPE } from "./coreApiImage.js";

export enum AUTHENTICATED_VIDEO_TYPE {
  BASE64,
  FILE,
  BUFFER,
}

interface IauthenticatedVideo<T extends AUTHENTICATED_VIDEO_TYPE> {
  type: T;
  value: T extends AUTHENTICATED_VIDEO_TYPE.BUFFER ? Buffer : string;
  resizeTo?: { width: number; height: number; resultingImageFormat?: "avif" | "png" | "jpg" | "webp" };
}

export default class CoreApiVideo {
  coreApi: CoreApi;
  private readonly AUTHENTICATED_VIDEOS: {
    [username: string]: {
      [id: string]: IauthenticatedVideo<AUTHENTICATED_VIDEO_TYPE>;
    };
  };

  constructor(coreApi: CoreApi) {
    this.coreApi = coreApi;
    this.AUTHENTICATED_VIDEOS = {};

    return this;
  }

  resizeTo(filePath: string) {
    return filePath;
  }

  __internal__removeAuthenticatedVideo(username: string, id: string) {
    delete this.AUTHENTICATED_VIDEOS[username][id];

    return this;
  }

  __internal__loadEndpoints() {
    this.coreApi.request.get("/core/auth-img/:username/:id", async (req, res) => {
      const { username, id } = req.params;

      const image = this.AUTHENTICATED_VIDEOS?.[username]?.[id];

      if (!image) {
        return res.sendFile(path.resolve(process.cwd(), "./src/defaults/default_avatar.avif"));
      }

      if (image.type === AUTHENTICATED_VIDEO_TYPE.BUFFER) {
        return res.send(image.value);
      }

      if (image.type === AUTHENTICATED_VIDEO_TYPE.BASE64) {
        const buf = Buffer.from(image.value as unknown as string, "base64");
        this.__internal__removeAuthenticatedVideo(username, id);
        return res.send(buf);
      }

      if (image.type === AUTHENTICATED_VIDEO_TYPE.FILE) {
        if (!image.resizeTo) {
          this.__internal__removeAuthenticatedVideo(username, id);
          return res.sendFile(image.value as unknown as string);
        }

        const resizeTo = image.resizeTo;

        const resizedPath = await this.resizeTo(image.value as string);
        this.__internal__removeAuthenticatedVideo(username, id);
        return res.sendFile(resizedPath);
      }

      this.__internal__removeAuthenticatedVideo(username, id);
      return res.sendFile(path.resolve(process.cwd(), "./src/defaults/default_avatar.avif"));
    });
  }
}
