/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { promises as fs } from "fs";
import pth from "path";
import { Core } from "../core.js";
import coreVerifyFileSystem from "./coreVerifyFileSystem.js";
import FileSystemDirectory from "./fileSystemDirectory.js";
import FileSystemError, { FILESYSTEM_ERROR } from "./fileSystemError.js";
import FileSystemFile from "./fileSystemFile.js";
import FileSystemLock from "./fileSystemLock.js";

export default class coreFileSystem {
  ROOT_PATH: string;
  core: Core;
  readonly verifyFileSystem: coreVerifyFileSystem;
  __internal__fileSystemLocks: Map<string, FileSystemLock[]>;

  constructor(core: Core) {
    this.ROOT_PATH = pth.resolve(core.processArguments?.["fs-root"] || pth.join(process.cwd(), "./../../fs/"));
    this.core = core;
    this.verifyFileSystem = new coreVerifyFileSystem(this.core);
    this.__internal__fileSystemLocks = new Map<string, FileSystemLock[]>();

    return this;
  }

  async get(path: string) {
    try {
      if ((await this.getEntityType(path)) === "directory") {
        return new FileSystemDirectory(this.core, path);
      } else {
        return new FileSystemFile(this.core, path);
      }
    } catch (_err) {
      return null;
    }
  }

  async getOrCreateFile(path: string) {
    const file = await this.getFile(path);

    if (file instanceof FileSystemError) {
      if (file.reason === FILESYSTEM_ERROR.DOES_NOT_EXIST) {
        return this.createFile(path);
      }
    }

    if (!(await file)) {
      await fs.writeFile(pth.dirname(path), "");
    }

    return file;
  }

  async getFile(path: string): Promise<FileSystemFile | FileSystemError | null> {
    try {
      if ((await this.getEntityType(path)) === "file") {
        return new FileSystemFile(this.core, path);
      }
    } catch (err) {
      if (err instanceof FileSystemError) {
        if (err.reason === FILESYSTEM_ERROR.DOES_NOT_EXIST) {
          this.core.log.warning("filesystem", `unable to get file at ${path} because it does not exist.`);
        }

        if (err.reason === FILESYSTEM_ERROR.NOT_A_FILE) {
          this.core.log.warning("filesystem", `Unable to get file as ${path} because is is not a file.`);
        }

        this.core.log.error("filesystem", "generic filesystem error", err);
        return err;
      }

      return null;
    }

    return this.createFile(path);
  }

  async getDirectory(path: string): Promise<FileSystemDirectory | FileSystemError | null> {
    try {
      if ((await this.getEntityType(path)) === "directory") {
        return new FileSystemDirectory(this.core, path);
      }
    } catch (err) {
      if (err instanceof FileSystemError) {
        if (err.reason === FILESYSTEM_ERROR.DOES_NOT_EXIST) {
          this.core.log.warning("filesystem", `unable to get directory at ${path} because it does not exist.`);
        }

        if (err.reason === FILESYSTEM_ERROR.NOT_A_DIRECTORY) {
          this.core.log.warning("filesystem", `Unable to get directory at ${path} because is is not a directory.`);
        }

        return err;
      }

      return null;
    }

    return await this.createDirectory(path);
  }

  async getOrCreateDirectory(path: string) {
    const dir = new FileSystemDirectory(this.core, path);

    if (!(await dir.doesExist())) {
      await dir.create();
    }

    return dir;
  }

  async getEntityType(path: string): Promise<"file" | "directory"> {
    return (await fs.stat(pth.join(this.ROOT_PATH, path))).isDirectory() ? "directory" : "file";
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

  async createFile(path: string): Promise<FileSystemFile | FileSystemError> {
    const file = new FileSystemFile(this.core, path);

    if (await file.doesExist()) {
      return new FileSystemError(FILESYSTEM_ERROR.ALREADY_EXISTS);
    }

    await file.write("");

    return file;
  }

  async createDirectory(path: string) {
    const dir = new FileSystemDirectory(this.core, path);
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
}
