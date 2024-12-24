/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import pg from "pg";
import Authorization from "./authorization.js";
import Log from "./log.js";
import RequestManager from "./requestManager.js";
import dotenv from "dotenv";

dotenv.config();

class Instance {
  flags!: {
    isDebugmode: boolean;
    logQueryParameters: boolean;
    logOptionsRequests: boolean;
    isDevmode: boolean;
    port: number;
    postgresPassword: string;
    postgresPort: number;
    postgresUser: string;
  };
  log!: Log;
  requestManager!: RequestManager;
  authorization!: Authorization;
  database!: pg.Client;

  constructor() {
    this.__internal__init().then(() => {
      return 0;
    });
    return this;
  }

  async __internal__init() {
    // FLAGS FOR DEVELOPMENT FEATURES
    this.flags = {
      isDebugmode: process.env.IS_DEBUGMODE === "true" || false,
      logOptionsRequests: process.env.LOG_OPTIONS_REQUESTS === "true" || false,
      logQueryParameters: process.env.LOG_QUERY_PARAMETERS === "true" || false,
      isDevmode: process.env.IS_DEVMODE === "true" || false,
      port: Number(process.env.PORT) || 3563,
      postgresPassword: process.env.POSTGRES_PASSWORD || "postgres",
      postgresPort: Number(process.env.POSTGRES_PORT) || 5432,
      postgresUser: process.env.POSTGRES_USER || "postgres",
    };

    let tempDatabaseClient: pg.Client = new pg.Client({
      password: this.flags.postgresPassword,
      user: this.flags.postgresUser,
      database: "postgres",
    });

    await tempDatabaseClient.connect();

    // create the yourdash database if it doesn't already exist
    try {
      await tempDatabaseClient.query("CREATE DATABASE yourdash");
    } catch (e) {}

    this.database = new pg.Client({
      password: this.flags.postgresPassword,
      port: this.flags.postgresPort,
      user: this.flags.postgresUser,
      database: "yourdash",
    });
    this.log = new Log(this);
    this.authorization = new Authorization(this);
    this.requestManager = new RequestManager(this);

    this.startup().then(() => {
      return 0;
    });
  }

  async startup() {
    this.log.info("startup", "Connecting to PostgreSQL Database");
    await this.database.connect();
    this.log.info("startup", "Connected to PostgreSQL Database");
    await this.requestManager.__internal_startup();
    this.log.info("startup", "YourDash RequestManager Startup Complete!");
    this.log.info("startup", "YourDash Instance Startup Complete");
  }
}

export { type Instance };

const instance = new Instance();

export default instance;

/*
 * https://fastify-vite.dev/guide/getting-started
 *
 * https://github.com/fastify/fastify-schedule
 *
 * https://github.com/fastify/session
 *
 * https://github.com/fastify/fastify-websocket
 *
 * https://github.com/turkerdev/fastify-type-provider-zod
 *
 * https://github.com/fastify/fastify-cors
 *
 * https://github.com/fastify/fastify-cookie
 *
 * https://github.com/fastify/fastify-express
 *
 * https://node-postgres.com/
 *
 * https://github.com/fastify/fastify-auth
 *
 * https://fastify.dev/docs/latest/Reference/Hooks/#hooks
 *
 * http://localhost:3563/swagger
 */
