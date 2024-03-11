/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { promises as fs } from "fs";
import pth from "path";
import { CoreApi } from "./coreApi.js";
import sharp from "sharp";

export default class CoreApiImage {
  private coreApi: CoreApi;

  constructor(coreApi: CoreApi) {
    this.coreApi = coreApi;

    return this;
  }

  resizeTo(filePath: string, width: number, height: number, resultingImageFormat?: "avif" | "png" | "jpg" | "webp") {
    return new Promise<string>(async (resolve) => {
      const TEMP_DIR = pth.join(this.coreApi.fs.ROOT_PATH, "temp");

      const resizedImagePath = pth.resolve(pth.join(TEMP_DIR, crypto.randomUUID()));

      sharp(await fs.readFile(filePath), { sequentialRead: true })
        .resize(Math.floor(width), Math.floor(height))
        .toFormat(resultingImageFormat || "webp")
        .toFile(resizedImagePath)
        .then(() => resolve(resizedImagePath))
        .catch((err: string) => {
          this.coreApi.log.error("image", `unable to resize image "${filePath}" ${err}`);
          resolve(`unable to resize image "${filePath}"`);
        });
    });
  }
}
