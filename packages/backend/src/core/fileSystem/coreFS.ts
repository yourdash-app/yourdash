/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { promises as fs } from "fs";
import pth from "path";
import { Core } from "../core.js";
import coreVerifyFileSystem from "./coreVerifyFileSystem.js";
import FSDirectory from "./FSDirectory.js";
import FSError, { FS_ERROR_TYPE } from "./FSError.js";
import FSFile from "./FSFile.js";
import FSLock from "./FSLock.js";
import sharp from "sharp";
import path from "path";

export default class coreFS {
  ROOT_PATH: string;
  THUMBNAIL_PATH = "/cache/photos/thumbnails" as const;
  core: Core;
  readonly verifyFileSystem: coreVerifyFileSystem;
  __internal__fileSystemLocks: Map<string, FSLock[]>;

  constructor(core: Core) {
    this.ROOT_PATH = pth.resolve(core.processArguments?.["fs-root"] || pth.join(process.cwd(), "./../../fs/"));
    this.core = core;
    this.verifyFileSystem = new coreVerifyFileSystem(this.core);
    this.__internal__fileSystemLocks = new Map<string, FSLock[]>();

    return this;
  }

  async get(path: string) {
    try {
      if ((await this.getEntityType(path)) === "directory") {
        return new FSDirectory(this.core, path);
      } else {
        return new FSFile(this.core, path);
      }
    } catch (err) {
      if (err instanceof FSError) {
        return err;
      }

      // @ts-ignore
      this.core.log.debug("filesystem", "generic filesystem error @ get()", err.toString());
      return null;
    }
  }

  async getOrCreateFile(path: string) {
    const file = await this.getFile(path);

    if (file instanceof FSError) {
      if (file.reason === FS_ERROR_TYPE.DOES_NOT_EXIST) {
        return await this.createFile(path);
      }
      if (file.reason === FS_ERROR_TYPE.NOT_A_FILE) {
        return file;
      }
    }

    if (!file) {
      await fs.writeFile(pth.dirname(path), "");
    }

    return file;
  }

  async getFile(path: string): Promise<FSFile | FSError> {
    try {
      if ((await this.getEntityType(path)) === "file") {
        return new FSFile(this.core, path);
      }
    } catch (err) {
      if (err instanceof FSError) {
        switch (err.reason) {
          case FS_ERROR_TYPE.DOES_NOT_EXIST:
            this.core.log.warning("filesystem", `unable to get file at '${path}' because it does not exist.`);
            return err;
          case FS_ERROR_TYPE.NOT_A_FILE:
            this.core.log.warning("filesystem", `Unable to get file as '${path}' because is is not a file.`);
            return err;
          case FS_ERROR_TYPE.NO_REASON_PROVIDED:
            this.core.log.warning("filesystem", `A filesystem error has occurred but no reason was provided for '${path}'.`);
            return err;
          case FS_ERROR_TYPE.ALREADY_EXISTS:
            this.core.log.warning(
              "filesystem",
              `Unable to get file at '${path}' because it already exists. (This should not happen as we are not writing to this path!)`,
            );
            return err;
          case FS_ERROR_TYPE.LOCKED:
            this.core.log.warning(
              "filesystem",
              `Unable to get file at '${path}' because it is locked. (This should not happen as we are not writing to this path!)`,
            );
            return err;
        }

        this.core.log.error("filesystem", `generic filesystem error @ getFile(${path})`, JSON.stringify(err));
        return err;
      }

      this.core.log.error("filesystem", `generic filesystem error when getting file at ${path}, this was not an FSError!`, err);
      throw new FSError(FS_ERROR_TYPE.NO_REASON_PROVIDED, path);
    }

    return await this.createFile(path);
  }

  async getDirectory(path: string): Promise<FSDirectory | FSError> {
    try {
      if ((await this.getEntityType(path)) === "directory") {
        return new FSDirectory(this.core, path);
      }
    } catch (err) {
      if (err instanceof FSError) {
        if (err.reason === FS_ERROR_TYPE.DOES_NOT_EXIST) {
          this.core.log.warning("filesystem", `unable to get directory at ${path} because it does not exist.`);
        }

        if (err.reason === FS_ERROR_TYPE.NOT_A_DIRECTORY) {
          this.core.log.warning("filesystem", `Unable to get directory at ${path} because is is not a directory.`);
        }

        return err;
      }

      this.core.log.error("filesystem", `generic filesystem error @ getDirectory(${path})`, err);
      throw new FSError(FS_ERROR_TYPE.NO_REASON_PROVIDED, path);
    }

    return await this.createDirectory(path);
  }

  async getOrCreateDirectory(path: string) {
    const dir = new FSDirectory(this.core, path);

    if (!(await dir.doesExist())) {
      await dir.create();
    }

    return dir;
  }

  async getEntityType(path: string): Promise<"file" | "directory" | FSError> {
    try {
      return (await fs.stat(pth.join(this.ROOT_PATH, path))).isDirectory() ? "directory" : "file";
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === "ENOENT") {
          throw new FSError(FS_ERROR_TYPE.DOES_NOT_EXIST, path);
        }
      }

      this.core.log.error("filesystem", `generic filesystem error @ getEntityType(${path})`, err);
      throw new FSError(FS_ERROR_TYPE.NO_REASON_PROVIDED, path);
    }
  }

  async doesExist(path: string, dontLimitToRootPath = false): Promise<boolean> {
    try {
      if (dontLimitToRootPath) {
        await fs.access(path);
      } else {
        await fs.access(pth.join(this.ROOT_PATH, path));
      }
      return true;
    } catch (_err) {
      return false;
    }
  }

  async createFile(path: string): Promise<FSFile | FSError> {
    const file = new FSFile(this.core, path);

    if (await file.doesExist()) {
      throw new FSError(FS_ERROR_TYPE.ALREADY_EXISTS, path);
    }

    await file.write("");

    return file;
  }

  async createDirectory(path: string) {
    const dir = new FSDirectory(this.core, path);
    await dir.create();
    return dir;
  }

  async removePath(path: string) {
    return await fs.rm(pth.join(this.ROOT_PATH, path), {
      recursive: true,
      maxRetries: 2,
      retryDelay: 500,
    });
  }

  async copy(source: string, destination: string) {
    try {
      await fs.cp(pth.join(this.ROOT_PATH, source), pth.join(this.ROOT_PATH, destination));
      return true;
    } catch (e) {
      this.core.log.error("filesystem", "Unable to copy file: " + source + " to " + destination);
      return false;
    }
  }

  async generateThumbnail(fsPath: string, dimensions: { width: number; height: number }) {
    if (await this.doesExist(path.join(this.ROOT_PATH, this.THUMBNAIL_PATH, fsPath, `${dimensions.width}x${dimensions.height}.webp`)))
      return path.join(this.ROOT_PATH, this.THUMBNAIL_PATH, fsPath, `${dimensions.width}x${dimensions.height}.webp`);

    await this.createDirectory(path.join(this.THUMBNAIL_PATH, fsPath));

    try {
      await sharp(path.resolve(this.ROOT_PATH, fsPath))
        .resize({ width: dimensions.width, height: dimensions.height })
        .toFormat("webp")
        .toFile(path.resolve(path.join(this.ROOT_PATH, this.THUMBNAIL_PATH, fsPath, `${dimensions.width}x${dimensions.height}.webp`)));
    } catch (e) {
      this.core.log.error("fs_thumbnails", "Failed to create thumbnail", path.resolve(fsPath), e);
    }

    return path.join(this.THUMBNAIL_PATH, fsPath, `${dimensions.width}x${dimensions.height}.webp`);
  }
}
