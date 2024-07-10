/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import chalk from "chalk";
import { Core } from "./core.js";
import WebsocketManagerServer from "./websocketManager/websocketManagerServer.js";

export enum LOG_TYPE {
  INFO,
  WARNING,
  ERROR,
  SUCCESS,
  DEBUG,
}

const LOG_META_MAX_LENGTH = 20;

export default class CoreLog {
  private readonly core: Core;
  logHistory: {
    type: LOG_TYPE;
    level: string;
    message: (string | Uint8Array)[];
  }[] = [];
  private websocketServer: WebsocketManagerServer;

  constructor(core: Core) {
    this.core = core;

    return this;
  }

  private log(type: LOG_TYPE, level: string, ...message: (string | Uint8Array)[]) {
    if (this.core.isDebugMode) {
      this.logHistory.push({ type: type, level: level, message: message });

      console.log(
        message[0],
        chalk.bold(
          `${chalk.white("[")}${chalk.italic.yellow(
            level.toUpperCase().slice(0, LOG_META_MAX_LENGTH).padEnd(LOG_META_MAX_LENGTH),
          )}${chalk.white("]")} `,
        ),
        message.slice(1).join(" ").toString(),
      );

      this.websocketServer?.emit(type.toString(), level, ...message);

      return this;
    }

    this.logHistory.push({ type: type, level: level, message: message });

    process.stdout.write(message[0]);

    process.stdout.write(
      chalk.bold(
        `${chalk.white("[")}${chalk.italic.yellow(
          level.toUpperCase().slice(0, LOG_META_MAX_LENGTH).padEnd(LOG_META_MAX_LENGTH),
        )}${chalk.white("]")} `,
      ),
    );

    process.stdout.write(message.slice(1).join(" ").toString() + "\n");

    this.websocketServer?.emit(type.toString(), [level, ...message]);

    return this;
  }

  info(level: string, ...message: (string | Uint8Array)[]) {
    if (level.length === 0) {
      throw new Error("log level is empty");
    }

    if (message.length === 0) {
      throw new Error("log message is empty");
    }

    return this.log(LOG_TYPE.INFO, level, chalk.bold(`${chalk.white("[")}${chalk.blue("INF")}${chalk.white("]")}`), ...message);
  }

  success(level: string, ...message: (string | Uint8Array)[]) {
    if (level.length === 0) {
      throw new Error("log level is empty");
    }

    if (message.length === 0) {
      throw new Error("log message is empty");
    }

    return this.log(LOG_TYPE.SUCCESS, level, chalk.bold(`${chalk.white("[")}${chalk.green("SUC")}${chalk.white("]")}`), ...message);
  }

  warning(level: string, ...message: (string | Uint8Array)[]) {
    if (level.length === 0) {
      throw new Error("log level is empty");
    }

    if (message.length === 0) {
      throw new Error("log message is empty");
    }

    return this.log(LOG_TYPE.WARNING, level, chalk.bold(`${chalk.white("[")}${chalk.yellow("WAR")}${chalk.white("]")}`), ...message);
  }

  error(level: string, ...message: (string | Uint8Array)[]) {
    if (message.length === 0) {
      this.log(LOG_TYPE.ERROR, "log", new Error("log message is empty").stack);
    }

    console.log(new Error().stack);

    return this.log(LOG_TYPE.ERROR, level, chalk.bold(`${chalk.white("[")}${chalk.red("ERR")}${chalk.white("]")}`), ...message);
  }

  debug(level: string, ...message: (string | Uint8Array)[]) {
    if (!this.core.isDebugMode) {
      return this;
    }

    if (level.length === 0) {
      throw new Error("log level is empty");
    }

    if (message.length === 0) {
      throw new Error("log message is empty");
    }

    return this.log(LOG_TYPE.DEBUG, level, chalk.bold(`${chalk.white("[")}${chalk.magenta("DBG")}${chalk.white("]")}`), ...message);
  }

  __internal__loadEndpoints() {
    this.websocketServer = this.core.websocketManager.createServer("/core/log");

    return this;
  }
}
