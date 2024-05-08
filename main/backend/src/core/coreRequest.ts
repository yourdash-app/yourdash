/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import {
  Application as ExpressApplication,
  NextFunction as ExpressNextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { Core } from "./core.js";

export default class CoreRequest {
  rawExpress: ExpressApplication;
  private core: Core;
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

  get(
    path: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (req: ExpressRequest, res: ExpressResponse) => Promise<ExpressResponse<any, Record<string, any>> | void>,
  ): this {
    this.core.log.info(
      "core_request",
      "Request created: " + (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
    );

    this.rawExpress.get(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
      async (req: ExpressRequest, res: ExpressResponse) => {
        try {
          await callback(req, res);
        } catch (err) {
          this.core.log.error("request_error", `Request error not caught: ${err.message}`);
        }
      },
    );

    return this;
  }

  post(
    path: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (req: ExpressRequest, res: ExpressResponse) => Promise<ExpressResponse<any, Record<string, any>> | void>,
  ): this {
    this.rawExpress.post(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
      async (req: ExpressRequest, res: ExpressResponse) => {
        try {
          await callback(req, res);
        } catch (err) {
          this.core.log.error("request_error", `Request error not caught: ${err.message}`);
        }
      },
    );

    return this;
  }

  put(
    path: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (req: ExpressRequest, res: ExpressResponse) => Promise<ExpressResponse<any, Record<string, any>> | void>,
  ): this {
    this.rawExpress.put(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
      async (req: ExpressRequest, res: ExpressResponse) => {
        try {
          await callback(req, res);
        } catch (err) {
          this.core.log.error("request_error", `Request error not caught: ${err.message}`);
        }
      },
    );

    return this;
  }

  delete(
    path: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (req: ExpressRequest, res: ExpressResponse) => Promise<ExpressResponse<any, Record<string, any>> | void>,
  ): this {
    this.rawExpress.delete(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
      async (req: ExpressRequest, res: ExpressResponse) => {
        try {
          await callback(req, res);
        } catch (err) {
          this.core.log.error("request_error", `Request error not caught: ${err.message}`);
        }
      },
    );

    return this;
  }

  patch(
    path: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (req: ExpressRequest, res: ExpressResponse) => Promise<ExpressResponse<any, Record<string, any>> | void>,
  ): this {
    this.rawExpress.patch(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
      async (req: ExpressRequest, res: ExpressResponse) => {
        try {
          await callback(req, res);
        } catch (err) {
          this.core.log.error("request_error", `Request error not caught: ${err.message}`);
        }
      },
    );

    return this;
  }

  options(
    path: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (req: ExpressRequest, res: ExpressResponse) => Promise<ExpressResponse<any, Record<string, any>> | void>,
  ): this {
    this.rawExpress.options(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
      async (req: ExpressRequest, res: ExpressResponse) => {
        try {
          await callback(req, res);
        } catch (err) {
          this.core.log.error("request_error", `Request error not caught: ${err.message}`);
        }
      },
    );

    return this;
  }

  use(
    callback: (
      req: ExpressRequest,
      res: ExpressResponse,
      next: ExpressNextFunction,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<any>,
  ): this {
    this.rawExpress.use(async (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
      try {
        await callback(req, res, next);
      } catch (err) {
        this.core.log.error("request_error", `Request error not caught: ${err.message}`);
      }
    });

    return this;
  }

  usePath(
    path: string,
    callback: (
      req: ExpressRequest,
      res: ExpressResponse,
      next: ExpressNextFunction,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<any>,
  ): this {
    this.rawExpress.use(path, async (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
      try {
        await callback(req, res, next);
      } catch (err) {
        this.core.log.error("request_error", `Request error not caught: ${err.message}`);
      }
    });

    return this;
  }
}
