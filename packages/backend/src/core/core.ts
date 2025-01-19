/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { INSTANCE_STATUS } from "@yourdash/backend/resrc/types/instanceStatus.js";
import { LoginLayout } from "@yourdash/shared/core/login/loginLayout.js";
import { YOURDASH_SESSION_TYPE } from "@yourdash/shared/core/session.js";
import { USER_AVATAR_SIZE } from "@yourdash/shared/core/userAvatarSize.js";
import EndpointResponseCoreLoginNotice from "@yourdash/shared/endpoints/core/login/notice.js";
import chalk from "chalk";
import childProcess from "child_process";
import expressCompression from "compression";
import cors from "cors";
import express, { Application as ExpressApplication } from "express";
import { rateLimit } from "express-rate-limit";
import xmlBodyParser from "express-xml-bodyparser";
import { promises as fs, readdirSync as fsReaddirSync, writeFile as fsWriteFile } from "fs";
import http from "http";
import killPort from "kill-port";
import minimist from "minimist";
import path from "path";
import { fetch } from "undici";
import z from "zod";
import { createSession } from "../lib/session.js";
import CoreApplicationManager from "./coreApplicationManager.js";
import CoreCommands from "./coreCommands.js";
import CoreExecute from "./coreExecute.js";
import CoreGlobalDb from "./coreGlobalDb.js";
import CoreImage from "./coreImage.js";
import CoreLoadManagement from "./coreLoadManagement.js";
import CoreLog from "./coreLog.js";
import CorePanel from "./corePanel.js";
import CoreRequest from "./coreRequest.js";
import CoreScheduler from "./coreScheduler.js";
import CoreTeams from "./coreTeams.js";
import CoreUserDatabase from "./coreUserDatabase.js";
import CoreUsers from "./coreUsers.js";
import CoreVideo from "./coreVideo.js";
import CoreFileSystem from "./fileSystem/coreFS.js";
import FSDirectory from "./fileSystem/FSDirectory.js";
import FSError from "./fileSystem/FSError.js";
import FSFile from "./fileSystem/FSFile.js";
import GlobalDBCoreLoginNotice from "./login/loginNotice.js";
import loadNextCloudSupportEndpoints from "./nextcloud/coreNextCloud.js";
import YourDashUser from "./user/index.js";
import CoreWebDAV from "./webDAV/coreWebDAV.js";
import CoreWebsocketManager from "./websocketManager/coreWebsocketManager.js";

extendZodWithOpenApi(z);

declare global {
  const globalThis: {
    // eslint-disable-next-line
    rawConsoleLog: (message?: any, ...optionalParams: any[]) => void;
  };
}

export class Core {
  // core apis
  readonly request: CoreRequest;
  readonly users: CoreUsers;
  readonly log: CoreLog;
  // readonly moduleManager: CoreModuleManager;
  readonly applicationManager: CoreApplicationManager;
  readonly globalDb: CoreGlobalDb;
  readonly commands: CoreCommands;
  readonly fs: CoreFileSystem;
  readonly scheduler: CoreScheduler;
  readonly userDatabase: CoreUserDatabase;
  readonly image: CoreImage;
  readonly panel: CorePanel;
  readonly teams: CoreTeams;
  readonly video: CoreVideo;
  readonly websocketManager: CoreWebsocketManager;
  readonly loadManagement: CoreLoadManagement;
  readonly webdav: CoreWebDAV;
  readonly execute: CoreExecute;

  // general vars
  readonly processArguments: minimist.ParsedArgs;
  readonly rawExpressJs: ExpressApplication;
  readonly httpServer: http.Server;
  readonly isDebugMode: boolean;
  readonly isDevMode: boolean;
  instanceStatus: INSTANCE_STATUS = INSTANCE_STATUS.OK;

  constructor() {
    // Fetch process arguments
    this.processArguments = minimist(process.argv.slice(2));

    // @ts-ignore
    globalThis.rawConsoleLog = globalThis.console.log;

    this.isDebugMode = // @ts-ignore
      typeof global.v8debug === "object" ||
      /--debug|--inspect/.test(process.execArgv.join(" ")) ||
      process.env.NODE_OPTIONS?.includes("javascript-debugger") ||
      !!this.processArguments.dev;

    if (!this.isDebugMode) {
      // eslint-disable-next-line
      globalThis.console.log = (message?: any, ...optionalParams: any[]) => {
        // @ts-ignore
        globalThis.rawConsoleLog(chalk.bold.yellowBright("RAW CONSOLE: ") + message, ...optionalParams);
      };
    }

    this.log = new CoreLog(this);

    this.isDevMode = !!this.processArguments.dev;

    this.log.info(
      "startup",
      "YourDash Starting-up with arguments: ",
      JSON.stringify(this.processArguments, null, 2).replace('  "_": [],\n', ""),
    );

    // Create the rawExpressJs server
    this.rawExpressJs = express();
    this.httpServer = http.createServer(this.rawExpressJs);

    // define core apis
    this.request = new CoreRequest(this);
    this.scheduler = new CoreScheduler(this);
    this.users = new CoreUsers(this);
    // deprecated
    // this.moduleManager = new CoreModuleManager(this);
    this.applicationManager = new CoreApplicationManager(this);
    this.globalDb = new CoreGlobalDb(this);
    this.commands = new CoreCommands(this);
    this.fs = new CoreFileSystem(this);
    this.userDatabase = new CoreUserDatabase(this);
    this.image = new CoreImage(this);
    this.panel = new CorePanel(this);
    this.teams = new CoreTeams(this);
    this.video = new CoreVideo(this);
    this.loadManagement = new CoreLoadManagement(this);
    this.websocketManager = new CoreWebsocketManager(this);
    this.execute = new CoreExecute(this);

    // TODO: implement WebDAV, CalDAV & CardDAV (outdated WebDAV example -> https://github.com/LordEidi/fennel.js/)
    this.webdav = new CoreWebDAV(this);

    this.commands.registerCommand("hello", () => {
      this.log.info("command", "Hello from YourDash!");
    });

    this.commands.registerCommand(["clear", "cl", "cls"], () => {
      process.stdout.cursorTo(0, 0);
      process.stdout.clearScreenDown();
      this.commands.displayPrompt();
    });

    this.commands.registerCommand("restart", async () => {
      this.restartInstance();
    });

    this.commands.registerCommand(["exit", "stop", "shutdown"], async () => {
      this.shutdownInstance();
    });

    this.commands.registerCommand("help", () => {
      this.log.success(
        "help",
        `YourDash Help
- Coming soon
`,
      );
    });

    this.commands.registerCommand("list_endpoints", () => {
      this.log.success(
        "list_endpoints",
        JSON.stringify(
          this.request.openApiRegistry.definitions.map((r) => {
            return {
              // @ts-ignore
              method: r.route.method, // @ts-ignore
              path: r.route.path, // @ts-ignore
              description: r.route.description,
            };
          }),
          null,
          2,
        ),
      );
    });

    this.commands.registerCommand("gdb", (args) => {
      const subCommand = args[0];
      const key = args[1];
      const value = args[2];

      switch (subCommand) {
        case "set":
          this.globalDb.set(key, value);
          this.log.info("command", `set "${key}" to "${value}"`);
          break;
        case "get":
          this.log.info("command", this.globalDb.get(key) || "undefined");
          break;
        case "delete":
          this.globalDb.removeValue(key);
          this.log.info("command", `deleted "${key}"`);
          break;
        default:
          this.log.info(
            "command",
            'gdb ( Global Database )\n- get: "gdb get {key}"\n- set: "gdb set {key} {value}"\n- delete: "gdb delete {key}"',
          );
      }
    });

    process.on("SIGTERM", () => {
      this.log.info("shutdown", "SIGTERM received, shutting down YourDash...");
      this.shutdownInstance();
    });

    process.on("SIGINT", () => {
      this.log.info("shutdown", "SIGTERM received, shutting down YourDash...");
      this.shutdownInstance();
    });

    process.on("SIGHUP", () => {
      this.log.info("shutdown", "SIGTERM received, shutting down YourDash...");
      this.shutdownInstance();
    });

    return this;
  }

  // start the YourDash Instance
  __internal__startInstance() {
    console.time("core_startup");
    this.log.info("startup", "Welcome to the YourDash Instance backend! created by Ewsgit -> https://ewsgit.uk");

    this.fs.doesExist("./global_database.json").then(async (doesGlobalDatabaseFileExist) => {
      if (doesGlobalDatabaseFileExist) {
        await this.globalDb.loadFromDisk("./global_database.json");
      }

      this.fs.verifyFileSystem.verify();
      this.users.__internal__startUserDatabaseService();
      this.users.__internal__startUserDeletionService();
      this.globalDb.__internal__startGlobalDatabaseService();
      this.teams.__internal__startTeamDatabaseService();

      await this.__internal__startExpressServer();
      await this.loadCoreEndpoints();
      await this.__internal__startViteServer();
    });
    return this;
  }

  // start the backend's request server
  async __internal__startExpressServer() {
    return new Promise<void>(async (resolve) => {
      try {
        await killPort(3563);
        this.log.info("startup", "Killed port 3563");
        this.httpServer.listen(3563, () => {
          this.log.success("startup", "server now listening on port 3563!");
          this.log.success("startup", "YourDash initialization complete!");
          resolve();
        });
      } catch (err) {
        if (err instanceof Error) {
          if (err.message === "No process running on port") {
            this.log.info("startup", "Attempted to kill port 3563, no process running was currently using port 3563");

            this.httpServer.listen(3563, () => {
              this.log.success("startup", "server now listening on port 3563!");
              this.log.success("startup", "YourDash initialization complete!");
              resolve();
            });

            return;
          }

          this.log.warning("startup", "Unable to kill port 3563", JSON.stringify(err));
          return;
        }

        this.log.info("startup", "Retrying to kill port 3563");
        await this.__internal__startExpressServer();
      }
    });
  }

  // start the frontend's vite server
  // This will be used when a resource doesn't exist on the public frontend
  async __internal__startViteServer() {
    this.log.info("startup", "Generating officialFrotend routes...");

    // generate the appRouter
    await (async () => {
      let fileTemplate = `/**
 * This file is auto-generated by backend/src/core.ts during vite server startup don't edit this file for any reason
*/

import loadable from "@loadable/component";
import React from "react";
import { Route, Routes } from "react-router";

/* region loadable */const AppRouter=()=><Routes>{/* region routes */}</Routes>;export default AppRouter
`;

      let loadableRegionReplacement = "";
      let routeRegionReplacement = "";

      this.applicationManager.loadedModules.officialFrontend.forEach((mod, ind) => {
        loadableRegionReplacement += `const Application${ind}=loadable(()=>import("../../../../applications/${path.posix.join(path.basename(mod.applicationPath), mod.config.main.replace(".tsx", ""))}"));`;
        routeRegionReplacement += `<Route path={"${mod.config.id}/*"} element={<Application${ind}/>}/>`;
      });

      fileTemplate = fileTemplate.replace("/* region loadable */", loadableRegionReplacement);
      fileTemplate = fileTemplate.replace("{/* region routes */}", routeRegionReplacement);

      fs.writeFile(path.resolve(process.cwd(), "../web/src/app/AppRouter.tsx"), fileTemplate).then(() => {
        this.log.info("core/startup", "Generated AppRouter.tsx Successfully");
      });
    })();

    // generate meta.yourdash.ts files for every officialFrontendModule & frontendModule
    for (const application of this.applicationManager.loadedApplications) {
      // TODO: generate meta files for non-officialFrontend applicationModules
      for (const mod of application.config.modules.officialFrontend) {
        await (async () => {
          let fileTemplate = `/**
 * This file is auto-generated by backend/src/core.ts during express server startup don't edit this file for any reason
*/
/* region code */
`;

          const codeRegionReplacement = `import openApi from "./openapi.yourdash.ts";import {ClientServerInteraction} from "@yourdash/csi/coreCSI.js";import {useNavigate} from "react-router-dom";const applicationMeta:{$schema:string;id:string;displayName:string;category:string;authors:{name:string;url:string;bio:string;avatarUrl:string}[];maintainers:{name:string;url:string;bio:string;avatarUrl:string}[];description:string;license:string;modules:{backend:{id:string;main:string;description:string;dependencies:{moduleType:"backend"|"frontend"|"officialFrontend";id:string}[];}[];frontend:{id:string;displayName:string;iconPath:string;url:string;devUrl:string;description:string;dependencies:{moduleType:"backend"|"frontend"|"officialFrontend";id:string}[];main:string;}[];officialFrontend:{id:string;main:string;displayName:string;iconPath:string;description:string;dependencies:{moduleType:"backend"|"frontend"|"officialFrontend";id:string}[];}[];};shouldInstanceRestartOnInstall:boolean;__internal__generatedFor:"frontend"|"officialFrontend";}=${JSON.stringify(
            {
              ...application.config,
              __internal__generatedFor: "officialFrontend",
            },
          )};export default applicationMeta;const acsi=new ClientServerInteraction<openApi>("/app/${application.config.modules.backend[0].id}");const useNavigateTo=()=>{const navigate=useNavigate();return (path: string)=>navigate("/app/a/${application.config.modules.officialFrontend[0].id}"+path)};const modulePath = "/app/a/${application.config.modules.officialFrontend[0].id}";export{acsi,useNavigateTo,modulePath};`;

          fileTemplate = fileTemplate.replace("/* region code */", codeRegionReplacement);

          const file = await this.fs.getOrCreateFile(
            path.join(application.path, mod.main.replace(path.basename(mod.main), ""), "meta.yourdash.ts"),
          );

          if (file instanceof FSError) {
            this.log.error("startup", `Failed to generate meta.yourdash.ts for application: "${application.id}"`, file);
            return;
          }

          await file.write(fileTemplate);
        })();
      }
    }

    if (this.isDevMode) {
      this.log.info("startup", "Not starting Vite server as we are in dev mode");

      return this;
    }

    this.log.info("startup", "Starting Vite server...");

    const viteProcess = childProcess.spawn("yarn", ["run", "start"], { cwd: "../web/", shell: true });

    let portInUse = false;

    viteProcess.stdout.on("data", (data) => {
      if (data.toString() === "$ vite --host\n") {
        return;
      }

      if (data.toString().includes("is in use, trying another one...")) {
        if (portInUse) {
          return;
        }

        portInUse = true;

        viteProcess.kill("SIGTERM");
        this.log.info(
          "vite",
          "The YourDash frontend's port was already in use, killing the viteProcess on port '5173' and trying again...",
        );

        killPort(5173)
          .then(() => {
            this.__internal__startViteServer();
          })
          .catch(() => {
            this.log.error("vite", "Unable to kill port 5173");
          });

        return;
      }

      this.log.info("vite", data.toString().replaceAll("\n", "\n                            "));
    });

    viteProcess.stderr.on("data", (data) => {
      this.log.error("vite", data.toString());
    });

    viteProcess.on("error", (error) => {
      this.log.error("vite", error.toString());
    });

    viteProcess.on("exit", (code) => {
      this.log.info("vite", `Vite server exited with code ${code}`);
    });

    viteProcess.on("close", (code) => {
      this.log.info("vite", `Vite server closed with code ${code}`);
    });

    viteProcess.on("uncaughtException", (error) => {
      this.log.error("vite", error.toString());
    });

    viteProcess.on("unhandledRejection", (error) => {
      this.log.error("vite", error.toString());
    });

    return this;
  }

  // gracefully shutdown the YourDash Instance, optionally keep the process running
  shutdownInstance(dontExitProcess = false) {
    this.log.info("core", "Shutting down...");

    fsReaddirSync(path.resolve(this.fs.ROOT_PATH, "./users")).forEach(async (username) => {
      await this.users.__internal__saveUserDatabaseInstantly(username);
    });

    this.scheduler.__internal__onShutdown();

    this.httpServer.close(() => {
      this.log.info("core", "HTTP Server closed");
    });

    const LOG_OUTPUT = this.log.logHistory
      .map((hist) => {
        return `${hist.type}: ${hist.message}`;
      })
      .join("\n");

    fsWriteFile(path.join(this.fs.ROOT_PATH, "./log.log"), LOG_OUTPUT, (err) => {
      if (err) {
        this.log.error("core", `Failed to save log file; ${err}`);
      }
    });

    try {
      this.globalDb.__internal__doNotUseOnlyIntendedForShutdownSequenceWriteToDisk(path.join("./global_database.json")).then(() => {
        this.log.info("global_db", "Successfully saved global database");
      });
    } catch (e) {
      this.log.error(
        "global_db",
        "[EXTREME SEVERITY] Shutdown Error! failed to save global database. User data will have been lost! (approx <= past 5 minutes)",
      );
    }

    if (!dontExitProcess) {
      process.exit(0);
    }
  }

  // gracefully shutdown and restart the YourDash Instance
  restartInstance() {
    this.shutdownInstance(true);
    this.__internal__startInstance();

    return this;
  }

  private startRequestLogger(options: { logOptionsRequests?: boolean; logQueryParameters?: boolean }) {
    this.request.use(async (req, _res, next) => {
      switch (req.method.toUpperCase()) {
        case "GET":
          if (req.path.startsWith("/core/auth-img")) {
            return next();
          }
          if (req.path.startsWith("/core/auth-video")) {
            return next();
          }

          this.log.info(
            "request",
            `${chalk.bgBlack(chalk.green(" GET "))} ${chalk.bold(req.path)} ${options.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
          );
          break;
        case "POST":
          this.log.info(
            "request",
            `${chalk.bgBlack(chalk.blue(" POS "))} ${chalk.bold(req.path)} ${options.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
          );
          break;
        case "DELETE":
          this.log.info(
            "request",
            `${chalk.bgBlack(chalk.red(" DEL "))} ${chalk.bold(req.path)} ${options.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
          );
          break;
        case "OPTIONS":
          if (options.logOptionsRequests) {
            this.log.info(
              "request",
              `${chalk.bgBlack(chalk.cyan(" OPT "))} ${chalk.bold(req.path)} ${options.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
            );
          }
          break;
        case "PROPFIND":
          this.log.info(
            "request",
            `${chalk.bgBlack(chalk.cyan(" PFI "))} ${chalk.bold(req.path)} ${options.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
          );
          break;
        case "PROPPATCH":
          this.log.info(
            "request",
            `${chalk.bgCyan(chalk.cyan(" PPA "))} ${chalk.bold(req.path)} ${options.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
          );
          break;
        default:
          this.log.error(
            "core_requests",
            `ERROR IN REQUEST LOGGER, UNKNOWN REQUEST TYPE: ${req.method}, ${chalk.bold(req.path)} ${options.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
          );
      }

      // run the next middleware / endpoint
      next();
    });

    this.log.success("requests", `Started the requests logger${options && " (options request logging is enabled)"}`);
  }

  private async loadCoreEndpoints() {
    if (this.processArguments["log-requests"]) {
      this.startRequestLogger({
        logOptionsRequests: !!this.processArguments["log-options-requests"],
        logQueryParameters: !!this.processArguments["log-query-parameters"],
      });
    }

    this.rawExpressJs.use(async (_req, res, next) => {
      // remove the X-Powered-By header to prevent exploitation from knowing the software powering the request server
      // this is a security measure against exploiters who don't look into the project's source code
      res.removeHeader("X-Powered-By");

      return next();
    });
    this.rawExpressJs.use(cors());
    this.rawExpressJs.use(
      rateLimit({
        limit: 500,
        windowMs: 60_000,
        message: (req: any, res: any) => {
          this.log.warning("request", "rate limited request");
          return res.status(429).json({ error: true, message: "Rate-Limited" });
        },
        skip: (req) => {
          return req.path.startsWith("/core/auth-img") || req.path.startsWith("/core/auth-video");
        },
      }),
    );
    this.rawExpressJs.use(express.json({ limit: 50_000_000 }));
    this.rawExpressJs.use(xmlBodyParser());
    this.rawExpressJs.use(express.urlencoded({ extended: true }));

    this.request.use(async (req, res, next) => expressCompression()(req, res, next));

    // INFO: This shouldn't be used for detection of a YourDash Instance, instead use the '/test' endpoint
    this.request.get("/", z.null(), async (_req, res) => {
      if (this.isDevMode) {
        return res.redirect(`http://localhost:5173/login/http://localhost:3563`);
      }

      return res.redirect(`https://yourdash.ewsgit.uk/login/${this.globalDb.get("core:instanceurl")}`);
    });

    // Server discovery endpoint
    this.request.get("/test", z.object({ status: z.nativeEnum(INSTANCE_STATUS), type: z.string() }), async (_req, res) => {
      return res.status(200).json({
        status: this.instanceStatus,
        type: "yourdash",
      });
    });

    this.request.get("/ping", z.string(), async (_req, res) => {
      // INFO: This shouldn't be used for detection of a YourDash Instance, instead use the '/test' endpoint
      return res.send("pong");
    });

    this.request.get("/core/test/self-ping", z.object({ success: z.boolean() }), async (_req, res) => {
      return res.json({ success: true });
    });

    // on startup, we ping ourselves to check if the webserver is running and accepting requests
    this.log.info("self_ping_test", "pinging self");

    fetch("http://localhost:3563/core/test/self-ping")
      .then((res) => res.json())
      // @ts-ignore
      .then((data: { success?: boolean }) => {
        if (data?.success) {
          return this.log.success("self_ping_test", "self ping successful - The server is receiving requests");
        }
        this.log.error("self_ping_test", "CRITICAL ERROR!, unable to ping self");
      })
      .catch(() => {
        this.log.error("self_ping_test", "CRITICAL ERROR!, unable to ping self");
      });

    this.request.get("/login/user/:username/avatar", z.unknown(), async (req, res) => {
      const user = new YourDashUser(req.params.username);
      return res.sendFile(path.join(this.fs.ROOT_PATH, user.getAvatar(USER_AVATAR_SIZE.EXTRA_LARGE)));
    });

    this.request.get(
      "/login/user/:username",
      z.object({ name: z.object({ first: z.string(), last: z.string() }) }).or(z.object({ error: z.string() })),
      async (req, res) => {
        const user = new YourDashUser(req.params.username);
        if (await user.doesExist()) {
          return res.json({
            name: (await user.getName()) || {
              first: "Name Not Found",
              last: "Or Not Set",
            },
          });
        } else {
          console.log("Does not exist");
          return res.json({ error: "Unknown user" });
        }
      },
    );

    this.request.post(
      "/login/user/:username/authenticate",
      z.object({ password: z.string() }),
      z.object({ token: z.string(), sessionId: z.number() }).or(z.object({ error: z.string() })),
      async (req, res) => {
        if (!req.body) {
          return res.status(400).json({ error: "Invalid or missing request body" });
        }

        const username = req.params.username;
        const password = req.body.password;

        if (!username || username === "") {
          return res.json({ error: "Missing username" });
        }

        if (!password || password === "") {
          return res.json({ error: "Missing password" });
        }

        const user = new YourDashUser(username);

        let savedHashedPassword = "";
        try {
          savedHashedPassword = await ((await this.fs.getFile(path.join(user.path, "core/password.enc"))) as FSFile).read("string");
        } catch (e) {
          this.log.error("authentication", "Unable to read password from disk", e);
        }

        const isThePassword = await Bun.password.verify(password, savedHashedPassword);

        if (isThePassword) {
          const session = await createSession(
            username,
            req.headers?.type === "desktop" ? YOURDASH_SESSION_TYPE.DESKTOP : YOURDASH_SESSION_TYPE.WEB,
          );

          return res.json({
            token: session.sessionToken,
            sessionId: session.sessionId,
          });
        } else {
          this.log.info("login", `Incorrect password provided for user ${username}`);
          return res.status(500).json({ error: "Incorrect password" });
        }
      },
    );

    this.request.get("/login/is-authenticated", z.object({ success: z.boolean() }), async (req, res) => {
      const { username, token } = req.headers as {
        username?: string;
        token?: string;
      };

      if (!username || !token) {
        return res.json({ success: false });
      }

      if (!this.users.__internal__getSessionsDoNotUseOutsideOfCore()[username]) {
        try {
          const user = new YourDashUser(username);
          // @ts-ignore
          this.users.__internal__getSessionsDoNotUseOutsideOfCore()[username] = (await user.getAllLoginSessions()) || [];
        } catch (_err) {
          this.log.info("login", `User with username ${username} not found`);
          return res.json({ success: false });
        }
      }

      if (this.users.__internal__getSessionsDoNotUseOutsideOfCore()[username].find((session) => session.sessionToken === token)) {
        return res.json({ success: true });
      }

      return res.json({ success: false });
    });

    this.request.get("/core/theme/:username", z.unknown().or(z.object({ error: z.string() })), async (req, res) => {
      const username = req.params.username;
      const user = this.users.get(username);

      if (!user || !(await user.doesExist())) {
        return res.json({ error: "User not found" });
      }

      return res.sendFile(path.join(this.fs.ROOT_PATH, user.getThemePath()));
    });

    this.request.get(
      "/login/instance/metadata",
      z.object({ title: z.string(), message: z.string(), loginLayout: z.nativeEnum(LoginLayout) }),
      async (_req, res) => {
        return res.json({
          title: this.globalDb.get("core:instance:name") || "Placeholder name",
          message: this.globalDb.get("core:instance:message") || "Placeholder message. Hey system admin, you should change this!",
          loginLayout: this.globalDb.get("core:instance:login:layout") || LoginLayout.CARDS,
        });
      },
    );

    this.request.get("/login/instance/background", z.unknown(), async (_req, res) => {
      return res.sendFile(path.resolve(this.fs.ROOT_PATH, "./login_background.avif"));
    });

    try {
      this.webdav.__internal__loadEndpoints();
    } catch (e) {
      this.log.error("webdav", "Error caught in webdav.__internal__loadEndpoints(); ", e);
    }

    try {
      this.image.__internal__loadEndpoints();
    } catch (e) {
      this.log.error("image", "Error caught in image.__internal__loadEndpoints(); ", e);
    }

    try {
      this.video.__internal__loadEndpoints();
    } catch (e) {
      this.log.error("video", "Error caught in video.__internal__loadEndpoints(); ", e);
    }

    try {
      this.log.__internal__loadEndpoints();
    } catch (e) {
      this.log.error("log", "Error caught in log.__internal__loadEndpoints(); ", e);
    }

    try {
      loadNextCloudSupportEndpoints(this);
    } catch (e) {
      this.log.error("nextcloud", "Error caught in loadNextCloudSupportEndpoints", e);
    }

    try {
      this.websocketManager.__internal__loadEndpoints();
    } catch (e) {
      this.log.error("websocketManager", "Error caught in loadWebsocketManagerEndpoints", e);
    }

    try {
      console.time("core_load_modules");
      await this.applicationManager.loadInstalledApplications();

      const externalApplications: string | string[] = this.processArguments["load-external-application"] || [];

      if (externalApplications.length > 0) {
        this.log.info("external_modules", "Loading external module(s): ", JSON.stringify(externalApplications, null, 2));
      }

      if (externalApplications) {
        if (typeof externalApplications === "string") {
          // external Modules is a string
          try {
            await this.applicationManager.loadApplication(externalApplications);
          } catch (err) {
            if (err instanceof Error) {
              this.log.error("startup", `Failed to load external module ${externalApplications}`, err);
            }
          }
        } else {
          // externalApplications must be an array
          for (const externalModule of externalApplications) {
            try {
              await this.applicationManager.loadApplication(externalModule);
            } catch (err) {
              if (err instanceof Error) {
                this.log.error("startup", `Failed to load external module ${externalModule}`, err);
              }
            }
          }
        }
      }

      this.log.info("startup", "All modules loaded successfully");
    } catch (err) {
      this.log.error("startup", err);
      this.log.error("startup", "Failed to load all modules");
    }

    try {
      this.applicationManager.loadedModules.backend.map((mod) => {
        try {
          mod.module.loadPreAuthEndpoints();
          this.log.success("startup", `Loaded pre-auth endpoints for ${mod.config.id}`);
        } catch (err) {
          this.log.error("startup", `Failed to load pre-auth endpoints for ${mod.config.id}`, err);
        }
      });
    } catch (err) {
      this.log.error("startup", "Failed to load pre-auth endpoints for all modules", err);
    }

    /**
     ########################################################################
     ##                                                                    ##
     ##   WARNING: all endpoints require authentication after this point   ##
     ##                                                                    ##
     ########################################################################
     */

    // Check for user authentication
    this.request.use(async (req, res, next) => {
      const { username, token } = req.headers as {
        username?: string;
        token?: string;
      };

      function failAuth() {
        res.status(401);
        return res.json({ error: "authorization fail" });
      }

      if (!username || !token) {
        this.log.warning("authentication", `Request was made without authentication, ${username} ${req.path}`);
        return failAuth();
      }

      if (!this.users.__internal__getSessionsDoNotUseOutsideOfCore()[username]) {
        try {
          const user = this.users.get(username);

          // @ts-ignore
          this.users.__internal__getSessionsDoNotUseOutsideOfCore()[username] = (await user.getAllLoginSessions()) || [];

          const database = await ((await this.fs.getFile(path.join(user.path, "core/user_db.json"))) as FSFile).read("string");

          if (database) {
            (await user.getDatabase()).clear().merge(JSON.parse(database));
          } else {
            (await user.getDatabase()).clear();
            await ((await this.fs.getFile(path.join(user.path, "core/user_db.json"))) as FSFile).write("{}");
          }
        } catch (_err) {
          return failAuth();
        }
      }

      if (this.users.__internal__getSessionsDoNotUseOutsideOfCore()[username]?.find((session) => session.sessionToken === token)) {
        return next();
      }

      return failAuth();
    });

    console.log("core:load_modules starting");
    console.time("core:load_modules");

    try {
      if (!(this.applicationManager.loadedModules.backend.length > 0)) this.log.warning("startup", "No modules have been loaded!");

      await Promise.all(
        this.applicationManager.loadedModules.backend.map(async (mod) => {
          try {
            // the await is necessary
            mod.module.loadEndpoints();
            this.log.success("module_manager", `Loaded endpoints for ${mod.config.id}`);
          } catch (err) {
            this.log.error("startup", `Failed to load post-auth endpoints for ${mod.config.id}`, err);
          }
        }),
      );
    } catch (err) {
      this.log.error("startup", "Failed to load post-auth endpoints for all modules", err);
    }

    console.timeEnd("core:load_modules");

    this.request.setNamespace("");

    this.request.get(
      "/core/login/notice",
      z.object({
        author: z.optional(z.string()),
        message: z.optional(z.string()),
        timestamp: z.optional(z.number()),
        display: z.boolean(),
      }),
      async (_req, res) => {
        const notice = this.globalDb.get<GlobalDBCoreLoginNotice>("core:login:notice");

        if (!notice) {
          return res.json(<EndpointResponseCoreLoginNotice>{
            author: undefined,
            message: undefined,
            timestamp: undefined,
            display: false,
          });
        }

        return res.json(<EndpointResponseCoreLoginNotice>{
          author: notice.author ?? "Instance Administrator",
          display: notice.displayType === "onLogin" && true,
          message: notice.message ?? "Placeholder message. Hey system admin, you should change this!",
          timestamp: notice.timestamp ?? 1,
        });
      },
    );

    this.request.get("/core/hosted-applications/", z.object({ applications: z.array(z.string()) }), async (_req, res) => {
      const hostedApplications = (await this.fs.getDirectory(path.join(process.cwd(), "../../hostedApplications"))) as FSDirectory;

      return res.json({ applications: await hostedApplications.getChildrenAsBaseName() });
    });

    this.request.get("/user/sessions", z.object({ sessions: z.object({}) }), async (req, res) => {
      const { username } = req.headers;

      const user = this.users.get(username);

      return res.json({ sessions: await user.getAllLoginSessions() });
    });

    this.request.delete("/core/session/:id", z.object({ success: z.boolean() }), async (req, res) => {
      const { username } = req.headers;
      const { id: sessionId } = req.params;

      const user = this.users.get(username);

      const sessionIdInt = parseInt(sessionId, 10);

      await user.getLoginSessionById(sessionIdInt)?.invalidate();

      return res.json({ success: true });
    });

    this.userDatabase.__internal__loadEndpoints();
    this.panel.__internal__loadEndpoints();
    this.users.__internal__loadEndpoints();
    this.teams.__internal__loadEndpoints();

    this.request.use(async (req, res) => {
      this.log.info("request:404", `${chalk.bgRed(chalk.black(" 404 "))} ${req.path} (the path was not answered by the backend)`);
      return res.status(404).json({ error: "this endpoint does not exist!" });
    });

    // noinspection ES6MissingAwait
    this.request.__internal_generateOpenAPIDefinitions();

    console.timeEnd("core:startup");
  }

  // flag the instance as needing a restart,
  // This will prompt the admin user with a notification to restart the instance, the notification will provide the administrator with
  // the reason for the restart along with the application which has requested it.
  flagForRestart(requestingApplicationName: string, reason: string): boolean {
    // TODO: notify the admin group

    return false;
  }
}

const core = new Core();

export default core;
