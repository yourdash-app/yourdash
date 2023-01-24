/*
*   Copyright (c) 2022 Ewsgit
*   https://ewsgit.mit-license.org
*/

import fs from 'fs';
import { ENV } from './index.js';
import sharp from 'sharp';
import { Application, Request, Response } from 'express';
import YourDashModule from './module.js';

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

export type extend<T, E> = T & E

export function returnBase64Image(path: string) {
  return "data:image/png;base64," + fs.readFileSync(path, 'base64');
}

export function returnBase64Svg(path: string) {
  return "data:image/svg;base64," + fs.readFileSync(path, 'base64');
}

export function base64FromBufferImage(img: Buffer): string {
  const base64 = "data:image/png;base64," + img.toString("base64")
  return base64
}

export function resizeImage(width: number, height: number, image: string, callback: (image: string) => void, error: () => void) {
  sharp(image)
    .resize(width, height, {
      kernel: "lanczos3",
      withoutEnlargement: true
    })
    .png()
    .toBuffer((err, buf) => {
      if (err) {
        console.log(err)
        log(`ERROR: unable to resize image: ${image}`)
        return error()
      }
      log(`Triggered Sharp, width: ${width}, height: ${height}`)
      return callback(base64FromBufferImage(buf))
    })
}


export class RequestManager {

  private express: Application

  private module: YourDashModule

  private endpoints: string[];

  constructor(app: Application, module: YourDashModule) {
    this.express = app
    this.module = module
    this.endpoints = []
  }

  get = (path: string, cb: (req: Request, res: Response) => void) => {
    this.endpoints.push(`GET ${path}`)
    this.express.get(`/api/${this.module.name}${path}`, (req, res) => cb(req, res))
  }

  post = (path: string, cb: (req: Request, res: Response) => void) => {
    this.endpoints.push(`POS ${path}`)
    this.express.post(`/api/${this.module.name}${path}`, (req, res) => cb(req, res))
  }

  delete = (path: string, cb: (req: Request, res: Response) => void) => {
    this.endpoints.push(`DEL ${path}`)
    this.express.delete(`/api/${this.module.name}${path}`, (req, res) => cb(req, res))
  }

  legacy = () => this.express

  getEndpoints = () => this.endpoints
}
