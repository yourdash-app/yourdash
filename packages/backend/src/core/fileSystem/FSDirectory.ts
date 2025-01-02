/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
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

  async getChildren(): Promise<FSEntity[] | null> {
    const children = await this.getChildrenAsBaseName();

    try {
      return (
        await Promise.all(
          children.map(async (childPath) => {
            try {
              const child = await this.getChild(childPath);

              return child;
            } catch (err) {
              // @ts-ignore
              this.core.log.debug("filesystem", "Failed at getChildren()", { error: err });
            }
          }),
        )
      ).filter(Boolean) as FSEntity[];
    } catch (err) {
      this.core.log.error("filesystem", `Unable to read directory: ${this.path}`, err);
      return [];
    }
  }

  async getChildDirectories(): Promise<FSDirectory[]> {
    const children = await this.getChildren();

    if (!children) {
      return [];
    }

    if (children instanceof FSError) {
      this.core.log.debug("filesystem", "Failed at getChildDirectories()", children.toString());

      return [];
    }

    return children.filter((entity) => entity?.entityType === FILESYSTEM_ENTITY_TYPE.DIRECTORY) as FSDirectory[];
  }

  // FIXME(ewsgit): an FSError will be returned instead of an empty array but it's not clear where the FSError originates
  async getChildFiles(): Promise<FSFile[]> {
    const children = await this.getChildren();

    if (!children) {
      return [];
    }

    if (children instanceof FSError) {
      this.core.log.debug("filesystem", "Failed at getChildren()", children.toString());

      return [];
    }

    return (children.filter((entity) => entity?.entityType === FILESYSTEM_ENTITY_TYPE.FILE) as FSFile[]) || [];
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

  getChild(path: string): Promise<FSFile | FSDirectory | FSError | null> | null {
    try {
      return this.core.fs.get(pth.join(this.path, path));
    } catch (err) {
      if (err instanceof FSError) {
        this.core.log.debug("filesystem", "Failed at getChild()", err.toString());
        return null;
      }
      throw err;
    }
  }
}
