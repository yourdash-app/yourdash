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
import z from "zod";
import { OpenApiGeneratorV31, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import yaml from "yaml";
import nodeJsFs from "fs";
import path from "path";
import openApiTS, { astToString } from "openapi-typescript/dist/index.js";

export type RequestHeaders = { username: string; sessionid: string };
export type RequestExtras = { headers: RequestHeaders; sessionId: string; username: string };

export default class CoreRequest {
  rawExpress: ExpressApplication;
  private core: Core;
  private currentNamespace: string;
  endpoints: string[];
  openApiRegistry: OpenAPIRegistry;

  constructor(core: Core) {
    this.rawExpress = core.rawExpressJs;
    this.core = core;
    this.currentNamespace = "";
    this.endpoints = [];
    this.openApiRegistry = new OpenAPIRegistry();
  }

  setNamespace(namespace: string): this {
    this.currentNamespace = namespace;

    return this;
  }

  private endpointFromPath(path: string): string {
    return (this.currentNamespace ? "/" : "") + this.currentNamespace + path;
  }

  async __internal_generateOpenAPIDefinitions() {
    const generator = new OpenApiGeneratorV31(this.openApiRegistry.definitions);

    const documentation = generator.generateDocument({
      openapi: "3.1.0",
      info: {
        version: "1.0.0",
        title: "YourDash Backend API",
        description: "This is the YourDash Backend API for the current YourDash Instance and it's loaded modules",
      },
      servers: [{ url: "http://localhost:3563/" }],
    });

    const yamlDocumentation = yaml.stringify(documentation);

    const cwd = process.cwd();

    nodeJsFs.writeFileSync(path.join(cwd, "../../", "openapi.yml"), yamlDocumentation, { encoding: "utf8" });

    const contents = astToString(await openApiTS(new URL(path.join(cwd, "../../", "openapi.yml"), import.meta.url).toString()));

    nodeJsFs.writeFileSync(path.join(cwd, "../csi/", "openapi.ts"), contents);

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get<TResBody extends z.ZodTypeAny>(
    path: string | string[],
    resBodyType: TResBody,
    callback: (
      req: ExpressRequest & RequestExtras,
      res: ExpressResponse<z.infer<TResBody>>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ExpressResponse<z.infer<TResBody>, Record<string, any>> | void>,
    description: string = "Sample description",
  ): this {
    let endpointPath: string[];

    if (typeof path === "string") {
      endpointPath = [path];
    } else {
      endpointPath = path;
    }

    for (const path of endpointPath) {
      // TODO: add a cli flag to re-enable this
      // if (this.core.isDebugMode) {
      // this.core.log.info("request", "Request created: " + this.endpointFromPath(path));
      // }

      this.openApiRegistry.registerPath({
        method: "get",
        path: (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
        description: description,
        responses: {
          200: {
            content: {
              "application/json": {
                schema: resBodyType,
              },
            },
            description: description,
          },
        },
      });

      this.rawExpress.get(
        (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
        async (req: ExpressRequest, res: ExpressResponse<TResBody>) => {
          try {
            const time = await timeMethod(() =>
              callback({ ...req, sessionId: req.headers.sessionid as string, username: req.headers.username as string } as never, res),
            );
            res.setHeader(
              "yourdash-metrics-time-took",
              JSON.stringify({ microsecconds: time.microseconds, formattedMicrosecconds: time.formattedMicrosecconds }),
            );
          } catch (err) {
            if (err instanceof Error) {
              this.core.log.error("request_error", `GET ${req.path}; Request error not caught: ${err.message}`);
            }
          }
        },
      );
    }

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post<TResponse = any>(
    path: string,
    callback: (req: ExpressRequest & RequestExtras, res: ExpressResponse<TResponse>) => Promise<ExpressResponse<TResponse> | void>,
  ): this {
    this.rawExpress.post(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
      // @ts-ignore
      async (req: ExpressRequest & RequestExtras, res: ExpressResponse<TResponse>) => {
        try {
          await callback(req, res);
        } catch (err) {
          if (err instanceof Error) {
            this.core.log.error(`request_error`, new Error());
            this.core.log.error("request_error", `POST ${req.path}\nRequest error not caught: ${err?.message || ""}`);
          }
        }
      },
    );

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put<TResponse = any>(
    path: string,
    callback: (
      req: ExpressRequest & RequestExtras,
      res: ExpressResponse<TResponse>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ExpressResponse<TResponse, Record<string, any>> | void>,
  ): this {
    this.rawExpress.put(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
      // @ts-ignore
      async (req: ExpressRequest & RequestExtras, res: ExpressResponse<TResponse>) => {
        try {
          await callback(req, res);
        } catch (err) {
          if (err instanceof Error) {
            this.core.log.error(`request_error`, new Error().stack);
            this.core.log.error("request_error", `PUT ${req.path}; Request error not caught: ${err.message}`);
          }
        }
      },
    );

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete<TResponse = any>(
    path: string,
    callback: (
      req: ExpressRequest & RequestExtras,
      res: ExpressResponse<TResponse>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ExpressResponse<TResponse, Record<string, any>> | void>,
  ): this {
    this.rawExpress.delete(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
      // @ts-ignore
      async (req: ExpressRequest & RequestExtras, res: ExpressResponse<TResponse>) => {
        try {
          await callback(req, res);
        } catch (err) {
          if (err instanceof Error) {
            this.core.log.error(`request_error`, new Error().stack);
            this.core.log.error("request_error", `DELETE ${req.path}; Request error not caught: ${err.message}`);
          }
        }
      },
    );

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  patch<TResponse = any>(
    path: string,
    callback: (
      req: ExpressRequest & RequestExtras,
      res: ExpressResponse<TResponse>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ExpressResponse<TResponse, Record<string, any>> | void>,
  ): this {
    this.rawExpress.patch(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
      // @ts-ignore
      async (req: ExpressRequest & RequestExtras, res: ExpressResponse<TResponse>) => {
        try {
          await callback(req, res);
        } catch (err) {
          if (err instanceof Error) {
            this.core.log.error(`request_error`, new Error().stack);
            this.core.log.error("request_error", `PATCH ${req.path}; Request error not caught: ${err.message}`);
          }
        }
      },
    );

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options<TResponse = any>(
    path: string,
    callback: (
      req: ExpressRequest & RequestExtras,
      res: ExpressResponse<TResponse>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ExpressResponse<TResponse, Record<string, any>> | void>,
  ): this {
    this.rawExpress.options(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
      // @ts-ignore
      async (req: ExpressRequest & RequestExtras, res: ExpressResponse<TResponse>) => {
        try {
          await callback(req, res);
        } catch (err) {
          if (err instanceof Error) {
            this.core.log.error(`request_error`, new Error().stack);
            this.core.log.error("request_error", `OPTIONS ${req.path}; Request error not caught: ${err.message}`);
          }
        }
      },
    );

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propfind<TResponse = unknown>(
    path: string | string[],
    callback: (
      req: ExpressRequest & RequestExtras,
      res: ExpressResponse<TResponse>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ExpressResponse<TResponse, Record<string, any>> | void>,
    options?: { debugTimer: boolean },
  ): this {
    let endpointPath: string[];

    if (typeof path === "string") {
      endpointPath = [path];
    } else {
      endpointPath = path;
    }

    for (const path of endpointPath) {
      // TODO: add a cli flag to re-enable this
      // if (this.core.isDebugMode) {
      // this.core.log.info("request", "Request created: " + this.endpointFromPath(path));
      // }

      if (this.core.processArguments)
        if (options?.debugTimer) {
          this.rawExpress.propfind(
            (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
            async (req: ExpressRequest, res: ExpressResponse<TResponse>) => {
              try {
                const time = await timeMethod(() =>
                  callback({ ...req, sessionId: req.headers.sessionid as string, username: req.headers.username as string } as never, res),
                );

                this.core.log.debug("response_time", `${req.path} took ${time.formattedMicrosecconds}`);
              } catch (err) {
                if (err instanceof Error) {
                  this.core.log.error(`request_error`, new Error().stack);
                  this.core.log.error(
                    "request_error",
                    `PROPFIND ${req.path}; Request error not caught: ${err?.message || "No error message provided"}`,
                  );
                }
              }
            },
          );

          return this;
        }

      this.rawExpress.propfind(
        (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
        async (req: ExpressRequest, res: ExpressResponse<TResponse>) => {
          try {
            await callback({ ...req, sessionId: req.headers.sessionid as string, username: req.headers.username as string } as never, res);
          } catch (err) {
            if (err instanceof Error) {
              this.core.log.error("request_error", `PROPFIND ${req.path}; Request error not caught: ${err.message}`);
            }
          }
        },
      );
    }

    return this;
  }

  use(
    callback: (
      req: ExpressRequest & RequestExtras,
      res: ExpressResponse,
      next: ExpressNextFunction,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<any>,
  ): this {
    // @ts-ignore
    this.rawExpress.use(async (req: ExpressRequest & RequestExtras, res: ExpressResponse, next: ExpressNextFunction) => {
      try {
        await callback(req, res, next);
      } catch (err) {
        if (err instanceof Error) {
          this.core.log.error(`request_error`, new Error().stack);
          this.core.log.error("request_error", `${req.path}; Request error not caught: ${err.message}`);
        }
      }
    });

    return this;
  }

  usePath(
    path: string,
    callback: (
      req: ExpressRequest & RequestExtras,
      res: ExpressResponse,
      next: ExpressNextFunction,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<any>,
  ): this {
    this.rawExpress.use(
      path,
      // @ts-ignore
      async (req: ExpressRequest & RequestExtras, res: ExpressResponse, next: ExpressNextFunction) => {
        try {
          await callback(req, res, next);
        } catch (err) {
          if (err instanceof Error) {
            this.core.log.error(`request_error`, new Error().stack);
            this.core.log.error("request_error", `${req.path}; Request error not caught: ${err.message}`);
          }
        }
      },
    );

    return this;
  }
}
