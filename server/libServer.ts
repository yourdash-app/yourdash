/*
 *   Copyright (c) 2022 Ewsgit
 *   https://ewsgit.mit-license.org
 */

import fs from 'fs';
import { ENV } from './index.js';
import sharp from 'sharp';

let currentSessionLog = '----- [YOURDASH SERVER LOG] -----\n';

export function log(input: string) {
  console.log(input);
  currentSessionLog += `${input.replaceAll('', '').replaceAll(/\[[0-9][0-9]m/gm, '')}\n`;
  fs.writeFile(`${ENV.FsOrigin}/serverlog.txt`, currentSessionLog, (err) => {
    if (err) {
      console.error(err);
      process.exit();
    }
  });
}

export function returnBase64Image(path: string) {
  return "data:image/png;base64," + fs.readFileSync(path, 'base64');
}

export function returnBase64Svg(path: string) {
  return "data:image/svg;base64," + fs.readFileSync(path, 'base64');
}

export function bufferFromBase64Image(img: string): Buffer | undefined {
  let uri = img.split(";base64,").pop()
  if (!uri) return
  let buf = Buffer.from(uri, "base64")
  return buf
}

export function base64FromBufferImage(img: Buffer): string {
  let base64 = "data:image/png;base64," + img.toString("base64")
  return base64
}

export function resizeBase64Image(width: number, height: number, image: string): Promise<string> {
  return new Promise((resolve) => {
    let resizedImage = sharp(bufferFromBase64Image(image))
    resizedImage.resize(width, height, {
      kernel: "lanczos3",
    }).toBuffer((err, buf) => {
      if (err) {
        console.log(err)
        log(`ERROR: unable to resize image`)
        return resolve(image)
      }
      return resolve(base64FromBufferImage(buf))
    })
  })
}