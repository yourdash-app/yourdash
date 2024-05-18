/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { promises as fs } from "fs";
import { Core } from "../core.js";
import FileSystemEntity, { FILESYSTEM_ENTITY_TYPE } from "./fileSystemEntity.js";
import pth from "path";

export default class FileSystemDirectory extends FileSystemEntity {
  private readonly core: Core;
  entityType = FILESYSTEM_ENTITY_TYPE.DIRECTORY as const;

  constructor(core: Core, path: string) {
    super(path);
    this.core = core;

    return this;
  }

  getName(): string {
    return pth.basename(this.path);
  }

  getMetadata() {
    return fs.stat(pth.join(this.core.fs.ROOT_PATH, this.path));
  }

  async getChildren(): Promise<FileSystemEntity[]> {
    const children = await this.getChildrenAsBaseName();

    return await Promise.all(children.map(async (child) => await this.getChild(child)));
  }

  async getChildrenAsBaseName(): Promise<string[]> {
    try {
      return await fs.readdir(pth.join(this.core.fs.ROOT_PATH, this.path));
    } catch (_err) {
      this.core.log.error("filesystem", `Unable to read directory: ${this.path}`);

      return [];
    }
  }

  async create() {
    await fs.mkdir(pth.join(this.core.fs.ROOT_PATH, this.path), { recursive: true });

    return this;
  }

  getChild(path: string) {
    return this.core.fs.get(pth.join(this.path, path));
  }
}
