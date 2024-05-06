/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import {
  Application as ExpressApplication,
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction,
} from "express";
import { Core } from "./core.js";

export default class CoreRequest {
  private core: Core;
  rawExpress: ExpressApplication;
  private currentNamespace: string;

  constructor(core: Core) {
    this.rawExpress = core.rawExpressJs;
    this.core = core;
    this.currentNamespace = "";
  }

  setNamespace(namespace: string): this {
    this.currentNamespace = namespace;

    return this;
  }

  get(path: string, callback: (req: ExpressRequest, res: ExpressResponse) => void): this {
    this.core.log.info(
      "core_request",
      "Request created: " + (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
    );

    this.rawExpress.get(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
      (req: ExpressRequest, res: ExpressResponse) => {
        callback(req, res);
      },
    );

    return this;
  }

  post(path: string, callback: (req: ExpressRequest, res: ExpressResponse) => void): this {
    this.rawExpress.post(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
      (req: ExpressRequest, res: ExpressResponse) => {
        callback(req, res);
      },
    );

    return this;
  }

  put(path: string, callback: (req: ExpressRequest, res: ExpressResponse) => void): this {
    this.rawExpress.put(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
      (req: ExpressRequest, res: ExpressResponse) => {
        callback(req, res);
      },
    );

    return this;
  }

  delete(path: string, callback: (req: ExpressRequest, res: ExpressResponse) => void): this {
    this.rawExpress.delete(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
      (req: ExpressRequest, res: ExpressResponse) => {
        callback(req, res);
      },
    );

    return this;
  }

  patch(path: string, callback: (req: ExpressRequest, res: ExpressResponse) => void): this {
    this.rawExpress.patch(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
      (req: ExpressRequest, res: ExpressResponse) => {
        callback(req, res);
      },
    );

    return this;
  }

  options(path: string, callback: (req: ExpressRequest, res: ExpressResponse) => void): this {
    this.rawExpress.options(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
      (req: ExpressRequest, res: ExpressResponse) => {
        callback(req, res);
      },
    );

    return this;
  }

  use(callback: (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => void): this {
    this.rawExpress.use((req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
      callback(req, res, next);
    });

    return this;
  }

  usePath(
    path: string,
    callback: (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => void,
  ): this {
    this.rawExpress.use(path, (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
      callback(req, res, next);
    });

    return this;
  }
}
