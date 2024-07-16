/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { promises as fs } from "fs";
import { Core } from "../core.js";
import FSEntity, { FILESYSTEM_ENTITY_TYPE } from "./FSEntity.js";
import pth from "path";
import FSError from "./FSError.js";
import FSFile from "./FSFile.js";

export default class FSDirectory extends FSEntity {
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

  async getChildren(): Promise<FSEntity[]> {
    const children = await this.getChildrenAsBaseName();

    return (
      await Promise.all(
        children.map(async (childPath) => {
          const child = await this.getChild(childPath);

          if (child instanceof FSError) {
            return null;
          }

          return child;
        }),
      )
    ).filter(Boolean) as FSEntity[];
  }

  async getChildDirectories(): Promise<FSDirectory[]> {
    return (await this.getChildren()).filter((entity) => entity?.entityType === FILESYSTEM_ENTITY_TYPE.DIRECTORY) as FSDirectory[];
  }

  async getChildFiles(): Promise<FSFile[]> {
    return (await this.getChildren()).filter((entity) => entity?.entityType === FILESYSTEM_ENTITY_TYPE.FILE) as FSFile[];
  }

  async getChildrenAsBaseName(): Promise<string[]> {
    try {
      return await fs.readdir(pth.join(this.core.fs.ROOT_PATH, this.path));
    } catch (_err) {
      this.core.log.error("filesystem", `Unable to read directory: ${this.path}`);

      // an FSError has occurred, but we send an empty array instead
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
