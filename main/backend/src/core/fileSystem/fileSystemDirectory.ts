/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import pth from "path";
import { promises as fs } from "fs";
import { CoreApi } from "../coreApi.js";
import FileSystemEntity from "./fileSystemEntity.js";

export default class FileSystemDirectory extends FileSystemEntity {
  private readonly coreApi: CoreApi;
  entityType = "directory" as const;

  constructor(coreApi: CoreApi, path: string) {
    super(path);
    this.coreApi = coreApi;
  }

  getName(): string {
    return pth.basename(this.path);
  }

  getMetadata() {
    return fs.stat(this.path);
  }

  async getChildren(): Promise<FileSystemEntity[]> {
    const children = await this.getChildrenAsBaseName();

    return await Promise.all(children.map(async (child) => await this.getChild(child)));
  }

  async getChildrenAsBaseName(): Promise<string[]> {
    try {
      return await fs.readdir(this.path);
    } catch (_err) {
      this.coreApi.log.error(`Unable to read directory: ${this.path}`);

      return [];
    }
  }

  async create() {
    await fs.mkdir(this.path, { recursive: true });

    return this;
  }

  getChild(path: string) {
    return this.coreApi.fs.get(pth.join(this.path, path));
  }
}
