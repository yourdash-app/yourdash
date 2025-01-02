/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import dotenv from "dotenv";
import pg from "pg";
import Applications from "./applications.js";
import Authorization from "./authorization.js";
import Events from "./event.js";
import Filesystem from "./filesystem.js";
import { resizeImage } from "./image.js";
import Log from "./log.js";
import RequestManager from "./requestManager.js";
import { INSTANCE_STATUS } from "./types/instanceStatus.js";
import User, { createUser, repairUser } from "./user.js";
import path from "path";

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
  events!: Events;
  applications!: Applications;
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
      await this.database.query(`CREATE TABLE IF NOT EXISTS users
                                  (
                                    user_id        serial primary key,
                                    username       text,
                                    forename       text,
                                    surname        text,
                                    bio            text DEFAULT 'I''m new here, say hello!.',
                                    storage_quota  bigint,
                                    permissions    text[],
                                    session_tokens text[],
                                    password_hash  text
                                  )`);
      this.log.info("database", `Table ${this.log.addEmphasisToString("users")} has been created if it did not already exist.`);
    } catch (e) {
      console.error(e);
      this.log.error("database", `Failed to create table ${this.log.addEmphasisToString("users")}!`);
    }

    try {
      await this.database.query(`CREATE TABLE IF NOT EXISTS teams
                                  (
                                    team_id        serial primary key,
                                    teamname       text,
                                    owner_username text,
                                    members        text[],
                                    bio            text
                                  )`);
      this.log.info("database", `Table ${this.log.addEmphasisToString("teams")} has been created if it did not already exist.`);
    } catch (e) {
      console.error(e);
      this.log.error("database", `Failed to create table ${this.log.addEmphasisToString("teams")}!`);
    }

    try {
      await this.database.query(`CREATE TABLE IF NOT EXISTS configuration
                                  (
                                    config_version              serial primary key,
                                    creation_date               bigint,
                                    administrator_username      text   DEFAULT 'admin',
                                    display_name                text   DEFAULT 'YourDash Instance',
                                    description                 text   DEFAULT 'This is the default instance description. Hey Admin, this can be changed in the system settings!.',
                                    administrator_contact_email text,
                                    installed_applications      text[] DEFAULT '{ "../../../applications/uk-ewsgit-dash", "../../../applications/uk-ewsgit-files", "../../../applications/uk-ewsgit-photos", "../../../applications/uk-ewsgit-weather", "../../../applications/uk-ewsgit-store", "../../../applications/uk-ewsgit-settings" }',
                                    default_pinned_applications text[] DEFAULT '{ "uk-ewsgit-dash", "uk-ewsgit-files", "uk-ewsgit-store", "uk-ewsgit-weather" }'
                                  )`);
      this.log.info("database", `Table ${this.log.addEmphasisToString("config")} has been created if it did not already exist.`);

      await this.database.query("INSERT INTO configuration(creation_date) VALUES ($1);", [Date.now()]);
    } catch (e) {
      console.error(e);
      this.log.error("database", `Failed to create table ${this.log.addEmphasisToString("config")}!`);
    }

    this.authorization = new Authorization(this);
    this.filesystem = new Filesystem(this);
    this.requestManager = new RequestManager(this);
    this.request = this.requestManager.app;
    this.events = new Events(this);
    this.applications = new Applications(this);

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
    await this.__internal_generateInstanceLogos();
    this.log.info("startup", "YourDash RequestManager Startup Complete!");

    const adminUser = new User("admin");

    if (!(await adminUser.doesExist())) {
      const adminUser = await createUser("admin");
      await adminUser.setForename("Admin");
      await adminUser.setSurname("Istrator");
      await this.authorization.setUserPassword("admin", "password");
    }

    const users = await this.database.query("SELECT username FROM users");

    for (const user of users.rows) {
      await repairUser(user.username);
    }

    this.log.info("startup", "YourDash Instance Startup Complete");

    this.log.info("startup", "Loading applications...");

    const applications = await this.applications.getInstalledApplications();

    for (const app of applications) {
      await this.applications.loadApplication(app);
      this.log.info("application", `Application ${app} loaded successfully!`);
    }

    this.log.info("application", `All applications have loaded!`);

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

  async __internal_generateInstanceLogos() {
    let instanceLogoPath = path.join(this.filesystem.commonPaths.systemDirectory(), "instanceLogo.png");

    const requiredDimensions = [32, 40, 64, 128, 256, 512, 768, 1024];

    for (const dimension of requiredDimensions) {
      if (
        await this.filesystem.doesPathExist(
          path.join(path.join(this.filesystem.commonPaths.systemDirectory(), `instanceLogo${dimension}.webp`)),
        )
      ) {
        this.log.info("instance", `instanceLogo @ ${dimension} already exists. Not generating new logo`);
        continue;
      }

      await resizeImage(
        instanceLogoPath,
        dimension,
        dimension,
        path.join(path.join(this.filesystem.commonPaths.systemDirectory(), `instanceLogo${dimension}.webp`)),
        "webp",
      );

      this.log.info("instance", `Genertated instanceLogo @ ${dimension}.`);
    }
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
