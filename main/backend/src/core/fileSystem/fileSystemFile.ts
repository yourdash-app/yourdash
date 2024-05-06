/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { promises as fs } from "fs";
import pth from "path";
import { Core } from "../core.js";
import { AUTHENTICATED_IMAGE_TYPE } from "../coreImage.js";
import FileSystemEntity from "./fileSystemEntity.js";

export default class FileSystemFile extends FileSystemEntity {
  private readonly core: Core;
  entityType = "file" as const;

  constructor(core: Core, path: string) {
    super(path);
    this.core = core;

    return this;
  }

  getName(): string {
    return pth.basename(this.path);
  }

  getExtension(): string {
    return pth.extname(this.path).toLowerCase();
  }

  getType(): "image" | "video" | "audio" | "unknown" {
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
      default:
        return "unknown";
    }
  }

  getThumbnail(username: string): string {
    switch (this.getType()) {
      case "image":
        return this.core.image.createAuthenticatedImage(
          username,
          AUTHENTICATED_IMAGE_TYPE.FILE,
          pth.resolve(this.path),
        );
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
      this.core.log.error("filesystem", `unable to write to ${this.path}`);
    }

    return;
  }
}
