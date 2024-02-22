/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { promises as fs } from "fs";
import pth from "path";
import { CoreApi } from "../coreApi.js";
import FileSystemEntity from "./fileSystemEntity.js";

export default class FileSystemFile extends FileSystemEntity {
  private readonly coreApi: CoreApi;

  constructor(coreApi: CoreApi, path: string) {
    super(path);
    this.coreApi = coreApi;

    return this;
  }

  getName(): string {
    return pth.basename(this.path);
  }

  getExtension(): string {
    return pth.extname(this.path);
  }

  getThumbnail(_dimensions: { x: number; y: number }): string {
    switch (this.getExtension()) {
      // TODO: create a wrapper around "new Sharp()"
      //       This can then be part of the new CoreApi and can be used for thumbnail generation
      default:
        return "not implemented";
    }
  }

  getMetadata() {
    return fs.stat(this.path);
  }

  async read(readAs: "string" | "buffer" | "json") {
    switch (readAs) {
      case "string":
        return (await fs.readFile(this.path)).toString();
      case "buffer":
        return await fs.readFile(this.path);
      case "json":
        return JSON.parse((await fs.readFile(this.path)).toString());
      default:
        throw new Error(`Unsupported read type: ${readAs}`);
    }
  }

  async write(data: string | Buffer) {
    if (this.isLocked().locked) {
      throw new Error("YDSH: File is locked");
    }

    if (!(await this.doesExist())) {
      await fs.mkdir(pth.dirname(this.path), { recursive: true });
    }

    try {
      await fs.writeFile(this.path, data);
    } catch (e) {
      console.error(e);
      this.coreApi.log.error(`unable to write to ${this.path}`);
    }

    return;
  }
}
