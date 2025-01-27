/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import sharp, { FormatEnum } from "sharp";
import instance from "./main.js";

// NOTE: imagePath and outputPath provided must be absolute!
async function resizeImage(
  imagePath: string,
  width: number,
  height: number,
  outputPath: string,
  imageFormat?: keyof FormatEnum,
  quality?: number,
) {
  try {
    await sharp(imagePath)
      .resize(width, height, { withoutEnlargement: true })
      .toFormat(imageFormat || "webp", { quality: quality || 100 })
      .toFile(outputPath);
  } catch (e) {
    instance.log.error(`image`, `Failed to resize image, ${instance.log.addEmphasisToString(imagePath)}`, e?.toString());

    return false;
  }

  return true;
}

export { resizeImage };
