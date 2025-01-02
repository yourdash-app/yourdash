/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { promises as fs } from "fs";
import pth from "path";
import { Core } from "../core.js";
import { AUTHENTICATED_IMAGE_TYPE } from "../coreImage.js";
import FSEntity, { FILESYSTEM_ENTITY_TYPE } from "./FSEntity.js";
import FSError, { FS_ERROR_TYPE } from "./FSError.js";
import crypto from "crypto";

export default class FSFile extends FSEntity {
  private readonly core: Core;
  entityType = FILESYSTEM_ENTITY_TYPE.FILE as const;

  constructor(core: Core, path: string) {
    super(path);
    this.core = core;

    return this;
  }

  getName(): string {
    return pth.basename(this.path);
  }

  getExtension(): string {
    try {
      return pth.extname(this.path).toLowerCase();
    } catch (err) {
      this.core.log.error("filesystem", `unable to get extension of ${this.path}`);
      return "";
    }
  }

  getType(): "image" | "video" | "audio" | "link" | "unknown" | "typescript" | "javascript" {
    switch (this.getExtension()) {
      case ".avif":
      case ".png":
      case ".jpeg":
      case ".jpg":
      case ".jfif":
      case ".bmp":
      case ".gif":
      case ".tiff":
      case ".webp":
        return "image";
      case ".mp4":
      case ".webm":
      case ".mov":
      case ".m4v":
      case ".mkv":
      case ".avi":
      case ".webv":
      case ".wmv":
        return "video";
      case ".mp3":
      case ".m4a":
      case ".wav":
      case ".ogg":
      case ".flac":
      case ".aac":
      case ".opus":
      case ".weba":
        return "audio";
      case ".lnk":
        return "link";
      case ".ts":
      case ".tsx":
        return "typescript";
      case ".js":
      case ".jsx":
        return "typescript";
      default:
        return "unknown";
    }
  }

  // returns a sha256 hash of the file
  async getContentHash(): Promise<string> {
    const file = await this.core.fs.getFile(this.path);

    if (file instanceof FSError) {
      this.core.log.warning("filesystem", `unable to get content hash of ${this.path}`);
      return "";
    }

    return crypto
      .createHash("sha256")
      .update(await file.read("buffer"))
      .digest("hex");
  }

  getThumbnail(username: string, sessionId: string): string {
    switch (this.getType()) {
      case "image":
        return this.core.image.createAuthenticatedImage(
          username,
          sessionId,
          AUTHENTICATED_IMAGE_TYPE.FILE,
          pth.resolve(pth.join(this.core.fs.ROOT_PATH, this.path)),
        );
      default:
        return "not implemented";
    }
  }

  getMetadata() {
    return fs.stat(this.path);
  }

  async read<ReadFileType extends "string" | "buffer" | "json">(
    readAs: ReadFileType,
  ): Promise<ReadFileType extends "string" ? string : ReadFileType extends "buffer" ? Buffer : object> {
    switch (readAs) {
      case "string":
        // @ts-ignore
        return (await fs.readFile(pth.join(this.core.fs.ROOT_PATH, this.path))).toString();
      case "buffer":
        // @ts-ignore
        return await fs.readFile(pth.join(this.core.fs.ROOT_PATH, this.path));
      case "json":
        try {
          return JSON.parse((await fs.readFile(pth.join(this.core.fs.ROOT_PATH, this.path))).toString());
        } catch (err) {
          this.core.log.error(
            "filesystem",
            `cannot read file '${this.path}' as JSON. absolute path: ${pth.join(this.core.fs.ROOT_PATH, this.path)}`,
            err,
          );
          // @ts-ignore
          return {};
        }
      default:
        throw new Error(`Unsupported read type: ${readAs}`);
    }
  }

  /**
   *
   * @param {string | Buffer} data
   * @returns {Promise<void>}
   * @throws {FSError}
   *
   */
  async write(data: string | Buffer): Promise<void> {
    if (this.isLocked().locked) {
      throw new FSError(FS_ERROR_TYPE.LOCKED, this.path);
    }

    if (!(await this.doesExist())) {
      await fs.mkdir(pth.dirname(this.path), { recursive: true });
    }

    try {
      await fs.writeFile(pth.join(this.core.fs.ROOT_PATH, this.path), data);
    } catch (e) {
      this.core.log.error("filesystem", `unable to write to ${this.path}`, e, pth.join(this.core.fs.ROOT_PATH, this.path));
    }

    return;
  }
}
