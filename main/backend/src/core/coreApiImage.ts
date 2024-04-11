/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";
import pth from "path";
import { CoreApi } from "./coreApi.js";
import sharp from "sharp";

export enum AUTHENTICATED_IMAGE_TYPE {
  BASE64,
  FILE,
  BUFFER,
}

interface IauthenticatedImage<T extends AUTHENTICATED_IMAGE_TYPE> {
  type: T;
  value: T extends AUTHENTICATED_IMAGE_TYPE.BUFFER ? Buffer : string;
  resizeTo?: { width: number; height: number; resultingImageFormat?: "avif" | "png" | "jpg" | "webp" };
}

export default class CoreApiImage {
  private coreApi: CoreApi;
  private readonly AUTHENTICATED_IMAGES: {
    [username: string]: {
      [id: string]: IauthenticatedImage<AUTHENTICATED_IMAGE_TYPE>;
    };
  };

  constructor(coreApi: CoreApi) {
    this.coreApi = coreApi;
    this.AUTHENTICATED_IMAGES = {};

    return this;
  }

  resizeTo(filePath: string, width: number, height: number, resultingImageFormat?: "avif" | "png" | "jpg" | "webp") {
    return new Promise<string>(async (resolve) => {
      const TEMP_DIR = pth.join(this.coreApi.fs.ROOT_PATH, "temp");

      const resizedImagePath = pth.resolve(pth.join(TEMP_DIR, crypto.randomUUID()));

      try {
        sharp(await fs.readFile(filePath), { sequentialRead: true })
          .resize(Math.floor(width), Math.floor(height))
          .toFormat(resultingImageFormat || "webp")
          .toFile(resizedImagePath)
          .then(() => resolve(resizedImagePath))
          .catch((err: string) => {
            this.coreApi.log.error("image", `unable to resize image "${filePath}" ${err}`);
            resolve(`unable to resize image "${filePath}"`);
          });
      } catch (err) {
        this.coreApi.log.error("image", `unable to resize image "${filePath}" ${err}`);
        resolve(`unable to resize image "${filePath}"`);
      }
    });
  }

  createAuthenticatedImage<ImageType extends AUTHENTICATED_IMAGE_TYPE>(
    username: string,
    type: AUTHENTICATED_IMAGE_TYPE,
    value: IauthenticatedImage<ImageType>["value"],
    extras?: { resizeTo?: { width: number; height: number; resultingImageFormat?: "avif" | "png" | "jpg" | "webp" } },
  ): string {
    let resultingExtension = "";

    if (extras?.resizeTo) {
      resultingExtension = `.${extras.resizeTo.resultingImageFormat || "webp"}`;
    } else if (type === AUTHENTICATED_IMAGE_TYPE.FILE) {
      resultingExtension = path.extname(value as string);
    }

    const id = crypto.randomUUID() + resultingExtension;

    if (!this.AUTHENTICATED_IMAGES[username]) {
      this.AUTHENTICATED_IMAGES[username] = {};
    }

    this.AUTHENTICATED_IMAGES[username][id] = {
      type,
      value,
      resizeTo: extras?.resizeTo,
    };

    return `/core/auth-img/${username}/${id}`;
  }

  async createPreResizedAuthenticatedImage<ImageType extends AUTHENTICATED_IMAGE_TYPE.FILE>(
    username: string,
    type: AUTHENTICATED_IMAGE_TYPE,
    value: IauthenticatedImage<ImageType>["value"],
    width: number,
    height: number,
    resultingImageFormat?: "avif" | "png" | "jpg" | "webp",
  ) {
    const resizedPath = await this.resizeTo(value, width, height, resultingImageFormat);

    return this.createAuthenticatedImage(username, type, resizedPath);
  }

  async createResizedAuthenticatedImage<ImageType extends AUTHENTICATED_IMAGE_TYPE.FILE>(
    username: string,
    type: AUTHENTICATED_IMAGE_TYPE,
    value: IauthenticatedImage<ImageType>["value"],
    width: number,
    height: number,
    resultingImageFormat?: "avif" | "png" | "jpg" | "webp",
  ) {
    return this.createAuthenticatedImage(username, type, value, { resizeTo: { width, height, resultingImageFormat } });
  }

  __internal__removeAuthenticatedImage(username: string, id: string) {
    delete this.AUTHENTICATED_IMAGES[username][id];

    return this;
  }

  __internal__loadEndpoints() {
    this.coreApi.request.get("/core/auth-img/:username/:id", async (req, res) => {
      const { username, id } = req.params;

      const image = this.AUTHENTICATED_IMAGES?.[username]?.[id];

      if (!image) {
        return res.sendFile(path.resolve(process.cwd(), "./src/defaults/default_avatar.avif"));
      }

      if (image.type === AUTHENTICATED_IMAGE_TYPE.BUFFER) {
        return res.send(image.value);
      }

      if (image.type === AUTHENTICATED_IMAGE_TYPE.BASE64) {
        const buf = Buffer.from(image.value as unknown as string, "base64");
        this.__internal__removeAuthenticatedImage(username, id);
        return res.send(buf);
      }

      if (image.type === AUTHENTICATED_IMAGE_TYPE.FILE) {
        if (!image.resizeTo) {
          this.__internal__removeAuthenticatedImage(username, id);
          return res.sendFile(image.value as unknown as string);
        }

        const resizeTo = image.resizeTo;

        const resizedPath = await this.resizeTo(
          image.value as string,
          resizeTo.width,
          resizeTo.height,
          resizeTo.resultingImageFormat,
        );
        this.__internal__removeAuthenticatedImage(username, id);

        try {
          return res.sendFile(resizedPath);
        } catch (e) {
          return res.sendFile(path.resolve(process.cwd(), "./src/defaults/default_avatar.avif"));
        }
      }

      this.__internal__removeAuthenticatedImage(username, id);
      return res.sendFile(path.resolve(process.cwd(), "./src/defaults/default_avatar.avif"));
    });
  }
}
