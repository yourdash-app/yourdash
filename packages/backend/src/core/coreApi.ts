/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import chalk from "chalk";
import expressCompression from "compression";
import cors from "cors";
import express, { Application as ExpressApplication } from "express";
import {
  promises as fs,
  readdirSync as fsReaddirSync,
  writeFile as fsWriteFile,
} from "fs";
import http from "http";
import killPort from "kill-port";
import minimist from "minimist";
import path from "path";
import { fetch } from "undici";
import { compareHashString } from "../helpers/encryption.js";
import { createSession } from "../helpers/session.js";
import CoreApiAuthenticatedImage from "./coreApiAuthenticatedImage.js";
import CoreApiCommands from "./coreApiCommands.js";
import CoreApiGlobalDb from "./coreApiGlobalDb.js";
import CoreApiLog from "./coreApiLog.js";
import loadNextCloudSupportEndpoints from "./nextcloud/coreApiNextCloud.js";
import CoreApiWebDAV from "./webDAV/coreApiWebDAV.js";
import CoreApiModuleManager from "./moduleManager/coreApiModuleManager.js";
import CoreApiPanel from "./coreApiPanel.js";
import CoreApiScheduler from "./coreApiScheduler.js";
import CoreApiUserDatabase from "./coreApiUserDatabase.js";
import CoreApiUsers from "./coreApiUsers.js";
import CoreApiFileSystem from "./fileSystem/coreApiFileSystem.js";
import CoreApiLoadManagement from "./coreApiLoadManagement.js";
import { YOURDASH_INSTANCE_DISCOVERY_STATUS } from "./types/discoveryStatus.js";
import { userAvatarSize } from "./user/avatarSize.js";
import YourDashUser from "./user/index.js";
import { YOURDASH_SESSION_TYPE } from "../../../shared/core/session.js";
import CoreApiWebsocketManager from "./coreApiWebsocketManager.js";
import CoreApiUtils from "./utils/utils.js";

export class CoreApi {
  // core apis
  readonly users: CoreApiUsers;
  readonly log: CoreApiLog;
  readonly moduleManager: CoreApiModuleManager;
  readonly globalDb: CoreApiGlobalDb;
  readonly commands: CoreApiCommands;
  readonly fs: CoreApiFileSystem;
  readonly scheduler: CoreApiScheduler;
  readonly userDatabase: CoreApiUserDatabase;
  readonly panel: CoreApiPanel;
  readonly authenticatedImage: CoreApiAuthenticatedImage;
  readonly websocketManager: CoreApiWebsocketManager;
  readonly loadManagement: CoreApiLoadManagement;
  readonly utils: CoreApiUtils;
  readonly webdav: CoreApiWebDAV;
  // general vars
  readonly processArguments: minimist.ParsedArgs;
  readonly expressServer: ExpressApplication;
  readonly httpServer: http.Server;
  readonly isDebugMode: boolean;
  readonly isDevMode: boolean;
  isInMaintenance: boolean;

  constructor() {
    this.isDebugMode =
      typeof global.v8debug === "object" ||
      /--debug|--inspect/.test(process.execArgv.join(" "));

    this.log = new CoreApiLog(this);

    // Fetch process arguments
    this.processArguments = minimist(process.argv.slice(2));

    this.isDevMode = !!this.processArguments.dev;

    // TODO: move this toggle to a value in globalDb
    this.isInMaintenance = false;

    this.log.info(
      "startup",
      "Beginning YourDash Startup with args: ",
      JSON.stringify(this.processArguments),
    );

    // Create the request server
    this.expressServer = express();
    this.httpServer = http.createServer(this.expressServer);

    // define core apis
    this.scheduler = new CoreApiScheduler(this);
    this.users = new CoreApiUsers(this);
    this.moduleManager = new CoreApiModuleManager(this);
    this.globalDb = new CoreApiGlobalDb(this);
    this.commands = new CoreApiCommands(this);
    this.fs = new CoreApiFileSystem(this);
    this.userDatabase = new CoreApiUserDatabase(this);
    this.panel = new CoreApiPanel(this);
    this.authenticatedImage = new CoreApiAuthenticatedImage(this);
    this.loadManagement = new CoreApiLoadManagement(this);
    this.utils = new CoreApiUtils(this);
    this.websocketManager = new CoreApiWebsocketManager(this);
    this.webdav = new CoreApiWebDAV(this);

    // TODO: implement WebDAV & CalDAV & CardDAV (outdated WebDAV example -> https://github.com/LordEidi/fennel.js/)

    // TODO: create the websocket manager, this will ease in creation of websocket servers with built-in authentication
    //       each application that uses a websocket connection can use the manager to create it's own websocket server
    //       on it's application's endpoint e.g: /app/yourdash/websocket-manager/websocket with the suffix
    //       /websocket-manager/websocket being forced
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

    return this;
  }

  // start the YourDash Instance
  __internal__startInstance() {
    this.log.info("startup", "Welcome to the YourDash Instance backend");

    this.fs
      .exists(path.join(this.fs.ROOT_PATH, "./global_database.json"))
      .then(async (doesGlobalDatabaseFileExist) => {
        if (doesGlobalDatabaseFileExist)
          await this.globalDb.loadFromDisk(
            path.join(this.fs.ROOT_PATH, "./global_database.json"),
          );

        this.fs.verifyFileSystem.verify().then(() => {
          this.users.__internal__startUserDatabaseService();
          this.users.__internal__startUserDeletionService();
          this.globalDb.__internal__startGlobalDatabaseService();

          try {
            killPort(3563)
              .then(() => {
                this.log.info("startup", "Killed port 3563");
                this.httpServer.listen(3563, () => {
                  this.log.success(
                    "startup",
                    "server now listening on port 3563!",
                  );
                  this.log.success(
                    "startup",
                    "YourDash initialization complete!",
                  );
                  this.loadCoreEndpoints();
                });
              })
              .catch((err) => {
                if (err.message === "No process running on port") {
                  this.log.info(
                    "startup",
                    "Not killing port 3563, no process running currently using port 3563",
                  );
                  return;
                }

                this.log.warning("startup", "Unable to kill port 3563", err);
              });
          } catch (reason) {
            this.log.warning("startup", "Unable to kill port 3563", reason);

            try {
              this.httpServer.listen(3563, () => {
                this.log.info("startup", "server now listening on port 3563!");
                this.log.success("startup", "Startup complete!");
                this.loadCoreEndpoints();
              });
            } catch (_err) {
              this.log.error("startup", "Unable to start server!");
              this.shutdownInstance();
            }
          }
        });
      });
    return this;
  }

  private startRequestLogger(options: {
    logOptionsRequests?: boolean;
    logQueryParameters?: boolean;
  }) {
    this.expressServer.use((req, res, next) => {
      switch (req.method) {
        case "GET":
          this.log.info(
            "request:get",
            `${chalk.bgGreen(chalk.black(" GET "))} ${res.statusCode} ${
              req.path
            }`,
          );
          if (
            options.logQueryParameters &&
            JSON.stringify(req.query) !== "{}"
          ) {
            this.log.info(JSON.stringify(req.query));
          }
          break;
        case "POST":
          this.log.info(
            "request:pos",
            `${chalk.bgBlue(chalk.black(" POS "))} ${res.statusCode} ${
              req.path
            }`,
          );
          if (
            options.logQueryParameters &&
            JSON.stringify(req.query) !== "{}"
          ) {
            this.log.info(JSON.stringify(req.query));
          }
          break;
        case "DELETE":
          this.log.info(
            "request:del",
            `${chalk.bgRed(chalk.black(" DEL "))} ${res.statusCode} ${
              req.path
            }`,
          );
          if (
            options.logQueryParameters &&
            JSON.stringify(req.query) !== "{}"
          ) {
            this.log.info(JSON.stringify(req.query));
          }
          break;
        case "OPTIONS":
          if (options.logOptionsRequests) {
            this.log.info(
              "request:opt",
              `${chalk.bgCyan(chalk.black(" OPT "))} ${res.statusCode} ${
                req.path
              }`,
            );
            if (
              options.logQueryParameters &&
              JSON.stringify(req.query) !== "{}"
            ) {
              this.log.info(JSON.stringify(req.query));
            }
          }
          break;
        case "PROPFIND":
          this.log.info(
            "request:pfi",
            `${chalk.bgCyan(chalk.black(" PFI "))} ${res.statusCode} ${
              req.path
            }`,
          );
          break;
        case "PROPPATCH":
          this.log.info(
            "request:ppa",
            `${chalk.bgCyan(chalk.black(" PPA "))} ${res.statusCode} ${
              req.path
            }`,
          );
          break;
        default:
          this.log.error(
            "core:requests",
            `ERROR IN REQUEST LOGGER, UNKNOWN REQUEST TYPE: ${req.method}`,
          );
      }

      // run the next middleware / endpoint
      next();
    });

    this.log.success(
      "core:requests",
      `Started the requests logger${
        options && " (logging options requests is also enabled)"
      }`,
    );
  }

  private loadCoreEndpoints() {
    if (this.processArguments["log-requests"]) {
      this.startRequestLogger({
        logOptionsRequests: !!this.processArguments["log-options-requests"],
        logQueryParameters: !!this.processArguments["log-query-parameters"],
      });
    }

    this.expressServer.use(cors());
    this.expressServer.use(express.json({ limit: "50mb" }));
    this.expressServer.use(express.urlencoded({ extended: true }));

    this.expressServer.use((_req, res, next) => {
      // remove the X-Powered-By header to prevent exploitation from knowing the software powering the request server
      // this is a security measure against exploiters who don't look into the project's source code
      res.removeHeader("X-Powered-By");

      next();
    });
    this.expressServer.use(expressCompression());

    // INFO: This shouldn't be used for detection of a YourDash Instance, instead use the '/test' endpoint
    this.expressServer.get("/", (_req, res) => {
      return res.send("Hello from the YourDash instance software! 👋");
    });

    // Server discovery endpoint
    this.expressServer.get("/test", (_req, res) => {
      const discoveryStatus: YOURDASH_INSTANCE_DISCOVERY_STATUS =
        YOURDASH_INSTANCE_DISCOVERY_STATUS.NORMAL as YOURDASH_INSTANCE_DISCOVERY_STATUS;

      switch (discoveryStatus) {
        case YOURDASH_INSTANCE_DISCOVERY_STATUS.MAINTENANCE:
          return res.status(200).json({
            status: YOURDASH_INSTANCE_DISCOVERY_STATUS.MAINTENANCE,
            type: "yourdash",
          });
        case YOURDASH_INSTANCE_DISCOVERY_STATUS.NORMAL:
          return res.status(200).json({
            status: YOURDASH_INSTANCE_DISCOVERY_STATUS.NORMAL,
            type: "yourdash",
          });
        default:
          this.log.error("Discovery status returned an invalid value");
          return res.status(200).json({
            status: YOURDASH_INSTANCE_DISCOVERY_STATUS.MAINTENANCE,
            type: "yourdash",
          });
      }
    });

    this.expressServer.get("/ping", (_req, res) => {
      // INFO: This shouldn't be used for detection of a YourDash Instance, instead use the '/test' endpoint
      return res.send("pong");
    });

    this.expressServer.get("/core/test/self-ping", (_req, res) => {
      return res.json({ success: true });
    });

    // on startup, we ping ourselves to check if the webserver is running and accepting requests
    this.log.info("self_ping_test", "pinging self");

    fetch("http://localhost:3563/core/test/self-ping")
      .then((res) => res.json())
      .then((data: { success?: boolean }) => {
        if (data?.success) {
          return this.log.success(
            "self_ping_test",
            "self ping successful - The server is receiving requests",
          );
        }
        this.log.error(
          "self_ping_test",
          "CRITICAL ERROR!, unable to ping self",
        );
      })
      .catch(() => {
        this.log.error(
          "self_ping_test",
          "CRITICAL ERROR!, unable to ping self",
        );
      });

    this.expressServer.get("/login/user/:username/avatar", (req, res) => {
      const user = new YourDashUser(req.params.username);
      return res.sendFile(user.getAvatar(userAvatarSize.ExtraLarge));
    });

    this.expressServer.get("/login/user/:username", async (req, res) => {
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

    this.expressServer.post(
      "/login/user/:username/authenticate",
      async (req, res) => {
        if (!req.body)
          return res.status(400).json({ error: "Missing request body" });

        const username = req.params.username;
        const password = req.body.password;

        if (!username || username === "") {
          return res.json({ error: "Missing username" });
        }

        if (!password || password === "") {
          return res.json({ error: "Missing password" });
        }

        const user = new YourDashUser(username);

        const savedHashedPassword = (
          await fs.readFile(path.join(user.path, "core/password.enc"))
        ).toString();

        return compareHashString(savedHashedPassword, password)
          .then(async (result) => {
            if (result) {
              const session = await createSession(
                username,
                req.headers?.type === "desktop"
                  ? YOURDASH_SESSION_TYPE.desktop
                  : YOURDASH_SESSION_TYPE.web,
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
            this.log.error(
              "login",
              `Hash comparison failed for user ${username}`,
            );
            res.status(500);
            return res.json({ error: "Login failure" });
          });
      },
    );

    this.expressServer.get("/login/is-authenticated", async (req, res) => {
      const { username, token } = req.headers as {
        username?: string;
        token?: string;
      };

      if (!username || !token) return res.json({ error: true });

      if (
        !this.users.__internal__getSessionsDoNotUseOutsideOfCore()[username]
      ) {
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
      return res.json({ error: true });
    });

    this.expressServer.get("/login/instance/metadata", (_req, res) => {
      return res.json({
        title: this.globalDb.get("core:instance:name") || "Placeholder name",
        message:
          this.globalDb.get("core:instance:message") ||
          "Placeholder message. Hey system admin, you should change this!",
      });
    });

    this.expressServer.get("/login/instance/background", (_req, res) => {
      res.set("Content-Type", "image/avif");
      return res.sendFile(
        path.resolve(process.cwd(), "./fs/login_background.avif"),
      );
    });

    this.webdav.__internal__loadEndpoints();
    this.authenticatedImage.__internal__loadEndpoints();
    loadNextCloudSupportEndpoints();

    // Check for authentication
    this.expressServer.use(async (req, res, next) => {
      const { username, token } = req.headers as {
        username?: string;
        token?: string;
      };

      function failAuth() {
        res.status(401);
        coreApi.log.info("REQUEST", "Unauthorized");
        return res.json({ error: "authorization fail" });
      }

      if (!username || !token) {
        return failAuth();
      }

      if (
        !this.users.__internal__getSessionsDoNotUseOutsideOfCore()[username]
      ) {
        try {
          const user = this.users.get(username);

          this.users.__internal__getSessionsDoNotUseOutsideOfCore()[username] =
            (await user.getAllLoginSessions()) || [];

          const database = (
            await fs.readFile(path.join(user.path, "core/user_db.json"))
          ).toString();

          if (database) {
            (await this.users.__internal__getUserDatabase(username))
              .clear()
              .merge(JSON.parse(database));
          } else {
            (await this.users.__internal__getUserDatabase(username)).clear();
            await fs.writeFile(
              path.join(user.path, "core/user_db.json"),
              JSON.stringify({}),
            );
          }
        } catch (_err) {
          return failAuth();
        }
      }

      if (
        this.users
          .__internal__getSessionsDoNotUseOutsideOfCore()
          [username].find((session) => session.sessionToken === token)
      ) {
        return next();
      }

      return failAuth();
    });

    /**
     *  ----------------------------------------------------------------
     *   WARNING: all endpoints require authentication after this point
     *  ----------------------------------------------------------------
     */

    console.time("core:load_modules");

    this.moduleManager
      .loadInstalledApplications()
      .then(() => {
        console.timeEnd("core:load_modules");
        this.log.info("startup", "All modules loaded successfully");
      })
      .catch((err) => {
        this.log.error("startup", "Failed to load all modules", err.toString());
      });

    this.expressServer.get("/core/sessions", async (req, res) => {
      const { username } = req.headers as { username: string };

      const user = this.users.get(username);

      return res.json({ sessions: await user.getAllLoginSessions() });
    });

    this.expressServer.delete("/core/session/:id", async (req, res) => {
      const { username } = req.headers as { username: string };
      const { id: sessionId } = req.params;

      const user = this.users.get(username);

      await user.getLoginSessionById(parseInt(sessionId, 10)).invalidate();

      return res.json({ success: true });
    });

    this.expressServer.get(
      "/core/personal-server-accelerator/sessions",
      async (req, res) => {
        const { username } = req.headers as { username: string };

        const user = this.users.get(username);

        return res.json({
          // all desktop sessions should support the PSA api
          sessions: (await user.getAllLoginSessions()).filter(
            (session: { type: YOURDASH_SESSION_TYPE }) =>
              session.type === YOURDASH_SESSION_TYPE.desktop,
          ),
        });
      },
    );

    this.expressServer.get(
      "/core/personal-server-accelerator/",
      async (req, res) => {
        const { username } = req.headers as { username: string };

        const user = this.users.get(username);

        try {
          return JSON.parse(
            (
              await fs.readFile(
                path.join(user.path, "personal_server_accelerator.json"),
              )
            ).toString(),
          );
        } catch (_err) {
          return res.json({
            error: `Unable to read ${username}/personal_server_accelerator.json`,
          });
        }
      },
    );

    this.expressServer.post(
      "/core/personal-server-accelerator/",
      async (req, res) => {
        const { username } = req.headers as { username: string };
        const body = req.body;

        const user = this.users.get(username);

        try {
          await fs.writeFile(
            path.join(user.path, "personal_server_accelerator.json"),
            JSON.stringify(body),
          );
        } catch (_err) {
          return res.json({
            error: `Unable to write to ${username}/personal_server_accelerator.json`,
          });
        }

        return res.json({ success: true });
      },
    );

    this.userDatabase.__internal__loadEndpoints();
    this.panel.__internal__loadEndpoints();
    this.users.__internal__loadEndpoints();
  }

  // try not to use this method for production stability, instead prefer to reload a specific module if it works for your use-case.
  shutdownInstance() {
    this.httpServer.close();

    this.commands.getAllCommands().forEach((command) => {
      this.commands.removeCommand(command);
    });

    this.log.info(
      "core",
      "Shutting down... ( restart should occur automatically )",
    );

    const LOG_OUTPUT = this.log.logHistory
      .map((hist) => {
        return `${hist.type}: ${hist.message}`;
      })
      .join("\n");

    this.httpServer.close();

    fsReaddirSync(path.resolve(this.fs.ROOT_PATH, "./users")).forEach(
      async (username) => {
        await this.users.__internal__saveUserDatabaseInstantly(username);
      },
    );

    fsWriteFile(path.resolve(process.cwd(), "./fs/log.log"), LOG_OUTPUT, () => {
      try {
        this.globalDb.__internal__doNotUseOnlyIntendedForShutdownSequenceWriteToDisk(
          path.resolve(process.cwd(), "./fs/global_database.json"),
        );
      } catch (e) {
        this.log.error(
          "global_db",
          "[EXTREME SEVERITY] Shutdown Error! failed to save global database. User data will have been lost! (~past 5 minutes)",
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

const coreApi = new CoreApi();

export default coreApi;
