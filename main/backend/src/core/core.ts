/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { APPLICATION_TYPE } from "@yourdash/shared/core/application.js";
import { INSTANCE_STATUS } from "@yourdash/shared/core/instanceStatus.js";
import { LoginLayout } from "@yourdash/shared/core/login/loginLayout.js";
import EndpointResponseCoreApplications from "@yourdash/shared/endpoints/core/applications.js";
import EndpointResponseCoreLoginNotice from "@yourdash/shared/endpoints/core/login/notice.js";
import EndpointResponseLoginInstanceMetadata from "@yourdash/shared/endpoints/login/instance/metadata.js";
import chalk from "chalk";
import expressCompression from "compression";
import cors from "cors";
import express, { Application as ExpressApplication } from "express";
import { promises as fs, readdirSync as fsReaddirSync, writeFile as fsWriteFile } from "fs";
import http from "http";
import killPort from "kill-port";
import minimist from "minimist";
import path from "path";
import { fetch } from "undici";
import { compareHashString } from "../lib/encryption.js";
import { createSession } from "../lib/session.js";
import CoreCommands from "./coreCommands.js";
import CoreGlobalDb from "./coreGlobalDb.js";
import CoreImage from "./coreImage.js";
import CoreLog from "./coreLog.js";
import CoreRequest from "./coreRequest.js";
import CoreTeams from "./coreTeams.js";
import CoreVideo from "./coreVideo.js";
import GlobalDBCoreLoginNotice from "./login/loginNotice.js";
import BackendModule from "./moduleManager/backendModule.js";
import loadNextCloudSupportEndpoints from "./nextcloud/coreNextCloud.js";
import CoreWebDAV from "./webDAV/coreWebDAV.js";
import CoreModuleManager from "./moduleManager/coreModuleManager.js";
import CorePanel from "./corePanel.js";
import CoreScheduler from "./coreScheduler.js";
import CoreUserDatabase from "./coreUserDatabase.js";
import CoreUsers from "./coreUsers.js";
import CoreFileSystem from "./fileSystem/coreFileSystem.js";
import CoreLoadManagement from "./coreLoadManagement.js";
import { USER_AVATAR_SIZE } from "@yourdash/shared/core/userAvatarSize.js";
import YourDashUser from "./user/index.js";
import { YOURDASH_SESSION_TYPE } from "@yourdash/shared/core/session.js";
import CoreWebsocketManager from "./websocketManager/coreWebsocketManager.js";

export class Core {
  // core apis
  readonly request: CoreRequest;
  readonly users: CoreUsers;
  readonly log: CoreLog;
  readonly moduleManager: CoreModuleManager;
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

  // general vars
  readonly processArguments: minimist.ParsedArgs;
  readonly rawExpressJs: ExpressApplication;
  readonly httpServer: http.Server;
  readonly isDebugMode: boolean;
  readonly isDevMode: boolean;
  instanceStatus: INSTANCE_STATUS = INSTANCE_STATUS.OK;

  constructor() {
    const rawConsoleLog = globalThis.console.log;

    // eslint-disable-next-line
    globalThis.console.log = (message?: any, ...optionalParams: any[]) => {
      rawConsoleLog(chalk.bold.yellowBright("RAW CONSOLE: ") + message, ...optionalParams);
    };

    this.isDebugMode = typeof global.v8debug === "object" || /--debug|--inspect/.test(process.execArgv.join(" "));

    this.log = new CoreLog(this);

    // Fetch process arguments
    this.processArguments = minimist(process.argv.slice(2));

    this.isDevMode = !!this.processArguments.dev;

    this.log.info("startup", "Beginning YourDash Startup with args: ", JSON.stringify(this.processArguments));

    // Create the rawExpressJs server
    this.rawExpressJs = express();
    this.httpServer = http.createServer(this.rawExpressJs);

    // define core apis
    this.request = new CoreRequest(this);
    this.scheduler = new CoreScheduler(this);
    this.users = new CoreUsers(this);
    this.moduleManager = new CoreModuleManager(this);
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

    // TODO: implement WebDAV & CalDAV & CardDAV (outdated WebDAV example -> https://github.com/LordEidi/fennel.js/)
    this.webdav = new CoreWebDAV(this);

    this.log.info("core", `Process id is ${process.pid}`);

    this.commands.registerCommand("hello", () => {
      this.log.info("command", "Hello from YourDash!");
    });

    this.commands.registerCommand("restart", async () => {
      await this.restartInstance();
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
          this.log.info("command", this.globalDb.get(key));
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
    this.log.info("startup", "Welcome to the YourDash Instance backend");

    this.fs
      .doesExist(path.join(this.fs.ROOT_PATH, "./global_database.json"))
      .then(async (doesGlobalDatabaseFileExist) => {
        if (doesGlobalDatabaseFileExist)
          await this.globalDb.loadFromDisk(path.join(this.fs.ROOT_PATH, "./global_database.json"));

        this.fs.verifyFileSystem.verify().then(async () => {
          this.users.__internal__startUserDatabaseService();
          this.users.__internal__startUserDeletionService();
          this.globalDb.__internal__startGlobalDatabaseService();
          this.teams.__internal__startTeamDatabaseService();

          const attemptToListen = async () => {
            try {
              await killPort(3563);
              this.log.info("startup", "Killed port 3563");
              this.httpServer.listen(3563, () => {
                this.log.success("startup", "server now listening on port 3563!");
                this.log.success("startup", "YourDash initialization complete!");
                this.loadCoreEndpoints();
              });
            } catch (err) {
              if (err.message === "No process running on port") {
                this.log.info(
                  "startup",
                  "Attempted to kill port 3563, no process running was currently using port 3563",
                );

                this.httpServer.listen(3563, () => {
                  this.log.success("startup", "server now listening on port 3563!");
                  this.log.success("startup", "YourDash initialization complete!");
                  this.loadCoreEndpoints();
                });
                return;
              }

              this.log.warning("startup", "Unable to kill port 3563", err);
              await attemptToListen();
            }
          };

          await attemptToListen();
        });
      });
    return this;
  }

  private startRequestLogger(options: { logOptionsRequests?: boolean; logQueryParameters?: boolean }) {
    this.request.use((req, res, next) => {
      switch (req.method) {
        case "GET":
          this.log.info(
            "request",
            `${chalk.bgGreen(chalk.black(" GET "))} ${req.path} ${
              options.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""
            }`,
          );
          break;
        case "POST":
          this.log.info(
            "request",
            `${chalk.bgBlue(chalk.black(" POS "))} ${req.path} ${
              options.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""
            }`,
          );
          break;
        case "DELETE":
          this.log.info(
            "request",
            `${chalk.bgRed(chalk.black(" DEL "))} ${req.path} ${
              options.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""
            }`,
          );
          break;
        case "OPTIONS":
          if (options.logOptionsRequests) {
            this.log.info(
              "request",
              `${chalk.bgCyan(chalk.black(" OPT "))} ${req.path} ${
                options.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""
              }`,
            );
          }
          break;
        case "PROPFIND":
          this.log.info("request", `${chalk.bgCyan(chalk.black(" PFI "))} ${req.path}`);
          break;
        case "PROPPATCH":
          this.log.info("request", `${chalk.bgCyan(chalk.black(" PPA "))} ${req.path}`);
          break;
        default:
          this.log.error("core:requests", `ERROR IN REQUEST LOGGER, UNKNOWN REQUEST TYPE: ${req.method}, ${req.path}`);
      }

      // run the next middleware / endpoint
      next();
    });

    this.log.success(
      "core:requests",
      `Started the requests logger${options && " (logging options requests is also enabled)"}`,
    );
  }

  private async loadCoreEndpoints() {
    if (this.processArguments["log-requests"]) {
      this.startRequestLogger({
        logOptionsRequests: !!this.processArguments["log-options-requests"],
        logQueryParameters: !!this.processArguments["log-query-parameters"],
      });
    }

    this.request.use(cors());
    this.request.use(express.json({ limit: "50mb" }));
    this.request.use(express.urlencoded({ extended: true }));

    this.request.use((_req, res, next) => {
      // remove the X-Powered-By header to prevent exploitation from knowing the software powering the request server
      // this is a security measure against exploiters who don't look into the project's source code
      res.removeHeader("X-Powered-By");

      next();
    });

    this.request.use(expressCompression());

    // INFO: This shouldn't be used for detection of a YourDash Instance, instead use the '/test' endpoint
    this.request.get("/", (_req, res) => {
      if (this.isDevMode) {
        return res.redirect(`http://localhost:5173/login/http://localhost:3563`);
      }

      return res.redirect(`https://ydsh.pages.dev/login/${this.globalDb.get("core:instanceurl")}`);
    });

    // Server discovery endpoint
    this.request.get("/test", (_req, res) => {
      return res.status(200).json({
        status: this.instanceStatus,
        type: "yourdash",
      });
    });

    this.request.get("/ping", (_req, res) => {
      // INFO: This shouldn't be used for detection of a YourDash Instance, instead use the '/test' endpoint
      return res.send("pong");
    });

    this.request.get("/core/test/self-ping", (_req, res) => {
      return res.json({ success: true });
    });

    // on startup, we ping ourselves to check if the webserver is running and accepting requests
    this.log.info("self_ping_test", "pinging self");

    fetch("http://localhost:3563/core/test/self-ping")
      .then((res) => res.json())
      .then((data: { success?: boolean }) => {
        if (data?.success) {
          return this.log.success("self_ping_test", "self ping successful - The server is receiving requests");
        }
        this.log.error("self_ping_test", "CRITICAL ERROR!, unable to ping self");
      })
      .catch(() => {
        this.log.error("self_ping_test", "CRITICAL ERROR!, unable to ping self");
      });

    this.request.get("/login/user/:username/avatar", (req, res) => {
      const user = new YourDashUser(req.params.username);
      return res.sendFile(user.getAvatar(USER_AVATAR_SIZE.EXTRA_LARGE));
    });

    this.request.get("/login/user/:username", async (req, res) => {
      const user = new YourDashUser(req.params.username);
      if (await user.doesExist()) {
        console.log("Does exist");
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
    });

    this.request.post("/login/user/:username/authenticate", async (req, res) => {
      if (!req.body) return res.status(400).json({ error: "Missing request body" });

      const username = req.params.username;
      const password = req.body.password;

      if (!username || username === "") {
        return res.json({ error: "Missing username" });
      }

      if (!password || password === "") {
        return res.json({ error: "Missing password" });
      }

      const user = new YourDashUser(username);

      const savedHashedPassword = (await fs.readFile(path.join(user.path, "core/password.enc"))).toString();

      return compareHashString(savedHashedPassword, password)
        .then(async (result) => {
          if (result) {
            const session = await createSession(
              username,
              req.headers?.type === "desktop" ? YOURDASH_SESSION_TYPE.desktop : YOURDASH_SESSION_TYPE.web,
            );

            return res.json({
              token: session.sessionToken,
              sessionId: session.sessionId,
            });
          } else {
            return res.json({ error: "Incorrect password" });
          }
        })
        .catch(() => {
          this.log.error("login", `Hash comparison failed for user ${username}`);
          res.status(500);
          return res.json({ error: "Login failure" });
        });
    });

    this.request.get("/login/is-authenticated", async (req, res) => {
      const { username, token } = req.headers as {
        username?: string;
        token?: string;
      };

      if (!username || !token) return res.json({ success: false });

      if (!this.users.__internal__getSessionsDoNotUseOutsideOfCore()[username]) {
        try {
          const user = new YourDashUser(username);
          this.users.__internal__getSessionsDoNotUseOutsideOfCore()[username] =
            (await user.getAllLoginSessions()) || [];
        } catch (_err) {
          this.log.info("login", `User with username ${username} not found`);
          return res.json({ error: true });
        }
      }

      if (
        this.users
          .__internal__getSessionsDoNotUseOutsideOfCore()
          [username].find((session) => session.sessionToken === token)
      ) {
        return res.json({ success: true });
      }

      return res.json({ success: false });
    });

    this.request.get("/core/theme/:username", (req, res) => {
      const username = req.params.username;
      const user = this.users.get(username);

      if (!user || !user.doesExist()) {
        return res.json({ error: "User not found" });
      }

      return res.sendFile(user.getThemePath());
    });

    this.request.get("/login/instance/metadata", (_req, res) => {
      return res.json(<EndpointResponseLoginInstanceMetadata>{
        title: this.globalDb.get("core:instance:name") || "Placeholder name",
        message:
          this.globalDb.get("core:instance:message") ||
          "Placeholder message. Hey system admin, you should change this!",
        loginLayout: this.globalDb.get("core:instance:login:layout") || LoginLayout.CARDS,
      });
    });

    this.request.get("/login/instance/background", (_req, res) => {
      res.set("Content-Type", "image/avif");
      return res.sendFile(path.resolve(this.fs.ROOT_PATH, "./login_background.avif"));
    });

    try {
      this.webdav.__internal__loadEndpoints();
    } catch (e) {
      this.log.error("webdav", "Error caught in loadWebdavEndpoints", e);
    }

    try {
      this.image.__internal__loadEndpoints();
    } catch (e) {
      this.log.error("image", "Error caught in loadImageEndpoints", e);
    }

    try {
      this.video.__internal__loadEndpoints();
    } catch (e) {
      this.log.error("image", "Error caught in loadImageEndpoints", e);
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

    let loadedModules: BackendModule[] = [];

    try {
      console.time("core:load_modules");
      loadedModules = (await this.moduleManager.loadInstalledApplications()).filter((x) => x !== undefined);

      console.timeEnd("core:load_modules");
      this.log.info("startup", "All modules loaded successfully");
    } catch (err) {
      this.log.error("startup", "Failed to load all modules");
    }

    try {
      loadedModules.map((mod) => {
        try {
          mod.loadPreAuthEndpoints();
        } catch (err) {
          this.log.error("startup", `Failed to load pre-auth endpoints for ${mod.moduleName}`, err);
        }
      });
    } catch (err) {
      this.log.error("startup", "Failed to load pre-auth endpoints for all modules", err);
    }

    // Check for authentication
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
        return failAuth();
      }

      if (!this.users.__internal__getSessionsDoNotUseOutsideOfCore()[username]) {
        try {
          const user = this.users.get(username);

          this.users.__internal__getSessionsDoNotUseOutsideOfCore()[username] =
            (await user.getAllLoginSessions()) || [];

          const database = (await fs.readFile(path.join(user.path, "core/user_db.json"))).toString();

          if (database) {
            (await user.getDatabase()).clear().merge(JSON.parse(database));
          } else {
            (await user.getDatabase()).clear();
            await fs.writeFile(path.join(user.path, "core/user_db.json"), JSON.stringify({}));
          }
        } catch (_err) {
          return failAuth();
        }
      }

      if (
        this.users
          .__internal__getSessionsDoNotUseOutsideOfCore()
          [username]?.find((session) => session.sessionToken === token)
      ) {
        return next();
      }

      return failAuth();
    });

    /**
     *  ##################################################################
     *  # WARNING: all endpoints require authentication after this point #
     *  ##################################################################
     */

    console.time("core:load_modules");

    try {
      loadedModules.map((mod) => {
        try {
          mod.loadEndpoints();
          this.request.setNamespace("");
          this.log.success("module_manager", `Loaded endpoints for ${mod.moduleName}`);
        } catch (err) {
          this.log.error("startup", `Failed to load post-auth endpoints for ${mod.moduleName}`, err);
        }
      });
    } catch (err) {
      this.log.error("startup", "Failed to load post-auth endpoints for all modules", err);
    }

    this.request.get("/core/login/notice", (_req, res) => {
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
        author: notice.author ?? "admin",
        display: true,
        message: notice.message ?? "Placeholder message. Hey system admin, you should change this!",
        timestamp: notice.timestamp ?? new Date().getTime(),
      });
    });

    this.request.get("/core/applications", async (_req, res) => {
      return res.json(<EndpointResponseCoreApplications>{
        applications: (
          await (await this.fs.getDirectory(path.join(process.cwd(), "../../applications/"))).getChildren()
        ).map((app) => {
          return {
            id: path.basename(app.path) || "unknown",
            // TODO: support other types of applications
            type: APPLICATION_TYPE.LOCAL,
          };
        }),
      });
    });

    this.request.get("/core/hosted-applications/", async (req, res) => {
      const hostedApplications = await this.fs.getDirectory(path.join(process.cwd(), "../../hostedApplications"));

      return res.json({ applications: await hostedApplications.getChildrenAsBaseName() });
    });

    this.request.get("/user/sessions", async (req, res) => {
      const { username } = req.headers as { username: string };

      const user = this.users.get(username);

      return res.json({ sessions: await user.getAllLoginSessions() });
    });

    this.request.delete("/core/session/:id", async (req, res) => {
      const { username } = req.headers as { username: string };
      const { id: sessionId } = req.params;

      const user = this.users.get(username);

      await user.getLoginSessionById(parseInt(sessionId, 10)).invalidate();

      return res.json({ success: true });
    });

    this.request.get("/core/personal-server-accelerator/sessions", async (req, res) => {
      const { username } = req.headers as { username: string };

      const user = this.users.get(username);

      return res.json({
        // all desktop sessions should support the PSA api
        sessions: (await user.getAllLoginSessions()).filter(
          (session: { type: YOURDASH_SESSION_TYPE }) => session.type === YOURDASH_SESSION_TYPE.desktop,
        ),
      });
    });

    this.request.get("/core/personal-server-accelerator/", async (req, res) => {
      const { username } = req.headers as { username: string };

      const user = this.users.get(username);

      try {
        return JSON.parse((await fs.readFile(path.join(user.path, "personal_server_accelerator.json"))).toString());
      } catch (_err) {
        return res.json({
          error: `Unable to read ${username}/personal_server_accelerator.json`,
        });
      }
    });

    this.request.post("/core/personal-server-accelerator/", async (req, res) => {
      const { username } = req.headers as { username: string };
      const body = req.body;

      const user = this.users.get(username);

      try {
        await fs.writeFile(path.join(user.path, "personal_server_accelerator.json"), JSON.stringify(body));
      } catch (_err) {
        return res.json({
          error: `Unable to write to ${username}/personal_server_accelerator.json`,
        });
      }

      return res.json({ success: true });
    });

    this.userDatabase.__internal__loadEndpoints();
    this.panel.__internal__loadEndpoints();
    this.users.__internal__loadEndpoints();
    this.teams.__internal__loadEndpoints();

    this.request.use((req, res) => {
      this.log.info(
        "request:404",
        `${chalk.bgRed(chalk.black(" 404 "))} ${req.path} (the path was not answered by the backend)`,
      );
      return res.status(404).json({ error: "this endpoint does not exist!" });
    });
  }

  // try not to use this method for production stability, instead prefer to reload a specific module if it works for your use-case.
  shutdownInstance() {
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

    fsWriteFile(path.resolve(process.cwd(), "./fs/log.log"), LOG_OUTPUT, () => {
      try {
        this.globalDb.__internal__doNotUseOnlyIntendedForShutdownSequenceWriteToDisk(
          path.resolve(process.cwd(), "./fs/global_database.json"),
        );
      } catch (e) {
        this.log.error(
          "global_db",
          "[EXTREME SEVERITY] Shutdown Error! failed to save global database. User data will have been lost! (approx < past 5 minutes)",
        );
      }
    });

    return this;
  }

  // shutdown and startup the YourDash Instance
  async restartInstance() {
    this.shutdownInstance();
    this.__internal__startInstance();

    return this;
  }
}

const core = new Core();

export default core;