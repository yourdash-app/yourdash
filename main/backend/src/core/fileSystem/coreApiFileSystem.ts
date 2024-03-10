/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { promises as fs } from "fs";
import pth from "path";
import { CoreApi } from "../coreApi.js";
import CoreApiVerifyFileSystem from "./coreApiVerifyFileSystem.js";
import FileSystemDirectory from "./fileSystemDirectory.js";
import FileSystemFile from "./fileSystemFile.js";
import FileSystemLock from "./fileSystemLock.js";

export default class CoreApiFileSystem {
  ROOT_PATH: string;
  coreApi: CoreApi;
  readonly verifyFileSystem: CoreApiVerifyFileSystem;
  __internal__fileSystemLocks: Map<string, FileSystemLock[]>;

  constructor(coreApi: CoreApi) {
    this.ROOT_PATH = pth.resolve(pth.join(process.cwd(), "./../../fs/"));
    this.coreApi = coreApi;
    this.verifyFileSystem = new CoreApiVerifyFileSystem(this.coreApi);
    this.__internal__fileSystemLocks = new Map<string, FileSystemLock[]>();

    return this;
  }

  async get(path: string) {
    try {
      if ((await this.getEntityType(path)) === "directory") {
        return new FileSystemDirectory(this.coreApi, path);
      } else {
        return new FileSystemFile(this.coreApi, path);
      }
    } catch (_err) {
      return null;
    }
  }

  async getOrCreateFile(path: string) {
    if (!(await this.doesExist(path))) {
      await fs.mkdir(pth.dirname(path), { recursive: true });
    }

    return new FileSystemFile(this.coreApi, path);
  }

  async getFile(path: string): Promise<FileSystemFile> | null {
    try {
      if ((await this.getEntityType(path)) === "file") {
        return new FileSystemFile(this.coreApi, path);
      }
    } catch (_err) {
      return null;
    }

    return null;
  }

  async getDirectory(path: string): Promise<FileSystemDirectory> | null {
    try {
      if ((await this.getEntityType(path)) === "directory") {
        return new FileSystemDirectory(this.coreApi, path);
      }
    } catch (_err) {
      return null;
    }

    return null;
  }

  async getOrCreateDirectory(path: string) {
    const dir = new FileSystemDirectory(this.coreApi, path);

    if (!(await dir.doesExist())) {
      await dir.create();
    }

    return dir;
  }

  async getEntityType(path: string): Promise<"file" | "directory"> {
    return (await fs.lstat(path)).isDirectory() ? "directory" : "file";
  }

  async doesExist(path: string): Promise<boolean> {
    try {
      await fs.access(path);
      return true;
    } catch (_err) {
      return false;
    }
  }

  createFile(path: string) {
    return new FileSystemFile(this.coreApi, path);
  }

  async createDirectory(path: string) {
    const dir = new FileSystemDirectory(this.coreApi, path);
    await dir.create();
    return dir;
  }

  async removePath(path: string) {
    return await fs.rm(path, {
      recursive: true,
      maxRetries: 2,
      retryDelay: 500,
    });
  }

  async copy(source: string, destination: string) {
    try {
      await fs.cp(source, destination);
      return true;
    } catch (e) {
      this.coreApi.log.error("core:fs", "Unable to copy file: " + source + " to " + destination);
      return false;
    }
  }
}
