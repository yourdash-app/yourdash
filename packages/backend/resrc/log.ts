/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import chalk from "chalk";
import { type Instance } from "./main.js";

export enum LOG_TYPE {
  INFO,
  WARNING,
  ERROR,
  SUCCESS,
  DEBUG,
}

const LOG_META_MAX_LENGTH = 28;

export default class Log {
  instance: Instance;
  logHistory: {
    type: LOG_TYPE;
    level: string;
    message: (string | Uint8Array)[];
  }[] = [];

  constructor(instance: Instance) {
    this.instance = instance;
    let stdoutWidth = process.stdout.getWindowSize?.()[0] || 80;
    let titleString = " YourDash Instance ReSrc Pre-Alpha ";

    process.stdout.cursorTo?.(0, 0);
    process.stdout.clearScreenDown?.();
    process.stdout.write(
      `${"-".repeat((stdoutWidth - titleString.length) / 2)}${titleString}${"-".repeat((stdoutWidth - titleString.length) / 2)}\n\n`,
    );
    process.stdout.cursorTo?.(0, 1);

    process.stdout.on("resize", () => {
      stdoutWidth = process.stdout.getWindowSize()[0];
      process.stdout.cursorTo?.(0, 0);
      process.stdout.clearScreenDown();
      process.stdout.write(
        `${"-".repeat((stdoutWidth - titleString.length) / 2)}${titleString}${"-".repeat((stdoutWidth - titleString.length) / 2)}\n\n`,
      );
      process.stdout.cursorTo?.(0, 1);
    });

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private log(type: LOG_TYPE, level: string, ...message: any[]): this {
    this.logHistory.push({ type: type, level: level, message: message });

    let typeString = "";

    switch (type) {
      case LOG_TYPE.INFO:
        typeString = chalk.bold(`${chalk.white("[")}${chalk.blue("INF")}${chalk.white("]")}`);
        break;
      case LOG_TYPE.WARNING:
        typeString = chalk.bold(`${chalk.white("[")}${chalk.yellow("WAR")}${chalk.white("]")}`);
        break;
      case LOG_TYPE.ERROR:
        typeString = chalk.bold(`${chalk.white("[")}${chalk.red("ERR")}${chalk.white("]")}`);
        break;
      case LOG_TYPE.SUCCESS:
        typeString = chalk.bold(`${chalk.white("[")}${chalk.green("SUC")}${chalk.white("]")}`);
        break;
      case LOG_TYPE.DEBUG:
        typeString = chalk.bold(`${chalk.white("[")}${chalk.magenta("DBG")}${chalk.white("]")}`);
        break;
    }

    console.log(
      typeString,
      chalk.bold(`${chalk.yellow(level.toUpperCase().slice(0, LOG_META_MAX_LENGTH).padEnd(LOG_META_MAX_LENGTH))} `),
      ...message,
    );

    return this;
  }

  info(level: string, ...message: (string | Uint8Array)[]) {
    if (level.length === 0) {
      throw new Error("log level is empty");
    }

    if (message.length === 0) {
      throw new Error("log message is empty");
    }

    return this.log(LOG_TYPE.INFO, level, ...message);
  }

  success(level: string, ...message: (string | Uint8Array)[]) {
    if (level.length === 0) {
      throw new Error("log level is empty");
    }

    if (message.length === 0) {
      throw new Error("log message is empty");
    }

    return this.log(LOG_TYPE.SUCCESS, level, ...message);
  }

  warning(level: string, ...message: (string | Uint8Array)[]) {
    if (level.length === 0) {
      throw new Error("log level is empty");
    }

    if (message.length === 0) {
      throw new Error("log message is empty");
    }

    return this.log(LOG_TYPE.WARNING, level, ...message);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(level: string, ...message: any[]) {
    if (message.length === 0) {
      this.log(LOG_TYPE.ERROR, "log", new Error("log message is empty").stack);
    }

    this.log(LOG_TYPE.ERROR, level, ...message);

    return this;
  }

  debug(level: string, ...message: (string | Uint8Array)[]) {
    if (!this.instance.flags.isDebugmode) {
      return this;
    }

    if (level.length === 0) {
      throw new Error("log level is empty");
    }

    if (message.length === 0) {
      throw new Error("log message is empty");
    }

    return this.log(LOG_TYPE.DEBUG, level, ...message);
  }

  addEmphasisToString(string: string): string {
    return chalk.bold.blueBright.italic(string);
  }
}
