/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";
import pth from "path";
import { Core } from "./core.js";
import sharp from "sharp";
import { USER_PATHS } from "./user/index.js";
import { z } from "zod";

export enum AUTHENTICATED_IMAGE_TYPE {
  BASE64,
  FILE,
  BUFFER,
  ABSOLUTELY_PATHED_FILE,
}

interface IauthenticatedImage<T extends AUTHENTICATED_IMAGE_TYPE> {
  type: T;
  value: T extends AUTHENTICATED_IMAGE_TYPE.BUFFER ? Buffer : string;
  resizeTo?: { width: number; height: number; resultingImageFormat?: "avif" | "png" | "jpg" | "webp" };
}

export default class CoreImage {
  private core: Core;
  // username - sessionId - imageuuid
  private readonly authenticatedImages: Map<string, Map<string, Map<string, IauthenticatedImage<AUTHENTICATED_IMAGE_TYPE>>>>;

  constructor(core: Core) {
    this.core = core;
    this.authenticatedImages = new Map();

    return this;
  }

  getImageDimensions(filePath: string) {
    return new Promise<{ width: number; height: number }>(async (resolve, reject) => {
      try {
        const image = sharp(await fs.readFile(path.join(this.core.fs.ROOT_PATH, filePath)));
        const { width, height } = await image.metadata();
        resolve({ width: width || 0, height: height || 0 });
      } catch (err) {
        this.core.log.error("image", "failed to get image dimensions for " + filePath);
        reject({ width: 0, height: 0 });
      }
    });
  }

  async resizeTo(
    filePath: string,
    width: number,
    height: number,
    resultingImageFormat?: "avif" | "png" | "jpg" | "webp",
    useAbsolutePath?: boolean,
  ): Promise<string> {
    return await new Promise<string>(async (resolve) => {
      const resizedImagePath = pth.join(USER_PATHS.TEMP, crypto.randomUUID());

      try {
        sharp(await fs.readFile(useAbsolutePath ? filePath : path.join(this.core.fs.ROOT_PATH, filePath)))
          .resize(Math.floor(width), Math.floor(height))
          .toFormat(resultingImageFormat || "webp") // use avif when it is better supported by sharp
          .toFile(pth.join(this.core.fs.ROOT_PATH, resizedImagePath))
          .then(() => resolve(resizedImagePath))
          .catch((err: string) => {
            this.core.log.error("image", `unable to resize image "${path.resolve(this.core.fs.ROOT_PATH, filePath)}" ${err}`);
            resolve("null file path");
          });
      } catch (err) {
        this.core.log.error("image", `unable to resize image "${filePath}" ${err}`);
        resolve("unable to resize image");
      }
    });
  }

  createAuthenticatedImage<ImageType extends AUTHENTICATED_IMAGE_TYPE>(
    username: string,
    sessionId: string,
    type: AUTHENTICATED_IMAGE_TYPE,
    value: IauthenticatedImage<ImageType>["value"],
    extras?: { resizeTo?: { width: number; height: number; resultingImageFormat?: "avif" | "png" | "jpg" | "webp" } },
  ): string {
    try {
      let resultingExtension = "";
      let val = value;

      if (extras?.resizeTo) {
        resultingExtension = `.${extras.resizeTo.resultingImageFormat || "webp"}`;
      } else if (type === AUTHENTICATED_IMAGE_TYPE.FILE) {
        resultingExtension = path.extname(value as string);
        // @ts-ignore
        val = path.resolve(path.join(this.core.fs.ROOT_PATH, value as string));
      }

      const id = crypto.randomUUID() + resultingExtension;

      if (!this.authenticatedImages.get(username)) {
        this.authenticatedImages.set(username, new Map());
      }

      const user = this.authenticatedImages.get(username);

      if (!user) return "";

      if (!user.has(sessionId)) {
        user.set(sessionId, new Map());
      }

      user.get(sessionId)?.set(id, {
        type,
        // @ts-ignore
        value: val,
        resizeTo: extras?.resizeTo,
      });

      return `/core/auth-img/${username}/${sessionId}/${id}`;
    } catch (err) {
      this.core.log.error("image", "failed to create authenticated image", err);

      return "";
    }
  }

  async createPreResizedAuthenticatedImage<ImageType extends AUTHENTICATED_IMAGE_TYPE.FILE>(
    username: string,
    sessionId: string,
    type: AUTHENTICATED_IMAGE_TYPE,
    value: IauthenticatedImage<ImageType>["value"],
    width: number,
    height: number,
    resultingImageFormat?: "avif" | "png" | "jpg" | "webp",
  ) {
    const resizedPath = await this.resizeTo(value, width, height, resultingImageFormat);

    return this.createAuthenticatedImage(username, sessionId, type, resizedPath);
  }

  async createResizedAuthenticatedImage<ImageType extends AUTHENTICATED_IMAGE_TYPE.FILE>(
    username: string,
    sessionId: string,
    type: AUTHENTICATED_IMAGE_TYPE,
    value: IauthenticatedImage<ImageType>["value"],
    width: number,
    height: number,
    resultingImageFormat?: "avif" | "png" | "jpg" | "webp",
  ) {
    return this.createAuthenticatedImage(username, sessionId, type, value, {
      resizeTo: { width, height, resultingImageFormat },
    });
  }

  // removes an image from the authenticated image lookup
  __internal__removeAuthenticatedImage(username: string, sessionId: string, id: string) {
    this.authenticatedImages.get(username)?.get(sessionId)?.delete(id);

    return this;
  }

  __internal__loadEndpoints() {
    this.core.request.setNamespace("core/auth-img");

    this.core.request.get("/:username/:sessionId/:id", z.unknown(), async (req, res) => {
      const { username, sessionId, id } = req.params;

      const image = this.authenticatedImages.get(username)?.get(sessionId)?.get(id);

      // if image is not found, return default image
      if (!image) {
        return res.sendFile(path.resolve(process.cwd(), "./src/defaults/default_avatar.avif"));
      }

      // if the image is a buffer, return it
      if (image.type === AUTHENTICATED_IMAGE_TYPE.BUFFER) {
        return res.send(image.value);
      }

      // if image is base64, return it (bad practice to use base64 as it is slow)
      if (image.type === AUTHENTICATED_IMAGE_TYPE.BASE64) {
        const buf = Buffer.from(image.value as unknown as string, "base64");
        return res.send(buf);
      }

      if (image.type === AUTHENTICATED_IMAGE_TYPE.ABSOLUTELY_PATHED_FILE) {
        // if image is not to be resized, return it
        if (!image.resizeTo) {
          return res.sendFile(image.value as unknown as string);
        }

        const resizeTo = image.resizeTo;

        const resizedPath = await this.resizeTo(
          image.value as string,
          resizeTo.width,
          resizeTo.height,
          resizeTo.resultingImageFormat,
          true,
        );

        try {
          return res.sendFile(path.join(this.core.fs.ROOT_PATH, resizedPath));
        } catch (e) {
          return res.sendFile(path.resolve(process.cwd(), "./src/defaults/default_avatar.avif"));
        }
      }

      if (image.type === AUTHENTICATED_IMAGE_TYPE.FILE) {
        // if image is not to be resized, return it
        if (!image.resizeTo) {
          return res.sendFile(image.value as unknown as string);
        }

        const resizeTo = image.resizeTo;

        const resizedPath = await this.resizeTo(image.value as string, resizeTo.width, resizeTo.height, resizeTo.resultingImageFormat);

        try {
          return res.sendFile(path.join(this.core.fs.ROOT_PATH, resizedPath));
        } catch (e) {
          return res.sendFile(path.resolve(process.cwd(), "./src/defaults/default_avatar.avif"));
        }
      }

      return res.sendFile(path.resolve(process.cwd(), "./src/defaults/default_avatar.avif"));
    });
  }
}
