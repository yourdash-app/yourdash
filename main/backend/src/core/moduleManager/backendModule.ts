/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Request as ExpressRequest } from "express";
import path from "path";
import core, { Core } from "../core.js";
import { LOG_TYPE } from "../coreLog.js";
import YourDashUser from "../user/index.js";

export interface YourDashModuleArguments {
  moduleName: string;
  modulePath: string;
}

export default class BackendModule {
  readonly moduleName: string;
  protected readonly api: {
    websocket: Core["websocketManager"];
    request: Core["request"];
    log(type: LOG_TYPE, ...message: unknown[]): void;
    getPath(): string;
    applicationName: string;
    moduleName: string;
    getUser(req: ExpressRequest): YourDashUser;
    core: Core;
    path: string;
    modulePath: string;
  };
  public unload?: () => void;

  constructor(args: YourDashModuleArguments) {
    this.moduleName = args.moduleName;
    this.api = {
      websocket: core.websocketManager,
      request: core.request,
      log(type: LOG_TYPE, ...message: (string | Uint8Array)[]) {
        switch (type) {
          case LOG_TYPE.INFO:
            core.log.info(`app/${this.moduleName}`, ...message);
            return;
          case LOG_TYPE.ERROR:
            core.log.error(`app/${this.moduleName}`, ...message);
            return;
          case LOG_TYPE.SUCCESS:
            core.log.success(`app/${this.moduleName}`, ...message);
            return;
          case LOG_TYPE.WARNING:
            core.log.warning(`app/${this.moduleName}`, ...message);
            return;
          default:
            core.log.info(`app/${this.moduleName}`, ...message);
        }
      },
      getPath() {
        return path.resolve(path.join(process.cwd(), "../applications", this.moduleName));
      },
      applicationName: args.moduleName,
      moduleName: args.moduleName,
      getUser(req: ExpressRequest) {
        const username = req.headers.username as string;

        return core.users.get(username);
      },
      core: core,
      path: args.modulePath,
      modulePath: args.modulePath,
    };

    return this;
  }

  loadEndpoints() {
    /* empty */
  }

  loadPreAuthEndpoints() {
    /* empty */
  }
}
