/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import childProcess from "node:child_process";
import { Core } from "./core.js";

export default class CoreExecute {
  core: Core;

  constructor(core: Core) {
    this.core = core;

    return this;
  }

  exec(command: string, cwd: string = this.core.fs.ROOT_PATH) {
    return childProcess.exec(command, { cwd });
  }
}
