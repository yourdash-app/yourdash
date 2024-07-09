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
import timeMethod from "../lib/time.js";
import { Core } from "./core.js";

export type RequestHeaders = { username: string; sessionid: string };
export type RequestExtras = { headers: RequestHeaders; sessionId: string; username: string };

export default class CoreRequest {
  rawExpress: ExpressApplication;
  private core: Core;
  private currentNamespace: string;
  endpoints: string[];

  constructor(core: Core) {
    this.rawExpress = core.rawExpressJs;
    this.core = core;
    this.currentNamespace = "";
    this.endpoints = [];
  }

  setNamespace(namespace: string): this {
    this.currentNamespace = namespace;

    return this;
  }

  private endpointFromPath(path: string): string {
    return (this.currentNamespace ? "/" : "") + this.currentNamespace + path;
  }

  get(
    path: string | string[],
    callback: (
      req: ExpressRequest & RequestExtras,
      res: ExpressResponse,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ExpressResponse<any, Record<string, any>> | void>,
    options?: { debugTimer: boolean },
  ): this {
    let endpointPath: string[];

    // TODO: add a cli flag to re-enable this
    // if (this.core.isDebugMode) {
    this.core.log.info("core_request", "Request created: " + this.endpointFromPath(path));
    // }

    if (typeof path === "string") {
      endpointPath = [path];
    } else {
      endpointPath = path;
    }

    for (const path of endpointPath) {
      if (this.core.processArguments)
        if (options?.debugTimer) {
          this.rawExpress.get(
            (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
            async (req: ExpressRequest, res: ExpressResponse) => {
              try {
                const time = await timeMethod(() =>
                  callback({ ...req, sessionId: req.headers.sessionid as string, username: req.headers.username as string } as never, res),
                );

                this.core.log.debug("response_time", `${req.path} took ${time.formattedMicrosecconds}`);
              } catch (err) {
                this.core.log.error(`request_error`, new Error().stack);
                this.core.log.error(
                  "request_error",
                  `${req.path}; Request error not caught: ${err?.message || "No error message provided"}`,
                );
              }
            },
          );

          return this;
        }

      this.rawExpress.get(
        (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
        async (req: ExpressRequest, res: ExpressResponse) => {
          try {
            await callback({ ...req, sessionId: req.headers.sessionid as string, username: req.headers.username as string } as never, res);
          } catch (err) {
            this.core.log.error(`request_error`, new Error().stack);
            this.core.log.error("request_error", `${req.path}; Request error not caught: ${err.message}`);
          }
        },
      );
    }

    return this;
  }

  post(
    path: string,
    callback: (
      req: ExpressRequest & { headers: RequestHeaders },
      res: ExpressResponse,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ExpressResponse<any, Record<string, any>> | void>,
  ): this {
    this.rawExpress.post(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
      async (req: ExpressRequest & { headers: RequestHeaders }, res: ExpressResponse) => {
        try {
          await callback(req, res);
        } catch (err) {
          this.core.log.error(`request_error`, new Error().stack);
          this.core.log.error("request_error", `${req.path}; Request error not caught: ${err.message}`);
        }
      },
    );

    return this;
  }

  put(
    path: string,
    callback: (
      req: ExpressRequest & { headers: RequestHeaders },
      res: ExpressResponse,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ExpressResponse<any, Record<string, any>> | void>,
  ): this {
    this.rawExpress.put(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
      async (req: ExpressRequest & { headers: RequestHeaders }, res: ExpressResponse) => {
        try {
          await callback(req, res);
        } catch (err) {
          this.core.log.error(`request_error`, new Error().stack);
          this.core.log.error("request_error", `${req.path}; Request error not caught: ${err.message}`);
        }
      },
    );

    return this;
  }

  delete(
    path: string,
    callback: (
      req: ExpressRequest & { headers: RequestHeaders },
      res: ExpressResponse,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ExpressResponse<any, Record<string, any>> | void>,
  ): this {
    this.rawExpress.delete(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
      async (req: ExpressRequest & { headers: RequestHeaders }, res: ExpressResponse) => {
        try {
          await callback(req, res);
        } catch (err) {
          this.core.log.error(`request_error`, new Error().stack);
          this.core.log.error("request_error", `${req.path}; Request error not caught: ${err.message}`);
        }
      },
    );

    return this;
  }

  patch(
    path: string,
    callback: (
      req: ExpressRequest & { headers: RequestHeaders },
      res: ExpressResponse,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ExpressResponse<any, Record<string, any>> | void>,
  ): this {
    this.rawExpress.patch(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
      async (req: ExpressRequest & { headers: RequestHeaders }, res: ExpressResponse) => {
        try {
          await callback(req, res);
        } catch (err) {
          this.core.log.error(`request_error`, new Error().stack);
          this.core.log.error("request_error", `${req.path}; Request error not caught: ${err.message}`);
        }
      },
    );

    return this;
  }

  options(
    path: string,
    callback: (
      req: ExpressRequest & { headers: RequestHeaders },
      res: ExpressResponse,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ExpressResponse<any, Record<string, any>> | void>,
  ): this {
    this.rawExpress.options(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
      async (req: ExpressRequest & { headers: RequestHeaders }, res: ExpressResponse) => {
        try {
          await callback(req, res);
        } catch (err) {
          this.core.log.error(`request_error`, new Error().stack);
          this.core.log.error("request_error", `${req.path}; Request error not caught: ${err.message}`);
        }
      },
    );

    return this;
  }

  use(
    callback: (
      req: ExpressRequest & { headers: RequestHeaders },
      res: ExpressResponse,
      next: ExpressNextFunction,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<any>,
  ): this {
    this.rawExpress.use(async (req: ExpressRequest & { headers: RequestHeaders }, res: ExpressResponse, next: ExpressNextFunction) => {
      try {
        await callback(req, res, next);
      } catch (err) {
        this.core.log.error(`request_error`, new Error().stack);
        this.core.log.error("request_error", `${req.path}; Request error not caught: ${err.message}`);
      }
    });

    return this;
  }

  usePath(
    path: string,
    callback: (
      req: ExpressRequest & { headers: RequestHeaders },
      res: ExpressResponse,
      next: ExpressNextFunction,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<any>,
  ): this {
    this.rawExpress.use(
      path,
      async (req: ExpressRequest & { headers: RequestHeaders }, res: ExpressResponse, next: ExpressNextFunction) => {
        try {
          await callback(req, res, next);
        } catch (err) {
          this.core.log.error(`request_error`, new Error().stack);
          this.core.log.error("request_error", `${req.path}; Request error not caught: ${err.message}`);
        }
      },
    );

    return this;
  }
}
