/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import dotenv from "dotenv";
import pg from "pg";
import Authorization from "./authorization.js";
import Filesystem from "./filesystem.js";
import Log from "./log.js";
import RequestManager from "./requestManager.js";
import { INSTANCE_STATUS } from "./types/instanceStatus.js";
import User, { createUser, repairUser } from "./user.js";

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
    cookieSecret: string;
  };
  log!: Log;
  requestManager!: RequestManager;
  request!: RequestManager["app"];
  authorization!: Authorization;
  database!: pg.Client;
  filesystem!: Filesystem;
  private status: INSTANCE_STATUS = INSTANCE_STATUS.UNKNOWN;

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
      cookieSecret: "this should be a random and unknown string to ensure security",
    };

    try {
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
    } catch (e) {
      console.error(
        "database",
        "Failed to setup pre-startup connection to PostgreSQL Database,\nplease ensure that you have PostgreSQL installed, and the default 'postgres' database exists.",
      );
    }

    this.log = new Log(this);

    try {
      this.database = new pg.Client({
        password: this.flags.postgresPassword,
        port: this.flags.postgresPort,
        user: this.flags.postgresUser,
        database: "yourdash",
      });
    } catch (e) {
      this.log.error("database", "Failed to setup connection to PostgreSQL Database");
    }

    this.log.info("startup", "Connecting to PostgreSQL Database");
    try {
      await this.database.connect();
      this.log.info("startup", "Connected to PostgreSQL Database");
    } catch (e) {
      this.log.error("database", "Failed to connect to PostgreSQL Database");
      this.log.error("instance", "Instance will now quit due to startup failure");
      return false;
    }

    try {
      await this.database.query(
        `CREATE TABLE IF NOT EXISTS users(user_id SERIAL PRIMARY KEY, username TEXT, forename TEXT, surname TEXT, bio TEXT, storage_quota BIGINT, permissions TEXT[], session_tokens TEXT[] )`,
      );
      this.log.info("database", `Table ${this.log.addEmphasisToString("users")} has been created if it did not already exist.`);
    } catch (e) {
      this.log.error("database", `Failed to create table ${this.log.addEmphasisToString("users")}!`);
    }

    try {
      await this.database.query(
        `CREATE TABLE IF NOT EXISTS teams(team_id SERIAL PRIMARY KEY, teamname TEXT, owner_username TEXT, members TEXT[], bio TEXT )`,
      );
      this.log.info("database", `Table ${this.log.addEmphasisToString("teams")} has been created if it did not already exist.`);
    } catch (e) {
      this.log.error("database", `Failed to create table ${this.log.addEmphasisToString("teams")}!`);
    }

    this.authorization = new Authorization(this);
    this.filesystem = new Filesystem(this);
    this.requestManager = new RequestManager(this);
    this.request = this.requestManager.app;

    this.startup()
      .then((status: boolean) => {
        if (status) {
          this.setStatus(INSTANCE_STATUS.OK);
        } else {
          process.exit(1);
        }

        return 0;
      })
      .catch(() => {
        this.setStatus(INSTANCE_STATUS.NON_FUNCTIONAL);
      });
  }

  async startup(): Promise<boolean> {
    await this.filesystem.__internal_startup();
    await this.requestManager.__internal_startup();
    this.log.info("startup", "YourDash RequestManager Startup Complete!");

    const adminUser = new User("admin");

    console.log({ doesAdminExist: await adminUser.doesExist() });

    if (!(await adminUser.doesExist())) {
      const adminUser = await createUser("admin");
      await adminUser.setForename("Admin");
      await adminUser.setSurname("Istrator");
    }

    const users = await this.database.query("SELECT username FROM users");

    for (const user of users.rows) {
      await repairUser(user.username);
    }

    this.log.info("startup", "YourDash Instance Startup Complete");

    return true;
  }

  getStatus(): INSTANCE_STATUS {
    return this.status;
  }

  setStatus(status: INSTANCE_STATUS): this {
    this.status = status;
    this.log.info(
      "instance",
      `Instance status has been set to ${this.log.addEmphasisToString(`'INSTANCE_STATUS.${INSTANCE_STATUS[status]}'`)}`,
    );

    return this;
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
