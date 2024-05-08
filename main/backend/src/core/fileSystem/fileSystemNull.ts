/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Core } from "../core.js";
import FileSystemEntity, { FILESYSTEM_ENTITY_TYPE } from "./fileSystemEntity.js";

export default class FileSystemNull extends FileSystemEntity {
  private readonly core: Core;
  entityType = FILESYSTEM_ENTITY_TYPE.NULL as const;

  constructor(core: Core) {
    super("<null>");
    this.core = core;

    return this;
  }

  getName(): string {
    return "<null>";
  }

  getExtension(): string {
    return "<null>";
  }

  getType(): "unknown" {
    return "unknown";
  }

  async doesExist(): Promise<boolean> {
    return false;
  }
}
